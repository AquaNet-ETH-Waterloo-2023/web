import {
  RainbowKitProvider,
  connectorsForWallets,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import {
  argentWallet,
  bitskiWallet,
  braveWallet,
  coinbaseWallet,
  dawnWallet,
  imTokenWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  mewWallet,
  okxWallet,
  omniWallet,
  phantomWallet,
  rabbyWallet,
  rainbowWallet,
  safeWallet,
  tahoWallet,
  trustWallet,
  walletConnectWallet,
  xdefiWallet,
  zerionWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { WagmiConfig, configureChains, createConfig, mainnet } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import usePrefersColorScheme from "@/hooks/use-color-scheme";

const { chains, publicClient } = configureChains(
  [mainnet],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID! }),
    publicProvider(),
  ]
);

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_ID!;

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [metaMaskWallet({ chains, shimDisconnect: true, projectId })],
  },
  {
    groupName: "Others",
    wallets: [
      argentWallet({ chains, projectId }),
      braveWallet({ chains }),
      coinbaseWallet({ appName: projectId, chains }),
      ledgerWallet({ chains, projectId }),
      omniWallet({ chains, projectId }),
      rainbowWallet({ chains, projectId }),
      mewWallet({ chains }),
      trustWallet({ chains, projectId, shimDisconnect: true }),
      walletConnectWallet({ chains, projectId }),
      xdefiWallet({ chains }),
      zerionWallet({ chains, projectId }),
      injectedWallet({ chains }),
      bitskiWallet({ chains }),
      dawnWallet({ chains }),
      imTokenWallet({ chains, projectId }),
      okxWallet({ chains, projectId }),
      phantomWallet({ chains }),
      rabbyWallet({ chains }),
      safeWallet({ chains }),
      tahoWallet({ chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

interface Props {
  children: React.ReactNode;
}

const RainbowkitProvider = ({ children }: Props) => {
  const theme = usePrefersColorScheme();
  const rainbowKitTheme = theme === "dark" ? darkTheme() : undefined;

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={rainbowKitTheme}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default RainbowkitProvider;
