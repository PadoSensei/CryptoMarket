import { ethers } from "ethers";
import css from "./Card.css";
import React, { useEffect, useState } from "react";
import marketABI from "../Web3/marketABI.json";
import tokenABI from "../Web3/tokenABI.json";
import addresses from "../Web3/constants";
console.log(addresses);

// const marketContractAddress = "0x4D9eA1C94910FDF8E59A77738B21ed6050DFb4BC";
// const tokenContractAddress = "0x0EA75a2bFB5bbe3D5D997Ac980774BDA9C6Cf33a";

const Card = ({ image, name, skill, price }) => {
  const [Bought, setBought] = useState(false);

  // const { marketPlaceContractAddress, tokenContractAddress } = addresses;
  // console.log(typeof marketPlaceContractAddress, tokenContractAddress);

  useEffect(() => {
    checkBought();
  }, []);

  const checkBought = async () => {
    console.log("0x6Ab650e8E4399E2E7E4D2B1888f6712eF458430F");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const currentAddress = await provider.getSigner().getAddress();
    const marketplaceContract = new ethers.Contract(
      "0x6ab650e8e4399e2e7e4d2b1888f6712ef458430f",
      marketABI,
      signer
    );
    const bought = await marketplaceContract.alreadyBought(currentAddress);
    console.log(bought);
  };

  const Connect = async () => {
    console.log("Connecting...");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const address = await provider.send("eth_requestAccounts");
    console.log("trying to connect...");
    // console.log(window.ethereum.isMetaMask);
    const currentAddress = await provider.getSigner().getAddress();
    console.log("current address", currentAddress);
    console.log(" address", address);
  };

  const payInEth = async () => {
    Connect();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const currentAddress = await provider.getSigner.getAddress;
    const marketplaceAddress = 0x6ab650e8e4399e2e7e4d2b1888f6712ef458430f;
    const marketplaceContract = new ethers.Contract(
      marketplaceAddress,
      marketABI,
      signer
    );
    const amount = await provider.getBalance(currentAddress);
    const formatted = ethers.utils.formatEther(amount);
    console.log("formatted");
    const price = await marketplaceContract.getPriceOfEth();

    console.log(ethers.utils.formatEther(price));
    console.log(ethers.utils.formatEther(amount));

    if (ethers.utils.formatEther(amount) >= ethers.utils.formatEther(price)) {
      console.log("trying to buy");
      // they buy
      const pay = await marketplaceContract.payInEth({ value: price });
      console.log(pay);
      const receipt = await pay.wai1t();
      if (receipt.confirmations > 0) {
        setBought(pay);
        console.log(pay);
      }
    } else {
      console.log("Not enough eth" + amount + ":" + price);
      // they can't buy
    }
  };

  const MintMe = async () => {
    // // connect to contract
    console.log("minting....");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const currentAddress = await provider.getSigner();
    const token = new ethers.Contract(
      "0x4D9eA1C94910FDF8E59A77738B21ed6050DFb4BC",
      tokenABI,
      signer
    );
    // get balance of wallet
    const balanceOfWallet = await token.balanceOf(
      "0xfa57A10F1B25c57819e6B0713094bD6adE11e504"
    );
    console.log(parseInt(balanceOfWallet));
    // get tokens
    await token.mintTwenty();
    // print balance
    const newBalanceOfWallet = await token.balanceOf(
      "0xfa57A10F1B25c57819e6B0713094bD6adE11e504"
    );
    console.log(parseInt(newBalanceOfWallet));
  };

  const payInUSDC = async () => {
    Connect();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const currentAddress = await provider.getSigner().getAddress();

    const walletBalance = await provider.getBalance(currentAddress);
    console.log(parseInt(walletBalance));
    // const currentAddress = "0xfa57A10F1B25c57819e6B0713094bD6adE11e504";
    //const marketplaceAddress = marketContractAddress;

    const marketplaceContract = new ethers.Contract(
      "0x6Ab650e8E4399E2E7E4D2B1888f6712eF458430F",
      marketABI,
      signer
    );
    const owner = await marketplaceContract.owner();
    console.log(owner);

    const token = new ethers.Contract(
      "0x4D9eA1C94910FDF8E59A77738B21ed6050DFb4BC",
      tokenABI,
      signer
    );

    const balanceOfUserWallet = await token.balanceOf(
      "0xfa57a10f1b25c57819e6b0713094bd6ade11e504"
    );

    console.log(parseInt(balanceOfUserWallet));

    const totalAmount = await token.balanceOf(
      "0x4D9eA1C94910FDF8E59A77738B21ed6050DFb4BC"
    );
    const totalAllowed = await token.allowance(
      currentAddress,
      "0x4D9eA1C94910FDF8E59A77738B21ed6050DFb4BC"
    );
    let price = await marketplaceContract.price();

    // console.log(totalAllowed);
    console.log(parseInt(totalAmount));

    const formatPrice = (price) => {
      return price / 1000000000000000000;
    };

    price = formatPrice(price);
    console.log(parseInt(price));

    if (price <= parseInt(balanceOfUserWallet)) {
      // if (price <= totalAllowed) {
      console.log("Buying....");
      const purchase = await marketplaceContract.payInUSDC();
      setBought(purchase);
    } else {
      // don't have enough to buy
      console.log(
        "You don't have enough to buy on this account. Balance:",
        parseInt(totalAmount)
      );
    }
    // }
  };

  return (
    <main className="cards">
      <div className="card__image-container">
        <img src={image} width="400" alt="description" />
      </div>

      <div className="card__content">
        <p className="card__title text--medium">{name}</p>
        <div className="card__info">
          <p className="text--medium">SKILL:{skill}</p>
        </div>

        {Bought === true ? (
          <div>
            <p>You've been trained in this discipline!</p>
            <p className="card__price text__price">
              <a href="/Profile">View Your Profile</a>
            </p>
          </div>
        ) : (
          <>
            <div>
              <img
                className="buyIcon"
                src="https://imgur.com/MQHRBrg.png"
                alt="icon"
                onClick={payInUSDC}
              ></img>
              <img
                className="buyIcon"
                src="https://imgur.com/wndKTZS.png"
                alt="icon"
              ></img>
              <img
                className="buyIcon"
                src="https://imgur.com/sQsv7UD.png"
                alt="ETH icon"
              ></img>
            </div>
            <div>
              <p className="card__price text__price">${price}</p>
            </div>
          </>
        )}
        <div>
          <button className="connect-button" onClick={Connect}>
            Connect
          </button>
          <button className="connect-button" disable="false" onClick={MintMe}>
            Mint me
          </button>
        </div>
      </div>
    </main>
  );
};

export default Card;
