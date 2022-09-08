import { useState } from "react";
import styled from "styled-components";

const SwapSettings = () => {
    // Component

    return (<></>)
}

const SwapSection = () => {
    // Component

    return (<></>)
}

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

const Swap = () => {

    const [ section, setSection ] = useState("swap")

    return (
        <Content>
            <SectionNav>
                <NavButton
                    style={{ color: `var(--${section === "swap" ? "text-black" : "text-light"})` }}
                    onClick={() => setSection("swap")}
                >Swap</NavButton>
                <NavButton
                style={{ color: `var(--${section === "settings" ? "text-black" : "text-light"})` }}
                onClick={() => setSection("settings")}
                >Settings</NavButton>
            </SectionNav>
            {section === "swap" ? <SwapSection></SwapSection> : section === "settings" ? <SwapSettings></SwapSettings> : <></>}
        </Content>
    )
}


// Exports

export default Swap