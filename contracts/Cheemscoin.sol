// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";

contract Cheemscoin is ERC20Burnable {
  constructor() ERC20("Cheemscoin", "CHEEMS") {
    _mint(msg.sender, 690420 * 10**18);
  }
}
