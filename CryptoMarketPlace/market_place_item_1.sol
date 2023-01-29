// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;
import "http://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/token/ERC20/ERC20.sol";
import "@chaninlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

// smart contract 1 = marketplace item 1

contract marketplaceItem1 {
    AggregatorV3Interface internal priceFeed = AggregatorV3Interface(); // requires Interface address

    // record of people who have already bought
    mapping(address => bool) public alreadyBought;

    // price of item
    uint256 public price = 10;

    // sets whoever created contract as the 'owner', money will be transfered to their account
    address public owner = payable(msg.sender);

    // imports the tokens to use and build on
    IERC20 public usdcToken = IERC20(); // requires address
    IERC20 public usdtToken = IERC20(); // requires address

    function payInUSDC() public returns (bool) {
        // checks address is not on alreadyBought list
        require(
            alreadyBought[msg.sender] == false,
            "You have already bought this item"
        );

        // Transfers the price from sender acc to owner acc
        usdcToken.transferFrom(msg.sender, owner, price);

        // adds sender address to Bought list
        alreadyBought[msg.sender] = true;
        return alreadyBought[msg.sender];
    }

    function payInUSDT() public returns (bool) {
        // checks address is not on alreadyBought list
        require(
            alreadyBought[msg.sender] == false,
            "You have already bought this item"
        );

        // Transfers the price from sender acc to owner acc
        usdtToken.transferFrom(msg.sender, owner, price);

        // adds sender address to Bought list
        alreadyBought[msg.sender] = true;
        return alreadyBought[msg.sender];
    }

    function getCurrentPriceOfEth() public view returns (int256) {
        // pulls price of Eth from chain to eight demical places
        (
            ,
            /*data1*/
            int256 priceOfUSD, /*data2*/ /*data3*/ /*data4*/
            ,
            ,

        ) = priceFeed.lastestRoundData();

        return priceofUSD / 10**8;
    }

    function getPriceInEth() public view return(int){
        // result of function call
        return int(price) / getCurrentPriceOfEth();
    }

    function payInEth() {

    }

    function payInEth() public payable returns (bool){
        // requires eth sent to be equal to price in ETH
        require(msg.value == unint(getPriceInETH()), "Not enough ETh sent!");
        (bool sent, /*data*/) = owner.call(value: msg.value)("");

        // transfers received money to contract owner
        require(sent = true, "Failed to tranfer ETH");

        // adds sender to Bought list
        alreadyBought[msg.sender] = true;
        // confirms addition and sends that truthy value as the truthy for the transaction. Smart
        return alreadyBought[msg.sender];

    }
}
