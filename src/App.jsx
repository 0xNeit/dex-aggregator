import React from "react";
// import {Router, Route} from "react-router-dom";
import { EthereumContextProvider } from "./state/EthereumContext";
import { PriceContextProvider } from "./state/PriceContext";
import Layout from "./components/Layout";
import Swap from "./pages/Swap";

const App = () => {
  return (
    <EthereumContextProvider>
      <PriceContextProvider>
        <Layout>
          <Swap />
        </Layout>
      </PriceContextProvider>
    </EthereumContextProvider>
  )
  }

export default App;
