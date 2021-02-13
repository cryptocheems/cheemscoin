// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract Exchange {
  // TODO: Add events

  // Price in wei
  uint256 public price = 0.01 * 10**18;
  address payable public dev = msg.sender;
  IERC20 private cheemscoin;

  constructor(IERC20 _cheemscoin) {
    cheemscoin = _cheemscoin;
  }

  function buy() public payable {
    uint256 cheemsAmount = SafeMath.div(msg.value, price) * 10**18;

    require(
      cheemsAmount <= cheemscoin.balanceOf(address(this)),
      "Contract doesn't have enough funds"
    );

    dev.transfer(msg.value);
    cheemscoin.transfer(msg.sender, cheemsAmount);
  }

  function setPrice(uint256 _newPrice) public {
    require(msg.sender == dev, "Price can only be set by dev address");
    price = _newPrice;
  }
}
