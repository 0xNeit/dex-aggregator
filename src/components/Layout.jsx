/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import styled from "styled-components";
import chains from "../data/chains";
import logo from "../assets/eth-logo.png";
import walleticon from "../assets/wallet.svg";

const Nav = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 0 max(calc(50vw - 550px), 20px);
    `

const ConnectButton = styled.button`
    font-size: 1.1rem;
    background-color: var(--light);
    border: 1px solid var(--background);
    bordcer-radius: 8px;
    padding: 8px 36px;
    &:hover {
        border: 1px solid var(--light-dark);
    }
    `
const ConnectContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    `

const ConnectIcon = styled.img`
    width: 0.8rem;
    height: 0.8rem;
    object-fit: contain;
    margin-right: 0.75rem;
    `

const StyledIcon = styled.img`
    width: 40px;
    height: 40px;
    object-fit: contain;
    margin-right: 12px;
    `

const StyledTitle = styled.div`
    font-size: 1.1rem;
    font-weight: bold;
    `

const Content = styled.div`
    width: 100%;
    padding: 0 max(calc(50vw - 550px), 20px);
    `    
const Wrapper = styled.div`
    font-size: 1.1rem;
    `

const Wallet = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    `

const Chain = styled.button`
    font-size: 1.1rem;
    border: 1px solid var(--light-dark);
    border-radius: 8px;
    padding: 8px 36px;
    margin-right: 1rem;
    &:hover {
        background-color: var(--light);
    }
    `
const ChainIcon = styled.img`
    width: 0.8rem;
    height: 0.8rem;
    object-fit: contain;
    margin-right: 0.75rem;
    `

const WalletManager = () => {

    const [ buttonText, setButtonText ] = useState("Enable Ethereum")
    const [ activeChain, setActiveChain ] = useState("0x1")

    useEffect(() => {
        updateButtonText()
        updateActiveChain()
    }, [])

    useEffect(() => {
        // Set MetaMask listeners

        if (typeof ethereum !== "undefined" && !ethereum.walletInitialized) {
            ethereum.walletInitialized = true
            ethereum.on("accountsChanged", updateButtonText)
            ethereum.on("chainChanged", updateActiveChain)
        }

        // Remove MetaMask listeners

        return () => {
            if (typeof ethereum !== "undefined") {
                ethereum.walletInitialized = false
                ethereum.removeListener("accountsChanged", updateButtonText)
                ethereum.removeListener("chainChanged", updateActiveChain)
            }
        }
    })

    // Get button text

    function updateButtonText() {
        if (typeof ethereum === "undefined") {
            setButtonText("Enable Ethereum")
        } else if (!ethereum.selectedAddress) {
            setButtonText("Connect Wallet")
        } else {
            setButtonText(`${ethereum.selectedAddress.slice(0, 6)}...${ethereum.selectedAddress.slice(-4)}`)
        }
    }

    // Get active chain

    function updateActiveChain() {
        if (typeof ethereum === "undefined" || !ethereum.selectedAddress) {
            setActiveChain("0x1")
        } else if (chains[ethereum.chainId]) {
            setActiveChain(ethereum.chainId)
        }
    }

    // Connect to MetaMask

    async function requestConnect() {
        if (typeof ethereum !== "undefined") {
            await ethereum.request({ method: "eth_requestAccounts" })
        }
    }

    return (
        <Wallet>
            <Chain>
                <ChainIcon src={`/tokens/${chains[activeChain].token}.svg`} />
                {chains[activeChain].name}
            </Chain>
            <ConnectButton onClick={requestConnect}>
                <ConnectContent>
                    <ConnectIcon src={walleticon} />
                    {buttonText}
                </ConnectContent>
            </ConnectButton>
        </Wallet>   
        )
    }

const NavBar = () => (
    <Nav>
        <StyledIcon src={logo} />
        <StyledTitle>Cross DEX</StyledTitle>
        <WalletManager></WalletManager>
    </Nav>
)


// Layout component

const Layout = ({ children }) => (
    <Wrapper>
        <NavBar></NavBar>
        <Content>{children}</Content>
    </Wrapper>

)

// Exports
export default Layout

