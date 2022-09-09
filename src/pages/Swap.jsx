import { useState } from "react";
import styled from "styled-components";
import swapicon from "../data/icons/switch.svg";


const Content = styled.div`
    width: 100%;
    height: calc(100vh - 80px);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 40px 0;
    `

const SectionNav = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    `

const NavButton = styled.div`
    font-size: 2.5rem;
    font-weight: bold;
    background-color: transparent;
    border: none;
    &:first-child {
        margin-right: 64px;
    }
    `

const Input = styled.input`
    width: 65%;
    font-size: 1.2rem;
    outline: none;
    border: 1px solid var(--light-gray);
    border-radius: 8px;
    padding: 8px 12px;
    margin-right: 5%;
    &:focus {
        border: 1px solid var(--gray);
    }
    `

const StyledInterface = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    `
    
const StyledImage = styled.img`
    width: 20px;
    height: 20px;
    object-fit: contain;
    `

const Settings = styled.div`
    width: 100%;
    height: 100%;
    margin: 40px 0;
    `

const TokenSection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    `

const Switch = styled.button`
    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--light-dark);
    border-radius: 20px;
    margin: 18px 0;
    &:hover {
        background-color: var(--light);
    }
    `

const Output = styled.input`
    width: 65%;
    font-size: 1.2rem;
    border: 1px solid var(--light-gray);
    border-radius: 8px;
    padding: 8px 12px;
    margin-right: 5%;
    `

const SwapButton = styled.button`
    width: 100%;
    font-size: 1.2rem;
    text-align: center;
    background-color: var(--light);
    border: 1px solid var(--background);
    border-radius: 8px;
    padding: 12px 0;
    margin-top: 18px;
    &:hover {
        border: 1px solid var(--light-dark);
    }
    `

const SwapInput = ({ backgroundColor }) => {
    // Component

    return (
        <Input></Input>
    )
}

const TokenSelect = () => (
    <>this is token select</>
)



const SwapInterface = () => {

    return (
        <StyledInterface>
            <TokenSection>
                <SwapInput></SwapInput>
                <TokenSelect></TokenSelect>
            </TokenSection>
            <Switch>
                <StyledImage src={swapicon} />
            </Switch>
            <TokenSection>
                <Output></Output>
                <TokenSelect></TokenSelect>
            </TokenSection>
            <SwapButton>Swap Tokens</SwapButton>
        </StyledInterface>
    )
}

const SwapSettings = () => {
    return (
        <Settings>This is the settings</Settings>
    )
}

const Swap = () => {

    const [ section, setSection ] = useState("swap")

    return (
        <Content>
            <SwapInterface>
                <SectionNav>
                    <NavButton
                        style={{ color: `var(--${section === "swap" ? "black" : "gray"})` }}
                        onClick={() => setSection("swap")}>Swap
                    </NavButton>
                    <NavButton
                        style={{ color: `var(--${section === "settings" ? "black" : "gray"})` }}
                        onClick={() => setSection("settings")}>Settings</NavButton>
                </SectionNav>
                {section === "swap" ? <SwapInterface></SwapInterface> : section === "settings" ? <SwapSettings></SwapSettings> : <></>}
            </SwapInterface>
        </Content>
    )
}




// Exports

export default Swap