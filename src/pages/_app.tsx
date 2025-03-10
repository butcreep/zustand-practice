import { useEffect } from "react";
import { worker } from "../mocks/browser";

function MyApp({ Component, pageProps }: any) {
  useEffect(() => {
    worker.start();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
