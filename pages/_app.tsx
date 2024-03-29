import "../styles/globals.css";
import "../styles/loading-dot.css";

import { AuthContextProvider } from "@elrond-giants/erd-react-hooks/dist/useAuth";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import Script from "next/script";
import { Provider as ReduxProvider } from "react-redux";

import Notifications from "../components/Notifications";
import store from "../redux/store";

import {networkEnv} from "../config";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        title="Grape"
        description="Grape provides the tools required to generate images based on text input, guides you through getting the most out of the AI model and offers a All In One place to mint your newly generated image as a NFT"
        openGraph={{
          type: "website",
          locale: "en_IE",
          url: "https://grape.tools/",
          images: [
            {
              url: "https://grape.tools/socials.png",
              width: 1012,
              height: 506,
              alt: "Grape.tools",
              type: "image/png",
            },
          ],
        }}
        twitter={{
          handle: "@grape_tools",
          cardType: "summary_large_image",
        }}
      />
      <ReduxProvider store={store}>
        <AuthContextProvider env={networkEnv == "mainnet" ? "mainnet" : "devnet"}>
          <Component {...pageProps} />
          <Notifications />
        </AuthContextProvider>
      </ReduxProvider>
      <Script src="https://kit.fontawesome.com/42d5adcbca.js" crossOrigin="anonymous"></Script>
    </>
  );
}

export default MyApp;
