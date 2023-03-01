import type { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import { UserProvider } from "../context/user.context";
import "../styles/globals.css";
import { User } from "../types";

/**
 * RainbowKit
 */

import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: "RYFTConnector",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
interface UserAppProps extends AppProps {
  pageProps: {
    user?: User;
  };
}

export default function App({ Component, pageProps }: UserAppProps) {
  console.log(pageProps?.user, "Justin components")
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor: "#7b3fe4",
          accentColorForeground: "white",
          borderRadius: "small",
          fontStack: "system",
          overlayBlur: "small",
        })}
      >
        <UserProvider initialUser={pageProps?.user}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
