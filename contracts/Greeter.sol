// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

contract Greeter {
  string greeting = "Hello World";

  function set(string memory _greeting) public {
    greeting = _greeting;
  }

  function get() public view returns (string memory) {
    return greeting;
  }
}
