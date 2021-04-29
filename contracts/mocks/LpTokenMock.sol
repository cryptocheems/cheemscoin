// SPDX-License-Identifier: MIT
pragma solidity ^0.7.4;

import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";

contract LpTokenMock is ERC20Burnable {
  constructor() ERC20("Uniswap V2", "UNI-V2") {
    _mint(msg.sender, 3000 * 10**18);
  }
}
