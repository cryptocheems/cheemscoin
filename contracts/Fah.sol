// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

struct User {
  address account;
  uint256 amount;
}

contract Fah {
  address public dev = msg.sender;
  IERC20 private cheemscoin;

  constructor(IERC20 _cheemscoin) {
    cheemscoin = _cheemscoin;
  }

  function distribute(uint256 _total, User[] memory _users) public {
    require(msg.sender == dev, "Only dev address can distribute");
    require(_total >= cheemscoin.balanceOf(address(this)), "Contract doesn't have enough funds");

    for (uint32 i = 0; i < _users.length; i++) {
      cheemscoin.transfer(_users[i].account, _users[i].amount);
    }
  }
}
