import { useState } from "react";
import { GetUserInfo } from "../Utitlities/Get_User_Info";
import { useNavigate } from "react-router-dom";
import { GetUserSubs } from "../Utitlities/Get_User_Subs";

export function LoadingPage() {
    let navigate = useNavigate()


    var token = ""
    if (token == ""){
        if (sessionStorage.getItem('token')){
            token = JSON.parse(sessionStorage.getItem('token')).user.id
        }
    }

    if (token){
        var user_info = GetUserInfo(token)
        var user_subs = GetUserSubs(token)
        if (user_info){
            sessionStorage.setItem('user_info', JSON.stringify(user_info))
        }
        if (user_subs){
            sessionStorage.setItem('user_subs', JSON.stringify(user_subs))
        }
        else{
            sessionStorage.setItem('user_subs', JSON.stringify([]))
        }   
    }

    if (sessionStorage.getItem('user_subs')){
        if (sessionStorage.getItem('user_info')){
            navigate('/main_page')
            navigate('main_page/dashboard')
        }
    }






    
    

    

    return (
        <>
        <div className="loading">

        </div>
        </>
    )
}