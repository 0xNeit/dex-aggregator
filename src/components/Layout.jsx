/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import useEthereum from "../hooks/useEthereum";
import styled from "styled-components";
import logo from "../assets/eth-logo.png";

const chainIds = Object.keys(chains)

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
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
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
    width: 0.9rem;
    height: 0.9rem;
    object-fit: contain;
    margin-right: 0.75rem;
    `

const ChainSelect = styled.div`
    position: absolute;
    top: calc(8px * 2 + 1.1rem + 1rem);
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    border: 1px solid var(--light-dark);
    border-radius: 8px;
    `

const SwitchChain = styled.button`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 8px 16px;
    &:first-child {
        border-radius: 8px 8px 0 0;
    }
    &:last-child {
        border-radius: 0 0 8px 8px;
    }
    &:hover {
        background-color: var(--light);
    }
    `

const SwitchIcon = styled.img`
    width: 0.7rem;
    height: 0.7rem;
    object-fit: contain;
    margin-right: 0.65rem;
    `

const WalletManager = () => {
    useEthereum()
    const [ buttonText, setButtonText ] = useState("Enable Ethereum")
    const [ activeChain, setActiveChain ] = useState("0x1")
    const [ chainSelectActive, setChainSelectActive ] = useState(false)

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

    // Switch wallet to chain ID

    async function requestSwitch(chainId) {
        if (typeof ethereum !== "undefined") {
            setChainSelectActive(false)
            try {
                await ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId }]
                })
            } catch {
                await ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [{
                        chainId,
                        chainName: chains[chainId].fullName,
                        nativeCurrency: {
                            name: chains[chainId].token,
                            symbol: chains[chainId].token,
                            decimals: 18
                        },
                        rpcUrls: [chains[chainId].rpc],
                        blockExplorerUrls: [chains[chainId].explorer]
                    }]
                })
            }
        }
    }

    return (
        <Wallet>
            <Chain onClick={() => setChainSelectActive(!chainSelectActive)}>
                <ChainIcon src={`/chains/${activeChain}.svg`} />
                {chains[activeChain].name}
            </Chain>
            <ConnectButton onClick={requestConnect}>
                <ConnectContent>
                    <ConnectIcon src="/icons/wallet.svg" />
                    {buttonText}
                </ConnectContent>
            </ConnectButton>
            {chainSelectActive ? (
                    <ChainSelect>
                        {chainIds.slice(0, chainIds.indexOf(activeChain)).concat(chainIds.slice(chainIds.indexOf(activeChain) + 1)).map(chainId => (
                            <SwitchChain onClick={() => requestSwitch(chainId)} key={chainId}>
                                <SwitchIcon src={`/chains/${chainId}.svg`} />
                                {chains[chainId].name}
                            </SwitchChain>
                        ))}
                    </ChainSelect>
                ) : (
                    <></>
                )}
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

