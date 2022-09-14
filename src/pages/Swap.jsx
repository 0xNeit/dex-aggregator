import { useContext, useState } from "react"
import EthereumContext from "../state/EthereumContext";
import PriceContext from "../state/PriceContext";
// import usePrice from "../hooks/usePrice";
import styled from "styled-components";


const Content = styled.div`
    width: 100%;
    height: calc(100vh - 80px);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 40px 0;
    `

const Input = styled.input`
    width: 45%;
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
    position: relative;
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

/* const Settings = styled.div`
    width: 100%;
    height: 100%;
    margin: 40px 0;
    `
*/

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
    width: 45%;
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
    margin: 24px 0;
    &:hover {
        border: 1px solid var(--light-dark);
    }
    `

const SwapInfo = styled.div`
    margin-bottom: 6px;
    `

const Select = styled.button`
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    font-size: 1.2rem;
    overflow: hidden;
    padding: 9px 0;
    `
const ArrowIcon = styled.img`
    width: 0.9rem;
    height: 0.9rem;
    object-fit: contain;
    margin-left: 0.5rem;
    `
const Menu = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--background);
    `

const Label = styled.div`
    position: relative;
    color: var(--dark-gray);
    margin-top: auto;
    margin-left: auto;
`

const Middle = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 24px 0;
`

const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 16px;
`

const ExitButton = styled.button`
    margin-left: auto;
`

const ExitIcon = styled.img`
    width: 0.75rem;
    height: 0.75rem;
    object-fit: contain;
`

const TokenSearch = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 16px;
`

const SearchIcon = styled.img`
    width: 0.75rem;
    height: 0.75rem;
    object-fit: contain;
    margin-right: 1rem;
`

const Search = styled.input`
    width: 100%;
    outline: none;
    border: 1px solid var(--light-gray);
    border-radius: 8px;
    padding: 6px 8px;
    &:focus {
        border: 1px solid var(--gray);
    }
`

const Tokens = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`


const SwapInput = ({ backgroundColor }) => {
    // Component

    return (
        <Input></Input>
    )
}

const TokenSelect = ({ label, token, setToken, tokens }) => {

    const [ menuActive, setMenuActive ] = useState(false)
    console.log(tokens)
    // const eth = usePrice("ETH")
    // const btc = usePrice("BTC")
    // const bnb = usePrice("BNB")

    // component
    return (
    <>
        <Select onClick={() => setMenuActive(true)}>
            {token ? token.symbol.length > 9 ? `${token.symbol.slice(0, 8)}...` : token.symbol : "Choose"}
            {/* {eth} {btc} {bnb} */}
            <ArrowIcon src="/icons/arrow-down.svg" />        
        </Select>
        {menuActive ? (
                <Menu>
                    <Header>
                        <div>Select {label}</div>
                        <ExitButton onClick={() => setMenuActive(false)}>
                            <ExitIcon src="/icons/exit.svg" />
                        </ExitButton>
                    </Header>
                    <TokenSearch>
                        <SearchIcon src="/icons/search.svg" />
                        <Search></Search>
                    </TokenSearch>
                    <Tokens>
                        {tokens.map(token => (
                            <button className="token">{token.name}</button>
                        ))}
                    </Tokens>
                </Menu>
             ) : <></>}
    </>
    )
}



const SwapInterface = () => {

    const { chain } = useContext(EthereumContext)
    const prices = useContext(PriceContext)

    // Calculate swap info

    function getSwapInfo() {
        return `1 ... = ...`
    }

    return (
        <StyledInterface>
            <Label style={{ marginBottom: "12px" }}>Input Token</Label>
                <TokenSection>
                    <SwapInput></SwapInput>
                    <TokenSelect label="Input Token" token={chain.swap.tokenIn} setToken={chain.swap.setTokenIn} tokens={chain.tokens}></TokenSelect>
                </TokenSection>
                <Middle>
                    <Switch>
                        <StyledImage src="/icons/switch.svg" />
                    </Switch>
                    <Label style={{ top: "12px" }}>Output Token</Label>
                </Middle>
            <TokenSection>
                <Output></Output>
                <TokenSelect label="Output Token" token={chain.swap.tokenOut} setToken={chain.swap.setTokenOut} tokens={chain.tokens}></TokenSelect>
            </TokenSection>
            <SwapButton>Swap Tokens</SwapButton>
            <SwapInfo>{getSwapInfo()}</SwapInfo>
            <SwapInfo style={{ marginBottom: "0" }}>{getSwapInfo()}</SwapInfo>
        </StyledInterface>
    )
}

/* const SwapSettings = () => {
    return (
        <Settings>This is the settings</Settings>
    )
} */

const Swap = () => {

    return (
        <Content>
            <SwapInterface>
            </SwapInterface>
        </Content>
    )
}




// Exports

export default Swap