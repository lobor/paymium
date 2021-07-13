import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Nav";

/**
 * 
 * Wrapper pages
 */
function _App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default _App;
