import { useState } from "react";
import styled from "styled-components";
import swapicon from "../assets/swap.svg";

const backgroundColor = props => props.backgroundColor || '#efd5f2'

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
// styled-components usage example?




const Input = styled.input`
    width: 100%;
    font-size: 1.2rem;
    outline: none;
    background-color: ${backgroundColor};
    border: 1px solid #b70fd1;
    border-radius: 8px;
    padding: 12px;
    &:focus{
        border: 1px solid var(--light-dark);
    }
    `

const StyledInterface = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 40px 0;
    `

const StyledLeft = styled.div`
    width: 30%;
    height: 100%;
    margin-right: 5%;
    `

const StyledRight = styled.div`
    width: 65%;
    height: 100%;
    `

const StyledSwap = styled.div` 
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: var(--background);
    padding: 24px 8px 8px 8px;
    border: 1px solid var(--light-gray);
    border-radius: 8px;
    `
    
const SwapLabel = styled.div`
    margin-bottom: 24px;
    `

const Section = styled.div`
    position: relative;
    width: 100%;
    padding: 0 20px;
    border
    `

const SectionOutput = styled.div`
    position: relative;
    width: 100%;
    padding: 0 20px;
    background-color: var(--light);
    border-radius: 8px;
    padding: 36px 20px 24px 20px;
    margin-top: 48px;
    `

const SwapIcon = styled.div`
    position: absolute;
    top: -24px;
    left: 20px;
    width: 48px;
    height: 48px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #FFFFFF;
    border: 4px solid var(--light);
    border-radius: 24px;
    `

const StyledImage = styled.img`
    width: 16px;
    height: 16px;
    object-fit: contain;
    margin: 12px 0;
    `

const ExecuteSwap = styled.button`
    width: 100%;
    font-size: 1.2rem;
    background-color: var(--light-dark);
    border: none;
    border-radius: 8px;
    padding: 12px 36px;
    margin-top: 24px;
    `

const Settings = styled.div`
    width: 100%;
    height: 100%;
    margin: 40px 0;
    `

const SwapInput = ({ backgroundColor }) => {
    // Component

    return (
        <Input></Input>
    )
}



const SwapInterface = () => {

    return (
        <StyledInterface>
            <StyledLeft>
                <StyledSwap>
                    <Section>
                        <SwapLabel>Input</SwapLabel>
                        <SwapInput backgroundColor="var(--light)"></SwapInput>
                    </Section>
                    <SectionOutput>
                        <SwapIcon>
                            <StyledImage src={swapicon} />
                        </SwapIcon>
                        <SwapLabel>Output</SwapLabel>
                        <SwapInput backgroundColor="var(--background)"></SwapInput>
                        <ExecuteSwap>Swap Tokens</ExecuteSwap>
                    </SectionOutput>
                </StyledSwap>
            </StyledLeft>
            <StyledRight></StyledRight>
        </StyledInterface>
    )
}

const SwapSettings = () => {
    return (
        <Settings></Settings>
    )
}

const Swap = () => {

    const [ section, setSection ] = useState("swap")

    return (
        <Content>
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
        </Content>
    )
}




// Exports

export default Swap