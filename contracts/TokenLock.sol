// SPDX-License-Identifier: GPL-3.0-or-later
// https://cheemsco.in/locks
pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

struct lock {
  IERC20 token;
  uint256 amount;
  uint256 requestTime;
}

struct request {
  IERC20 token;
  uint256 amount;
  uint256 unlockTime;
  address recipient;
}

uint256 constant BUFFER = 3 days;

/// @title ERC20 token locker
/// @author kowasaur
/// @notice Owner can lock tokens for specified period of time (lock meaning they can't withdraw)
/// @notice There's a 3 day buffer between requesting to unlock and being able to
/// @dev all time in this contract is in seconds
contract TokenLock is Ownable {
  using SafeMath for uint256;

  /// @notice After the lock duration, these can be added to requests
  lock[] public locks;
  /// @notice These can be withdrawn as long as the buffer has past
  request[] public requests;

  event LockCreated(IERC20 token, uint256 amount, uint256 requestTime);
  event UnlockRequested(IERC20 token, uint256 amount, uint256 unlockTime, address recipient);
  event TokenUnlocked(IERC20 token, uint256 amount, address recipient);
  event LockTimeExtended(
    IERC20 token,
    uint256 amount,
    uint256 durationExtension,
    uint256 newRequestTime
  );

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
    uint256 requestTime = block.timestamp.add(duration);
    locks.push(lock(token, amount, requestTime));
    emit LockCreated(token, amount, requestTime);
  }

  /// @notice If the lock duration is over, requests the tokens be moved to the recipient
  /// This can then be be done with unlock() after 3 days
  /// @param lockIndex index of the lock in locks
  /// @param recipient address that will receive the tokens
  function requestLock(uint256 lockIndex, address recipient) external onlyOwner {
    lock memory l = locks[lockIndex];
    require(block.timestamp >= l.requestTime, "Can not request early");

    uint256 unlockTime = block.timestamp.add(BUFFER);
    requests.push(request(l.token, l.amount, unlockTime, recipient));
    delete locks[lockIndex];
    emit UnlockRequested(l.token, l.amount, unlockTime, recipient);
  }

  /// @notice Enacts the request if at least 3 days has passed
  /// @param requestIndex index of the request in locks
  function unlock(uint256 requestIndex) external onlyOwner {
    request memory r = requests[requestIndex];
    require(block.timestamp >= r.unlockTime, "Can not unlock early");

    r.token.transfer(r.recipient, r.amount);
    delete requests[requestIndex];
    emit TokenUnlocked(r.token, r.amount, r.recipient);
  }

  /// @notice Adds time to a lock
  /// @param lockIndex index of the lock in locks
  /// @param durationExtension time to be added to the lock
  function extendLock(uint256 lockIndex, uint256 durationExtension) external onlyOwner {
    lock memory l = locks[lockIndex];
    uint256 newRequestTime = l.requestTime.add(durationExtension);

    locks[lockIndex].requestTime = newRequestTime;
    emit LockTimeExtended(l.token, l.amount, durationExtension, newRequestTime);
  }

  /// @dev These are needed since the default getter for arrays get indivdual elements

  function getLocks() external view returns (lock[] memory) {
    return locks;
  }

  function getRequests() external view returns (request[] memory) {
    return requests;
  }
}
