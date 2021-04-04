// SPDX-License-Identifier: GPL-3.0-or-later
// https://cheemsco.in
pragma solidity 0.7.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

struct lock {
  IERC20 token;
  uint256 amount;
  uint256 requestTime;
  uint256 unlockTime;
}

uint256 constant BUFFER = 3 days;

/// @title ERC20 token locker
/// @author kowasaur
/// @notice Owner can lock tokens for specified period of time (lock meaning they can't withdraw)
/// @notice There's a 3 day buffer between requesting to unlock and being able to
/// @dev all time is in seconds
contract TokenLock is Ownable {
  using SafeMath for uint256;

  lock[] public locks;

  /// @notice Locks a token for the specified duration
  /// @param token an ERC20 token
  /// @param amount amount of token to be locked in wei
  /// @param duration how long the lock will last for
  function createLock(
    IERC20 token,
    uint256 amount,
    uint256 duration
  ) external onlyOwner {
    token.transferFrom(msg.sender, address(this), amount);
    locks.push(lock(token, amount, block.timestamp.add(duration), 0));
  }

  /** 
    @notice Sends the locked tokens to the recipient if the 3 day buffer has passed.
    If the owner hasn't requested to unlock, it creates the 3 day buffer instead. 
    If the lock duration hasn't finished, it fails. 
  */
  /// @param lockIndex index of the lock in locks
  /// @param recipient the address of who receives the tokens
  function unlock(uint256 lockIndex, address recipient) external onlyOwner {
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

  /// @notice Adds time to a lock
  /// @param lockIndex index of the lock in locks
  /// @param durationExtension time to be added to the lock
  function extendLock(uint256 lockIndex, uint256 durationExtension) external onlyOwner {
    lock memory l = locks[lockIndex];
    l.requestTime.add(durationExtension);
    locks[lockIndex] = l;
  }
}
