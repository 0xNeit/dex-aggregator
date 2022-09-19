import { useContext, useEffect, useState } from "react"
import EthereumContext from "../state/EthereumContext";
import { parse, format } from "../helpers/number"
import quoteSwap from "../helpers/quote";
// import PriceContext from "../state/PriceContext";
import styled from "styled-components";


const Content = styled.div`
    width: 100%;
    height: calc(100vh - 120px);
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
    width: 332px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    border-right: 0.5px solid var(--gray);
    padding: 32px 32px 32px 0;
    margin-right: 32px;
    `
    
const StyledImage = styled.img`
    width: 20px;
    height: 20px;
    object-fit: contain;
    `

const Settings = styled.div`
    width: calc(100% - 348px);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-top: 32px;   
    `

const Top = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 16px;
    `
    
const Section = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 2rem;
    `

const SlippageSection = styled.div`
    width: 40%;
    margin-right: 32px;
    `

const GasSection = styled.div`
    width: calc(60% - 32px);
    `

const SectionTitle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-size: 1.2rem;
    margin-bottom: 1.2rem;
    `

const SlippageContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    `
    
const TitleValue = styled.div`
        white-space: pre-wrap;
        font-size: 1.2rem;
        color: var(--dark-gray);
    `

const SlippageSlider = styled.input`
    width: 100%;
    height: 1px;
    appearance: none;
    background-color: var(--light-gray);
    outline: none;
    margin-right: 1.5rem;
    &::-webkit-slider-thumb {
        appearance: none;
        width: 10px;
        height: 25px;
        cursor: pointer;
        background-color: var(--light-dark);
        border: 1px solid var(--background);
    }
    `

const SlippageInput = styled.input`
    width: 60px;
    outline: none;
    border: 1px solid var(--light-gray);
    border-radius: 8px;
    padding: 6px 8px;
    &:focus {
        border: 1px solid var(--gray);
    }
    `

const GasControls = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`

const TokenSection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    `
    
const GasSwitch = styled.div`
    width: 1rem;
    height: 1rem;
    background-color: var(--light-gray);
    border-radius: 4px;
    margin-right: 0.5rem;
    &:checked {
        background-color: var(--light-dark);
    }
    `

/* const GassSwitch[data-checked="true"] = styled.div
        background-color: var(--light-dark);
    } */

const GasLabel = styled.div`
    margin-right: 1.5rem;
    `

const GasInput = styled.input`
    width: 60px;
    outline: none;
    border: 1px solid var(--light-gray);
    border-radius: 8px;
    padding: 6px 8px;
    &:focus {
        border: 1px solid var(--gray);
    }
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
    min-height: calc(1.44rem + 18px);
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
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    font-size: 1.2rem;
    overflow: hidden;
    margin-left: auto;
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
    top: 32px;
    left: 0;
    width: calc(100% - 32px);
    height: calc(100% - 64px);
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

const Routers = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 16px;
`

const Router = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`

const RouterSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`

const RouterTitle = styled.div`
    font-size: 1.2rem;
    margin-bottom: 0.6rem;
`

const RouterIcon = styled.img`
    width: 1.2rem;
    height: 1.2rem;
    object-fit: contain;
    margin-right: 0.75rem;
`

const RouterStatus = styled.div`
    min-width: 70px;
    color: var(--dark-gray);
    margin-right: 1rem;
`

const SwitchLabel = styled.label`
    position: relative;
    display: inline-block;
    width: 3rem;
    height: 1.2rem;
`

const SwitchInput = styled.input`
    opacity: 0;
    width: 0;
    height: 0;
`

const Slider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--light-gray);
    &:before {
        position: absolute;
        width: calc(1.2rem - 8px);
        height: calc(1.2rem - 8px);
        left: 5px;
        bottom: 4px;
        content: "";
        outline: none;
        background-color: white;
    }
    &:checked {
        background-color: var(--light-dark);
        &:before {
            transform: translateX(calc(1.8rem - 2px));
        }
    }
`

const ReferralTitle = styled.div`
    margin-bottom: 0.2rem;
`

const ReferralValue = styled.div`
    font-size: 1rem;
`

const ReferralLabel = styled.div`
    font-size: 0.8rem;
    color: var(--dark-gray);
    margin-bottom: 1.2rem;
`
const Referral = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`

const ReferralInput = styled.input`
    width: 60%;
    outline: none;
    border: 1px solid var(--light-gray);
    border-radius: 8px;
    padding: 6px 8px;
    margin-right: 1rem;
    &:focus {
        border: 1px solid var(--gray);
    }
`

const SetReferral = styled.button`
    border: 1px solid var(--light-dark);
    border-radius: 8px;
    padding: 6px 16px;
    &:hover {
        background-color: var(--light);
    }
`

