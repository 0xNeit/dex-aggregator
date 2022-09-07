// Navigaton bar component
import styled from "styled-components";

const Nav = styled.div`
    width: 100%;
    height: 80px;
    padding: 0 max(calc(50vw - 550px), 20px);
    `;

const NavBar = () => (
    <Nav></Nav>
)

// Layout component

const Layout = () => (
    <NavBar></NavBar>
)

// Exports
export default Layout

