import { useContext, useEffect, useState } from "react"
import EthereumContext from "../state/EthereumContext";
import { parse, format } from "../helpers/number"
// import PriceContext from "../state/PriceContext";
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
    height: calc(100% - 1.2rem - 16px - 1rem - 14px - 16px - 1px);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow: auto;
`

const Token = styled.button`
    width: calc(100% - 8px);
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid var(--background);
    border-radius: 8px;
    padding: 12px;
    margin-right: 8px;
    &:hover {
        border: 1px solid var(--light-dark);
    }
`

const Icon = styled.img`
    width: 2.5rem;
    height: 2.5rem;
    object-fit: contain;
    margin-right: 1rem;
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`

const Name = styled.div`
    text-align: left;
    margin-bottom: 3px;
`

const Balance = styled.div`
    color: var(--gray);
`



const SwapInput = ({ backgroundColor }) => {
    // Component

    return (
        <Input></Input>
    )
}

const TokenSelect = ({ label, type, chain }) => {
    // Token selection menu data
    const token = chain.swap[type === "input" ? "tokenIn" : "tokenOut"]
    const setToken = chain.swap[type === "input" ? "setTokenIn" : "setTokenOut"]
    const opposite = chain.swap[type === "input" ? "tokenOut" : "tokenIn"]
    const [ menuActive, setMenuActive ] = useState(false)
    const [ tokenList, setTokenList ] = useState(chain.tokens)

    // Update token search

    function updateTokenList(event) {
        const query = event.target.value
        console.log(query)
    }

    // Switch to selected token

    function switchToken(token) {
        setToken(token)
        setMenuActive(false)
    }

    // Update token list on data changes

    useEffect(() => {
        if (opposite) {
            const index = chain.tokens.findIndex(token => opposite.address === token.address)
            if (index !== -1) {
                setTokenList(chain.tokens.slice(0, index).concat(chain.tokens.slice(index + 1)))
                return
            }
        }
        setTokenList(chain.tokens)
    }, [chain, opposite])

    useEffect(() => {
        console.log("updated token balances:")
        console.log(Object.keys(chain.tokenBalances))
    }, [chain.tokenBalances])


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
                        <Search onChange={updateTokenList}></Search>
                    </TokenSearch>
                    <Tokens>
                        {tokenList.map(token => (
                            <Token key={`${chain.id}-${type}-${token.address}`} onClick={() => switchToken(token)}>
                                <Icon src={`/tokens/${token.default ? token.symbol : "unknown"}.svg`} />
                                <Info>
                                    <Name>{token.name} - {token.symbol}</Name>
                                    <Balance>{parse(chain.tokenBalances[token.address])}</Balance>
                                </Info>
                            </Token>
                        ))}
                    </Tokens>
                </Menu>
             ) : <></>}
    </>
    )
}



const SwapInterface = () => {

    const { chain } = useContext(EthereumContext)
    // const prices = useContext(PriceContext)

    // Calculate swap info

    function getSwapInfo() {
        return `1 ... = ...`
    }

    return (
        <StyledInterface>
            <Label style={{ marginBottom: "12px" }}>Input Token</Label>
                <TokenSection>
                    <SwapInput></SwapInput>
                    <TokenSelect label="Input Token" type="input" chain={chain}></TokenSelect>
                </TokenSection>
                <Middle>
                    <Switch>
                        <StyledImage src="/icons/switch.svg" />
                    </Switch>
                    <Label style={{ top: "12px" }}>Output Token</Label>
                </Middle>
            <TokenSection>
                <Output></Output>
                <TokenSelect label="Output Token" type="output" chain={chain}></TokenSelect>
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