const SwapInput = ({ onChange }) => {
    // Handle swap input change

    function handleChange(event) {
        console.log("changed")
    }

    // Component

    return (
        <Input onChange={handleChange}></Input>
    )
}

const TokenSelect = ({ label, type }) => {
    // Token selection menu data
    const { chain, account } = useContext(EthereumContext)
    const token = chain.swap[type === "input" ? "tokenIn" : "tokenOut"]
    const setToken = chain.swap[type === "input" ? "setTokenIn" : "setTokenOut"]
    const opposite = chain.swap[type === "input" ? "tokenOut" : "tokenIn"]
    const [ menuActive, setMenuActive ] = useState(false)
    const [ tokenList, setTokenList ] = useState(chain.tokens)

    // Update token search with query

    function updateTokenList(event) {
        const query = event.target.value.toLowerCase()
        if (!query) return setTokenList(chain.tokens)
        const tokens = chain.tokens.filter(token => token.name.toLowerCase().includes(query) || token.symbol.toLowerCase().includes(query))
        tokens.sort((a, b) => {
            const nameA = a.name.toLowerCase()
            const symbolA = a.symbol.toLowerCase()
            const nameB = b.name.toLowerCase()
            const symbolB = b.symbol.toLowerCase()
            if ((symbolA.includes(query) && !symbolB.includes(query)) || (nameA.includes(query) && !nameB.includes(query))) return -1
            if ((symbolB.includes(query) && !symbolA.includes(query)) || (nameB.includes(query) && !nameA.includes(query))) return 1
            if (symbolA.includes(query) && symbolB.includes(query)) {
                return symbolA.indexOf(query) < symbolB.indexOf(query) ? -1 : 1
            } else {
                return nameA.indexOf(query) < nameB.indexOf(query) ? -1 : 1
            }
        })
        setTokenList(tokens)
    }

    // Switch to selected token

    function switchToken(token) {
        setToken(token)
        setMenuActive(false)
    }

    // Hide menu on chain or account changes

    useEffect(() => {
        setMenuActive(false)
    }, [chain, account])


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
                                    <Balance>{chain.tokenBalances[token.address] ? format(parse(chain.tokenBalances[token.address], token.decimals)) : "0"}</Balance>
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

    const [ updateTimeout, setUpdateTimeout ] = useState()

    // Update swap quote

    function updateSwapQuote() {
        clearTimeout(updateTimeout)
        setUpdateTimeout(setTimeout(quoteSwap, 500))
    }

    // Switch input and output tokens

    function switchTokens() {
        const newInput = chain.swap.tokenOut
        chain.swap.setTokenOut(chain.swap.tokenIn)
        chain.swap.setTokenIn(newInput)
    }

    // Calculate swap info

    function getSwapInfo() {
        return `1 ... = ...`
    }

    return (
        <StyledInterface>
            <Label style={{ marginBottom: "12px" }}>Input Token</Label>
                <TokenSection>
                    <SwapInput onChange={updateSwapQuote}></SwapInput>
                    <TokenSelect label="Input Token" type="input"></TokenSelect>
                </TokenSection>
                <Middle>
                    <Switch onClick={switchTokens}>
                        <StyledImage src="/icons/switch.svg" />
                    </Switch>
                    <Label style={{ top: "12px" }}>Output Token</Label>
                </Middle>
            <TokenSection>
                <Output></Output>
                <TokenSelect label="Output Token" type="output"></TokenSelect>
            </TokenSection>
            <SwapButton>Swap Tokens</SwapButton>
            <SwapInfo>{getSwapInfo()}</SwapInfo>
            <SwapInfo style={{ marginBottom: "0" }}>{getSwapInfo()}</SwapInfo>
        </StyledInterface>
    )
}

