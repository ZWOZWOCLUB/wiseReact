import { Outlet, useNavigate  } from "react-router-dom";
import Header from "../components/common/Header";
import Navbar from "../components/common/Navbar";
import styled from 'styled-components';
import coreCSS from '../@core/vendor/css/core.module.css';
import themDefaultCSS from '../@core/vendor/css/themeDefault.module.css';
import { decodeJwt } from "../utils/tokenUtils";
import { redirect } from "react-router-dom";
import { useEffect } from "react";

const Wrapper = styled.nav`

`

const Container = styled.nav`

`

const HeaderWrapper = styled.nav`

`

const ContentWrapper = styled.nav`
`
function Layout(){
    const navigate = useNavigate();
    const token =  decodeJwt(window.localStorage.getItem('accessToken'));
    useEffect(()=>{
     
        console.log('-----------token', token);

        if(!token) {
            alert('로그인이 필요합니다.');
            
            navigate('/login', {replace: true});
        }
    });

    return(
        <>
                    
            <Wrapper className={`${coreCSS[`layout-wrapper`]} ${coreCSS[`layout-content-navbar`]}`}>
                <Container className={`${coreCSS[`layout-container`]}`}>
                    <Navbar />
                    <HeaderWrapper className={`${coreCSS[`layout-page`]}`}>
                        <Header />
                            <ContentWrapper className={`${coreCSS[`content-wrapper`]}`}>
                            <main className={`${coreCSS[`container-xxl`]} ${coreCSS[`flex-grow-1`]} ${coreCSS[`container-p-y`]}`}>
                            <Outlet/>
                            </main>
                            </ContentWrapper>
                        </HeaderWrapper>
                </Container>
          </Wrapper>
        </>
    )
}

export default Layout;