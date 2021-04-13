// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.7.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

struct stake {
  // In LP tokens
  uint256 amount;
  // In cheemscoin
  uint256 reward;
  uint256 claimTime;
  bool isHard;
}

uint256 constant BASEREWARD = 5 * 10**10;
uint256 constant MINDURATION = 7 days;

/// @dev all time is in seconds
contract LockedCheemscoinLpFarm is ERC721 {
  using SafeMath for uint256;
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  uint256 private _startTime = block.timestamp;
  IERC20 private _lp;
  IERC20 private _cheemscoin;

  mapping(uint256 => stake) public stakes;
  uint256 public availableCheems = 0;

  constructor(IERC20 cheemscoin, IERC20 lpToken) ERC721("Locked Cheemscoin LP", "lchLP") {
    _cheemscoin = cheemscoin;
    _lp = lpToken;
  }

  function timeFromStart() public view returns (uint256) {
    return block.timestamp - _startTime;
  }

  /// @param amount amount of tokens in wei
  /// @param duration how long the lock will last for
  /// @param isHard whether the stake is hard or soft locked
  function calcReward(
    uint256 amount,
    uint256 duration,
    bool isHard
  ) public view returns (uint256) {
    uint256 hardBonus = isHard ? 15 weeks : 60 weeks;
    uint256 r = BASEREWARD.sub(timeFromStart().mul(10**3).div(2));
    uint256 a = amount.mul(r).div(10**11);
    uint256 bonus = a.mul(duration**2).div(hardBonus.add(totalSupply().mul(1.5 days)));
    return a.mul(duration).add(bonus).div(1 weeks);
  }

  /// @param amount amount of lp token to be locked in wei
  /// @param duration how long the lock will last for
  /// @param isHard whether the stake is hard or soft locked
  function lock(
    uint256 amount,
    uint256 duration,
    bool isHard
  ) external {
    require(duration > MINDURATION, "Duration too short");

    uint256 reward = calcReward(amount, duration, isHard);
    require(availableCheems >= reward, "Not enough Cheemscoin in contract");

    _lp.transferFrom(msg.sender, address(this), amount);
    _tokenIds.increment();
    uint256 newId = _tokenIds.current();
    _safeMint(msg.sender, newId);
    availableCheems -= reward;
    stakes[newId] = stake(amount, reward, block.timestamp.add(duration), isHard);
  }

  /// @param id Token to be redeemed
  function redeem(uint256 id) external {
    require(_isApprovedOrOwner(msg.sender, id), "Missing permission to manage token");
    stake memory token = stakes[id];
    bool notEarly = token.claimTime <= block.timestamp;
    if (token.isHard) {
      require(notEarly, "Can not redeem early");
    }
    // TODO Perhaps slash a bit of liquidity if early withdrawal
    if (notEarly) {
      _cheemscoin.transfer(msg.sender, token.reward);
    }
    _lp.transfer(msg.sender, token.amount);
    _burn(id);
  }

  /**
   * @notice If you wish to donate, please use this function instead of transfering
   * directly to the contract, otherwise the funds will be lost forever.
   */
  /// @param amount amount of Cheemscoin to be donated
  function donate(uint256 amount) external {
    _cheemscoin.transferFrom(msg.sender, address(this), amount);
    availableCheems += amount;
  }
}
