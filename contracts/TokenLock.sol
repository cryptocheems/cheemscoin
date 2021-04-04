// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.7.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

// note: all time is in seconds

struct lock {
  IERC20 token;
  uint256 amount;
  uint256 requestTime;
  uint256 unlockTime;
}

uint256 constant BUFFER = 3 days;

contract TokenLock is Ownable {
  using SafeMath for uint256;

  lock[] public locks;

  function createLock(
    IERC20 token,
    uint256 amount,
    uint256 duration
  ) public onlyOwner {
    token.transferFrom(msg.sender, address(this), amount);
    locks.push(lock(token, amount, block.timestamp.add(duration), 0));
  }

  function unlock(uint256 lockIndex, address recipient) public onlyOwner {
    lock memory l = locks[lockIndex];
    require(block.timestamp >= l.requestTime, "Can not unlock early");

    if (l.unlockTime == 0) {
      l.unlockTime = block.timestamp.add(BUFFER);
      locks[lockIndex] = l;
    } else {
      require(block.timestamp >= l.unlockTime, "Buffer not over");
      l.token.transfer(recipient, l.amount);
    }
  }

  function extendLock(uint256 lockIndex, uint256 durationExtension) public onlyOwner {
    lock memory l = locks[lockIndex];
    l.requestTime.add(durationExtension);
    locks[lockIndex] = l;
  }
}
