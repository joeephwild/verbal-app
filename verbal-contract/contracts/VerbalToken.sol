// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract VerbalToken is ERC20 {
    address public Holder;
    address public immutable deployer;

    bool called;

    constructor() ERC20("VerbalToken", "VTK") {
        deployer = msg.sender;
    }

    function initFunction(address holder) external {
        require(msg.sender == deployer && called == false);
        Holder = holder;
        _mint(holder, 100000 * 10 ** decimals());
        called = true;
    }
}
