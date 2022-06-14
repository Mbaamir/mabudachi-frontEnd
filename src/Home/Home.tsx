import { Button, Typography } from "@mui/material";

import { ethers } from "ethers";
import { useState } from "react";

declare global {
  interface Window {
    ethereum: ethers.providers.ExternalProvider;
  }
}
export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  const [addressState, setAddressState] = useState();

  async function connectToMetamask() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    setAddressState(accounts[0]);
  }

  return (
    <main>
      <h1>Home Page</h1>
      <Typography>{addressState}</Typography>
      <Button variant="contained" onClick={connectToMetamask}>
        Connect Wallet
      </Button>
    </main>
  );
}
