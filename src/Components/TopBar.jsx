import { useState } from "react";
import { Supabase } from "../supabase";



export function TopBar({ theme, setTheme }){
  const [Userinfo, setUserInfo] = useState()
  const [icon, setIcon] = useState('light_mode')

  var token = ""
    if (sessionStorage.getItem('token')){
         token = JSON.parse(sessionStorage.getItem('token')).user.id
      }
  async function get_user_info (){
    const { data, error } = await Supabase
    .from('User_Info')
    .select()
    .eq('user_id', token)

    if (error){
        console.log(error)
    }
    if (data){
        setUserInfo(data[0])
    }
  }
  
  if (!Userinfo){
    get_user_info()
  }
  
  if (Userinfo){
    console.log(Userinfo)
    var name = Userinfo.first_name
    var profile_link
    if (!Userinfo.profile_pic){
      profile_link = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    }
    else{
      profile_link = Userinfo.profile_pic
    }
  }

  function changestate(){
    if (theme === 'white'){
      setTheme('#1c1f21')
      setIcon('dark_mode')
    }
    else {
      setTheme('white')
      setIcon('light_mode')
    }
  }


    return (
        <section className="TopBar">
            <h1>Welcome, {name}</h1>
            <button className="material-symbols-outlined" id="icons" onClick={e => changestate()}>{icon}</button>
            <a className="material-symbols-outlined" id="icons">notifications</a>
            <div><img src={profile_link}></img></div>
        </section>
    )
}