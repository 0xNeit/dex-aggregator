import React from "react";
// import {Router, Route} from "react-router-dom";
import { EthereumContextProvider } from "./state/EthereumContext";
import Layout from "./components/Layout";
import Swap from "./pages/Swap";

const App = () => {
  return (
    <EthereumContextProvider>
      <Layout>
        <Swap />
      </Layout>
    </EthereumContextProvider>
  )
  }

export default App;
