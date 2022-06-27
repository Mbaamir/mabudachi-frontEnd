import { Button, Typography } from "@mui/material";
import SocialMedia from "../../Layouts/Navbar/SocialMedia/SocialMedia";

// import {
//   init,
//   useConnectWallet,
//   useSetChain,
//   useWallets,
// } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import walletConnectModule from "@web3-onboard/walletconnect";
import { useState } from "react";

const injected = injectedModule();
const walletConnect = walletConnectModule();

// const web3Onboard = init({
//   wallets: [injected, walletConnect],
//   chains: [
//     {
//       id: "0x3",
//       token: "tROP",
//       label: "Ethereum Ropsten Testnet",
//       rpcUrl: "https://ropsten.infura.io/v3/ababf9851fd845d0a167825f97eeb12b",
//     },
//   ],
//   appMetadata: {
//     name: "MabuDachi",
//     icon: "<svg><svg/>",
//     description: "Demo app for Mabudachi",
//     recommendedInjectedWallets: [
//       { name: "MetaMask", url: "https://metamask.io" },
//       { name: "Coinbase", url: "https://wallet.coinbase.com/" },
//     ],
//   },
//   accountCenter: {
//     desktop: {
//       position: "topRight",
//       enabled: false,
//       minimal: true,
//     },
//     mobile: {
//       position: "topRight",
//       enabled: false,
//       minimal: true,
//     },
//   },
// });

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  const [addressState, setAddressState] = useState();

  return (
    <main>
      <h1>Home Page</h1>
      <Typography>{addressState}</Typography>
      <Button variant="contained">Connect Wallet</Button>
    </main>
  );
}
