// SPDX-License-Identifier: GPL-3.0-or-later
// https://cheemsco.in
pragma solidity ^0.7.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @dev all time throughout this file is in seconds

struct stake {
  IERC20 stakedToken;
  // In staked tokens
  uint256 amount;
  // In cheemscoin
  uint256 reward;
  uint256 claimTime;
  // If it's hard locked it can't be withdrawn until the specified time
  // But if it's soft locked it can be withdrawn early but the reward is forfeited
  bool isHard;
}

struct stakeableToken {
  uint256 reward;
  uint256 minDuration;
  uint256 minAmount;
}

// TODO: Add flash loans
// TODO: Format this file https://docs.soliditylang.org/en/v0.7.4/style-guide.html
// TODO: Add events

/// @title Transferable Token Staker
/// @author kowasaur
/**
 * @notice Lock up Cheemscoin and LP Tokens and earn Cheemscoin
 * Each "stake" is represented as an ERC721 so you can transfer them
 */
/**
 * @dev It's Ownable so that other LP tokens (other pairs or exchanges)
 * can be added later on. Only the owner can call modifyStakeableToken()
 */
contract LockedCheemscoinFarm is ERC721("Locked Cheemscoin", "chLOCK"), Ownable {
  using SafeMath for uint256;
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  uint256 private immutable _startTime = block.timestamp;
  IERC20 private immutable _cheemscoin;

  uint256 private _reservedCheems = 0;

  /// @notice The stake information for each chLOCK token
  mapping(uint256 => stake) public stakes;
  /// @notice The info for each stakeable token
  mapping(IERC20 => stakeableToken) public tokensInfo;

  constructor(IERC20 cheemscoin, IERC20 lpToken) {
    _cheemscoin = cheemscoin;
    tokensInfo[lpToken] = stakeableToken(5 * 10**10, 7 days, 1 * 10**16);
  }

  /// @notice Time since this contract has been deployed
  function timeFromStart() public view returns (uint256) {
    return block.timestamp - _startTime;
  }

  /// @notice Amount of Cheemscoin that hasn't been allocated yet
  function availableCheems() public view returns (uint256) {
    return _cheemscoin.balanceOf(address(this)).sub(_reservedCheems);
  }

  /// @notice Calculates how much Cheemscoin should be rewarded
  /// @param amount amount of tokens in wei
  /// @param duration how long the lock will last for
  /// @param isHard whether the stake is hard or soft locked
  function calcReward(
    uint256 amount,
    uint256 duration,
    bool isHard,
    IERC20 token
  ) public view returns (uint256) {
    // Don't worry, this maths confuses me too
    uint256 hardBonus = isHard ? 26 weeks : 52 weeks;
    uint256 r = tokensInfo[token].reward.sub(timeFromStart().mul(10**3).div(2));
    uint256 a = amount.mul(r).div(10**12).mul(isHard ? 11 : 10);
    uint256 bonus = a.mul(duration**2).div(hardBonus.add(totalSupply().mul(1.5 days)));
    return a.mul(duration).add(bonus).div(1 weeks);
  }

  /// @notice Stakes lp tokens
  /// @param amount amount of token to be staked in wei
  /// @param duration how long the stake will last for
  /// @param isHard whether the stake is hard or soft locked
  /// @param token address of token to be staked
  function lock(
    uint256 amount,
    uint256 duration,
    bool isHard,
    IERC20 token
  ) external {
    stakeableToken memory t = tokensInfo[token];
    require(duration >= t.minDuration, "Duration too short");
    require(amount >= t.minAmount, "Amount too low");

    uint256 reward = calcReward(amount, duration, isHard, token);
    require(availableCheems() >= reward, "Not enough Cheemscoin in contract");
    require(reward > 0, "Reward must be positive");

    token.transferFrom(msg.sender, address(this), amount);
    _tokenIds.increment();
    uint256 newId = _tokenIds.current();
    _safeMint(msg.sender, newId);
    _reservedCheems += reward;
    stakes[newId] = stake(token, amount, reward, block.timestamp.add(duration), isHard);
  }

  /// @notice Redeems staked lp tokens
  /// @param id Token to be redeemed
  function redeem(uint256 id) external {
    require(_isApprovedOrOwner(msg.sender, id), "Missing permission to manage token");
    stake memory token = stakes[id];
    bool notEarly = token.claimTime <= block.timestamp;
    if (token.isHard) require(notEarly, "Can not redeem early");

    if (notEarly) _cheemscoin.transfer(msg.sender, token.reward);
    else _reservedCheems -= token.reward;

    token.stakedToken.transfer(msg.sender, token.amount);
    _burn(id);
    delete stakes[id];
  }

  /// @notice Owner can add/modify lp token reward, minDuration and minAmount
  function modifyStakeableToken(
    IERC20 token,
    uint256 reward,
    uint256 minDuration,
    uint256 minAmount
  ) external onlyOwner {
    // This exists to prevent me from creating a very small duration to steal Cheemscoin for myself
    require(minDuration >= 1 days, "minDuration too low");
    tokensInfo[token] = stakeableToken(reward, minDuration, minAmount);
  }
}
