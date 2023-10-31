import { useState } from "react";
import { GetUserInfo } from "../Utitlities/Get_User_Info";



export function TopBar(){
  const [Userinfo, setUserInfo] = useState()

  if (!Userinfo){
    setUserInfo(JSON.parse(sessionStorage.getItem('user_info')))
  }

  var token = ""
  if (sessionStorage.getItem('token')){
        token = JSON.parse(sessionStorage.getItem('token')).user.id
    }
  
  if (Userinfo){
    console.log(Userinfo)
    var name = Userinfo[0].first_name
    var profile_link
    if (!Userinfo[0].profile_pic){
      profile_link = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    }
    else{
      profile_link = Userinfo[0].profile_pic
    }
  }

    return (
        <section className="TopBar">
            <h1>Welcome, {name}</h1>
            <a className="material-symbols-outlined" id="icons">notifications</a>
            <div><img src={profile_link}></img></div>
        </section>
    )
}