import { React, useEffect, useState } from "react";
import Card from "./Card";
import css from "./Product.css";
import products from "../resources/products";
import tokenABI from "../Web3/tokenABI.json";
import { ethers } from "ethers";

export default function Product(props) {
  const [userWalletNUmber, setUserWalletNumber] = useState(null);
  const [connectedToMetaMask, setConnectedToMetaMask] = useState(false);
  const [totalSupply, setTotalSupply] = useState(null);
  const [userWalletBalance, setUserWalletBalance] = useState(null);

  useEffect(() => {
    getInfo();
    getTokenInfo();
  }, []);

  const getInfo = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const currentAddress = await provider.getSigner().getAddress();
    const isConnected = await window.ethereum.isMetaMask;
    console.log(isConnected);
    setConnectedToMetaMask(isConnected);
    setUserWalletNumber(currentAddress);
    console.log();

    const walletBalance = await provider.getBalance(currentAddress);
    console.log(parseInt(walletBalance));
  };

  const getTokenInfo = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const currentAddress = await provider.getSigner().getAddress();
    const token = new ethers.Contract(
      "0x4D9eA1C94910FDF8E59A77738B21ed6050DFb4BC",
      tokenABI,
      signer
    );
    const totalSupply = await token.totalSupply();
    const balanceOfUserWallet = await token.balanceOf(
      "0xfa57a10f1b25c57819e6b0713094bd6ade11e504"
    );
    setUserWalletBalance(parseInt(balanceOfUserWallet));
    setTotalSupply(parseInt(totalSupply));
  };

  return (
    <div>
      <main>
        <div className="info-container">
          <div className="user-info">
            <p>User Info</p>
            <p>
              Wallet number:
              {userWalletNUmber ? userWalletNUmber : "Loading..."}
            </p>
            <p>
              Wallet balance:
              {userWalletBalance ? userWalletBalance : "loading..."}
            </p>
            <p>
              isConnectedToMetaMask: {connectedToMetaMask ? "True" : "False"}
            </p>
          </div>

          <div className="token-info">
            <p>Info for the deployed token</p>
            <p>Already minted:{totalSupply ? totalSupply : "Loading..."}</p>
          </div>
        </div>
        <section>
          {products.map(({ name, image, skill, key, price }) => {
            return (
              <Card
                name={name}
                image={image}
                skill={skill}
                key={key}
                price={price}
              />
            );
          })}
        </section>
      </main>
    </div>
  );
}
