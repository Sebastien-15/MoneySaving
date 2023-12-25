import { Outlet, useNavigate } from 'react-router-dom';
import { TopBar } from '../Components/TopBar';
import { SideBar } from '../Components/SideBar';
import { useState } from 'react';
import { HStack } from '@chakra-ui/react';

export function MainPage({ token, theme, setTheme }){

    

    if (token){
    return (
        <>
            <TopBar token ={token} theme={theme} setTheme = {setTheme}/>
            <HStack bgColor={theme}>
                <SideBar theme={theme}/>
                <Outlet />
            </HStack>
        </>
    )
    }
}