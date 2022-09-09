/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import useEthereum, { chains } from "../hooks/useEthereum";
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
    z-index: 1;
    border: 1px solid var(--light-dark);
    border-radius: 8px;
    `

const SwitchChain = styled.button`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: var(--background);
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
    // Wallet data

    const { enabled, chain, account } = useEthereum()
    const [ chainSelectActive, setChainSelectActive ] = useState(false)


    // Connect to MetaMask

    async function requestConnect() {
        if (!enabled) return
        await ethereum.request({ method: "eth_requestAccounts" })
    }

    // Switch wallet to chain ID

    async function requestSwitch(chainId) {
        if (!enabled) return
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

    // Detect click off chain select

    useEffect(() => {
        function clickOff(event) {
            if (
                document.getElementById("chain-select") &&
                !event.path.includes(document.getElementById("select-chain")) &&
                !event.path.includes(document.getElementById("chain-select"))
            ) {
                setChainSelectActive(false)
            }
        }
        document.documentElement.addEventListener("click", clickOff)
        return () => document.documentElement.removeEventListener("click", clickOff)
    }, [])

    return (
        <Wallet>
            <Chain id="select-chain" onClick={() => setChainSelectActive(!chainSelectActive)}>
                <ChainIcon src={`/chains/${chain.id}.svg`}/>
                {chain.name}
            </Chain>
            <ConnectButton onClick={requestConnect}>
                <ConnectContent>
                    <ConnectIcon src="/icons/wallet.svg" />
                    {enabled ? account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet" : "Enable Ethereum"}
                </ConnectContent>
            </ConnectButton>
            {chainSelectActive ? (
                    <ChainSelect id="chain-select">
                        {chainIds.slice(0, chainIds.indexOf(chain.id)).concat(chainIds.slice(chainIds.indexOf(chain.id) + 1)).map(chainId => (
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