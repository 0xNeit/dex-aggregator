// import { useState } from "react";
import styled from "styled-components";
import Logo from "../assets/eth-logo.png";

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
    margin-left: auto;
    &:hover {
        border: 1px solid var(--light-dark);
    }
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

    
const WalletManager = () => {
    return (
        <ConnectButton>Connect Wallet</ConnectButton>   
        )
    }

const NavBar = () => (
    <Nav>
        <StyledIcon src={Logo} />
        <StyledTitle>Cross DEX</StyledTitle>
        <WalletManager></WalletManager>
    </Nav>
)

// Layout component

const Layout = () => (
    <NavBar></NavBar>
)

// Exports
export default Layout