const SwapSettings = () => {

    // Swap settings data

    const { web3, chain } = useContext(EthereumContext)
    const settings = chain.swapSettings

    // Update slippage with slider value

    function updateSlippage(event) {
        settings.setSlippage(+event.target.value / 100)
    }

    // Set slippage with text input value

    function setSlippage(event) {
        if (isNaN(+event.target.value) || +event.target.value <= 0 || event.target.value >= 50) return
        if (event.target.value.endsWith(".")) return
        settings.setSlippage(+event.target.value)
    }

    // Set gas value for chain

    function updateGas(value) {
        if (settings.gas[chain.id] === value) return
        const gas = { ...settings.gas }
        gas[chain.id] = value
        settings.setGas(gas)
    }

    // Set gas with text input value

    function setGas(event) {
        if (isNaN(+event.target.value) || +event.target.value <= 0) return
        if (event.target.value.endsWith(".")) return
        const gas = { ...settings.gas }
        gas[chain.id] = +event.target.value
        settings.setGas(gas)
        document.getElementById("gas-input").value = ""
    }


    // Toggle router enabled

    function toggleRouter(router) {
        const routers = { ...settings.routers }
        routers[router].enabled = !routers[router].enabled
        settings.setRouters(routers)
    }

    // Set referral address

    function setReferral() {
        const address = document.getElementById("referral-input").value
        if (web3.utils.isAddress(address)) {
            settings.setReferral(web3.utils.toChecksumAddress(address))
        }
    }


    return (
        <Settings>
        <Top>
            <SlippageSection>
                <SectionTitle>
                    Slippage <TitleValue>{settings.slippage}%</TitleValue>
                </SectionTitle>
                <SlippageContent>
                    <SlippageSlider id="slippage-slider" type="range" min="10" max="200" value={settings.slippage * 100} onChange={updateSlippage}></SlippageSlider>
                    <SlippageInput maxLength="5" onChange={setSlippage}></SlippageInput>
                </SlippageContent>
            </SlippageSection>
            <GasSection>
                <SectionTitle>
                    Gas Price
                    <TitleValue> - {typeof settings.gas[chain.id] === "number" ? `custom ${settings.gas[chain.id]}` : chain.gasPrice[settings.gas[chain.id]]} gwei</TitleValue>
                </SectionTitle>
                <GasControls>
                    <GasSwitch data-checked={settings.gas[chain.id] === "slow"} onClick={() => updateGas("slow")}></GasSwitch>
                    <GasLabel>Slow</GasLabel>
                    <GasSwitch data-checked={settings.gas[chain.id] === "normal"} onClick={() => updateGas("normal")}></GasSwitch>
                    <GasLabel>Normal</GasLabel>
                    <GasSwitch data-checked={settings.gas[chain.id] === "fast"} onClick={() => updateGas("fast")}></GasSwitch>
                    <GasLabel>Fast</GasLabel>
                    <GasInput id="gas-input" onChange={setGas}></GasInput>
                </GasControls>
            </GasSection>
        </Top>
        <Section>
            <SectionTitle>Aggregators</SectionTitle>
            <Routers>
                {Object.keys(settings.routers).map(router => (
                    <Router key={router}>
                        <RouterSection>
                            <RouterTitle>
                                <RouterIcon src={`/routers/${router}.svg`} />
                                    {settings.routers[router].name}
                            </RouterTitle>
                        </RouterSection>
                        <RouterSection>
                            <RouterStatus>{settings.routers[router].enabled ? "Enabled" : "Disabled"}</RouterStatus>
                                <SwitchLabel>
                                    <SwitchInput type="checkbox" checked={settings.routers[router].enabled} onChange={() => toggleRouter(router)}></SwitchInput>
                                    <Slider></Slider>
                                </SwitchLabel>
                        </RouterSection>
                    </Router>
                        ))}
            </Routers>
        </Section>
        <Section>
            <SectionTitle>
                <ReferralTitle>Referral Address</ReferralTitle>
                <TitleValue>
                    <ReferralValue> - {settings.referral || "None"}</ReferralValue>
                </TitleValue>
            </SectionTitle>
                <ReferralLabel>Referral address will not work if it is the same as the account swapping tokens</ReferralLabel>
                <Referral>
                    <ReferralInput id="referral-input"></ReferralInput>
                    <SetReferral onClick={setReferral}>Set</SetReferral>
                </Referral>
        </Section>
    </Settings>
    )
}

// Router outputs component

const RouterOutputs = () => {
    // Router output data

    const swap = useContext(EthereumContext).chain.swap

    const StyledOutput = styled.div`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        border-top: 0.5px solid var(--gray);
        padding: 32px 0;
        `

    const Title = styled.div`
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
        `

    const StyledRouter = styled.div`
        width: 100%:
        display: grid;
        grid-template-columns: 2fr 5fr 3fr;
        grid-gap: 16px;
        margin: 1.5rem 0;
        `

    const RouterInfo = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        font-size: 1.2rem;
        `

    const RouterImage = styled.img`
        width: 1.2rem;
        height: 1.2rem;
        object-fit: contain;
        margin-right: 1rem;
        `

    // Component

    return (
        <>
            <StyledOutput>
                <Title>Aggregation Routers</Title>
                {swap.routers.map(router => (
                    <StyledRouter>
                        <RouterInfo>
                            <RouterImage src={`/routers/${router.id}.svg`} />
                            {router.name}
                        </RouterInfo>
                    </StyledRouter>
                ))}
            </StyledOutput>
        </>
    )
}

const Swap = () => {

    return (
        <Content>
            <Top>
                <SwapInterface></SwapInterface>
                <SwapSettings></SwapSettings>
            </Top>
            <RouterOutputs></RouterOutputs>
        </Content>
    )
}




// Exports

export default Swap