import { ethers } from "ethers";
import css from "./Card.css";
import React, { useEffect, useState } from "react";
import ABI from "../ABI.json";
import tokenABI from "../tokenABI.json";
console.log(ABI);

const Card = ({ image, name, skill, price }) => {
  const [Bought, setBought] = useState(false);

  useEffect(() => {
    checkBought();
  }, []);

  const checkBought = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const currentAddress = await provider.getSigner().getAddress();
    const marketplaceContract = new ethers.Contract(
      "0xf8c3e332f8eca5e3b5de35d8fb16a8d6d54f7852",
      ABI,
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
    console.log(window.ethereum.isMetaMask);
    const currentAddress = await provider.getSigner().getAddress();
    console.log("current address", currentAddress);
    console.log(" address", address);
  };

  const payInEth = async () => {
    Connect();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const currentAddress = await provider.getSigner.getAddress;
    const marketplaceAddress = 0xda0bab807633f07f013f94dd0e6a4f96f8742b53; /* need address */
    // where is ABI coming from?
    const marketplaceContract = new ethers.Contract(
      marketplaceAddress,
      ABI,
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
    // connect to contract
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const currentAddress = await provider.getSigner();
    const token = new ethers.Contract(
      "0x6Ab650e8E4399E2E7E4D2B1888f6712eF458430F",
      tokenABI,
      signer
    );
    // get balance of wallet
    console.log(currentAddress);
    // get tokens
    token.mintTwenty();

    // print balance
  };

  const payInUSDC = async () => {
    Connect();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    // const currentAddress = await provider.getSigner.getAddress;
    const currentAddress = "0xfa57A10F1B25c57819e6B0713094bD6adE11e504";
    const marketplaceAddress = "0xf8C3E332F8eCA5e3b5de35d8FB16A8d6D54f7852";

    const marketplaceContract = new ethers.Contract(
      marketplaceAddress,
      ABI,
      signer
    );
    const token = new ethers.Contract(
      "0x6Ab650e8E4399E2E7E4D2B1888f6712eF458430F",
      tokenABI,
      signer
    );

    const totalAmount = await token.balanceOf(
      "0xfa57A10F1B25c57819e6B0713094bD6adE11e504"
    );
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
          <button className="connect-button" onClick={payInUSDC}>
            Connect
          </button>
          {/* <button className="connect-button" disable={true} onClick={MintMe}>
            Mint me
          </button> */}
        </div>
      </div>
    </main>
  );
};

export default Card;
