import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Navbar from "../components/common/Navbar";
import styled from 'styled-components';

const Wrapper = styled.nav`
width: 100%;
display: flex;
flex: 1 1 auto;
align-items: stretch;
`

const Container = styled.nav`
width: 100%;
display: flex;
flex: 1 1 auto;
align-items: stretch;
`

const NavWrapper = styled.nav`
background-color: #fff !important;
color: #697a8d;
box-shadow: 0 0.125rem 0.375rem 0 rgba(161, 172, 184, 0.12);
top: 0;
bottom: 0;
left: 0;
margin-right: 0 !important;
margin-left: 0 !important;
width: 16.25rem;
display: flex;
width: 16.25rem;


`

const HeaderWrapper = styled.nav`
display: flex;
flex-direction column;
`

function Layout(){
    return(
        <>
            <Wrapper>
                <Container>
                    <NavWrapper>
            <Navbar />
            </NavWrapper>
            <HeaderWrapper>
            <Header />
            <main>
                <Outlet/>
                <div>skdfjjslkdfjkl</div>
            </main>
            </HeaderWrapper>
                </Container>
            </Wrapper>
        </>
    )
}

export default Layout;