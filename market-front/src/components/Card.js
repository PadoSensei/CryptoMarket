import { ethers } from "ethers";
import css from "./Card.css";
import React, { useEffect, useState } from "react";
import marketABI from "../Web3/marketABI.json";
import tokenABI from "../Web3/tokenABI.json";
import addresses from "../Web3/constants";
console.log(marketABI);

const marketContractAddress = "0x4D9eA1C94910FDF8E59A77738B21ed6050DFb4BC";
const tokenContractAddress = "0x0EA75a2bFB5bbe3D5D997Ac980774BDA9C6Cf33a";

const Card = ({ image, name, skill, price }) => {
  const [Bought, setBought] = useState(false);

  // const { marketContractAddress, tokenContractAddress } = addresses;
  // console.log(marketContractAddress, tokenContractAddress);

  useEffect(() => {
    checkBought();
  }, []);

  const checkBought = async () => {
    console.log(marketContractAddress);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const currentAddress = await provider.getSigner().getAddress();
    const marketplaceContract = new ethers.Contract(
      marketContractAddress,
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
    const marketplaceAddress = 0xda0bab807633f07f013f94dd0e6a4f96f8742b53;
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
    // refactor
    // // connect to contract
    // console.log("minting....");
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    // const currentAddress = await provider.getSigner();
    // const token = new ethers.Contract(
    //   "0x0EA75a2bFB5bbe3D5D997Ac980774BDA9C6Cf33a",
    //   tokenABI,
    //   signer
    // );
    // // get balance of wallet
    // const balanceOfWallet = await token.balanceOf(
    //   "0xfa57A10F1B25c57819e6B0713094bD6adE11e504"
    // );
    // console.log(balanceOfWallet);
    // // get tokens
    // token.mintTwenty();
    // // print balance
    // const newBalanceOfWallet = await token.balanceOf("currentAddress");
    // console.log(newBalanceOfWallet);
  };

  const payInUSDC = async () => {
    Connect();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const currentAddress = await provider.getSigner.getAddress;
    // const currentAddress = "0xfa57A10F1B25c57819e6B0713094bD6adE11e504";
    const marketplaceAddress = marketContractAddress;

    const marketplaceContract = new ethers.Contract(
      marketplaceAddress,
      marketABI,
      signer
    );
    const token = new ethers.Contract(tokenContractAddress, tokenABI, signer);

    const totalAmount = await token.balanceOf(tokenContractAddress);
    const totalAllowed = await token.allowance(
      currentAddress,
      marketplaceAddress
    );
    const price = await marketplaceContract.price();

    console.log(totalAllowed);
    console.log(totalAmount);
    console.log(price);

    // if (price <= totalAmount) {
    //   if (price <= totalAllowed) {
    //     const purchase = await marketplaceContract.payInUSDC();
    //     setBought(purchase);
    //   } else {
    //     // don't have enough to buy
    //   }
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
              ></img>
              <img
                className="buyIcon"
                src="https://imgur.com/wndKTZS.png"
                alt="icon"
              ></img>
              <img
                className="buyIcon"
                src="https://imgur.com/sQsv7UD.png"
                alt="icon"
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
          <button className="connect-button" disable="true" onClick={MintMe}>
            Mint me
          </button>
        </div>
      </div>
    </main>
  );
};

export default Card;
