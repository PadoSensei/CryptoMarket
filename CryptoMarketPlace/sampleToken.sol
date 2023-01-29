// SPDX-License-Identifier: MIT

// Fake version of ERC20 for testing purposes

import "http://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/token/ERC20/ERC20.sol";

contract usdc is ERC20("USCDFake", "USDCFake") {
    function mintTwenty() public {
        _mint(msg.sender, 20);
    }
}
