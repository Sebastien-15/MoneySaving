import { Outlet, useNavigate } from 'react-router-dom';
import { TopBar } from '../Components/TopBar';
import { SideBar } from '../Components/SideBar';
import { useState } from 'react';
import { HStack } from '@chakra-ui/react';

export function MainPage({ token }){

    const [page, setPage] = useState()

    if (token){
    return (
        <>
            <TopBar token ={token}/>
            <HStack>
                <SideBar />
                <Outlet />
            </HStack>
        </>
    )
    }
}