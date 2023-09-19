import { GetUserInfo } from "../Utitlities/Get_User_Info";



export function TopBar(){
    var token = ""
    if (sessionStorage.getItem('token')){
         token = JSON.parse(sessionStorage.getItem('token')).user.id
      }
      var user_info = GetUserInfo(token)
    
      if (user_info){
        var name = user_info[0].first_name
      }
    return (
        <section className="TopBar">
            <h1>Welcome, {name}</h1>
            <a className="material-symbols-outlined" id="icons">notifications</a>
            <div><img src="https://www.hepper.com/wp-content/uploads/2022/04/caracal-close-up_onkelglocke_Pixabay.jpeg"></img></div>
        </section>
    )
}