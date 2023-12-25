import { Box, Center, HStack, VStack, useToast, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Supabase } from "../supabase";

export function ChangeProfileInfo({ setProfile, theme, textcolor }) {
    var toast = useToast()
    const [ProfilePic, setProfilePic] = useState()
    const [First_name, setFirst_name] = useState()
    const [Last_name, setLast_name] = useState()
    const [classes, setClasses] = useState("setting_pics")

    var token = ""
    if (sessionStorage.getItem('token')){
         token = JSON.parse(sessionStorage.getItem('token')).user.id
      }

    async function submit(){
        const { error } = await Supabase
        .from('User_Info')
        .update({profile_pic: ProfilePic, last_name: Last_name, first_name: First_name})
        .eq('user_id', token)

        if (error){
            toast({
                title: 'Error',
                position: "top-center",
                duration: 1500,
                render: () => (
                    <HStack color="black" p={3} bg="White" borderRadius="10px">
                        <Box color="red">
                      <span class="material-symbols-outlined">cancel</span></Box><div>Error in updating profile</div>
                    </HStack>
                )
            })
        }
        else {
            toast({
                title: 'Success',
                position: "top-center",
                duration: 1500,
                render: () => (
                    <HStack color="black" p={3} bg="White" borderRadius="10px">
                        <Box color="green">
                      <span class="material-symbols-outlined">check_circle
                      </span></Box><div>Profile Updated!</div>
                    </HStack>
                )
            })}
        setProfile(false)
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
            console.log(data)
            setFirst_name(data[0].first_name)
            setLast_name(data[0].last_name)
            if (data[0].profile_pic){
                setProfilePic(data[0].profile_pic)
            }
            else{
                setProfilePic("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png")
            }
        }
      }

      if (!ProfilePic){
          get_user_info()
      }
      useEffect(() => {
            if (theme === 'white'){
                setClasses("setting_pics")
            }
            else {
                setClasses("setting_pics_dark")
            }
      }, [theme])


    return (
        <section className="standout">
            <Center h="100%" w="100%" className={classes} color={textcolor}>
                <VStack bgColor={theme} pos="fixed" w="15vw" h="50vh" borderRadius="5px" justifyContent="center" paddingLeft=".5vw" paddingRight=".5vw" >
                        {ProfilePic && ( 
                            <img src={ProfilePic} alt="Profile Picture" className="setting_pic" ></img>
                        )}
                        <input placeholder="Paste profile picture link" onChange={e => setProfilePic(e.target.value)}></input>
                        <h2>Change First and Last Name</h2>
                        <input placeholder="First Name" onChange={e => setFirst_name(e.target.value)} value={First_name}></input>
                        <input placeholder="Last Name" onChange={e => setLast_name(e.target.value)} value={Last_name}></input>
                        <HStack>
                            <button onClick={e => submit()}>Save</button>
                            <button onClick={e => setProfile(false)}>Cancel</button>
                        </HStack>
                </VStack>
           </Center>
        </section>
    )
}

export function ChangePassword( { setPass, theme } ) {
    const [Password, setPassword] = useState()
    const [ConfirmPassword, setConfirmPassword] = useState()
    const [PasswordVisible, setPasswordVisible] = useState('password')
    const [PasswordVisible2, setPasswordVisible2] = useState('visibility')
    const [ConfirmPasswordVisible, setConfirmPasswordVisible] = useState('password')
    const [ConfirmPasswordVisible2, setConfirmPasswordVisible2] = useState('visibility')
    const [PasswordError, setPasswordError] = useState('grey')
    const [classes, setClasses] = useState("setting_pass")
    const [boxcolor, setBoxColor] = useState('white')
    const toast = useToast()

    if (!Password){
        if (PasswordError !== 'grey'){
            setPasswordError('grey')
        }
    }
    else {
        if (Password !== ConfirmPassword){
            if (PasswordError !== 'red'){
                setPasswordError('red')
            }   
        }
        else {
            if (PasswordError !== 'green'){
                setPasswordError('green')
            }
        }
    }
    
    function password_visible(){
        if (PasswordVisible == 'text'){
            setPasswordVisible('password')
            setPasswordVisible2('visibility')
        }
        else {
            setPasswordVisible('text')
            setPasswordVisible2('visibility_off')
        }
}
function confirm_password_visible(){
    if (ConfirmPasswordVisible == 'text'){
        setConfirmPasswordVisible('password')
        setConfirmPasswordVisible2('visibility')
    }
    else {
        setConfirmPasswordVisible('text')
        setConfirmPasswordVisible2('visibility_off')
    }
}

    useEffect(() => {
        if (theme === 'white'){
            setClasses("setting_pass")
            setBoxColor('white')
        }
        else {
            setClasses("setting_pass_dark")
            setBoxColor('#2c3134')
        }
    }, [theme])

    async function submit(){
        if (Password !== ConfirmPassword){
            toast({
                title: 'Error',
                position: "top-center",
                duration: 1500,
                render: () => (
                    <HStack color="black" p={3} bg="White" borderRadius="10px">
                        <Box color="red">
                      <span className="material-symbols-outlined">cancel</span></Box><div>Error: Passwords do not match</div>
                    </HStack>
                )
            })
        }
        else {
            await Supabase.auth.updateUser({ password: Password })
            toast({
                title: 'Success',
                position: "top-center",
                duration: 1500,
                render: () => (
                    <HStack color="black" p={3} bg="White" borderRadius="10px">
                        <Box color="green">
                      <span className="material-symbols-outlined">check_circle
                      </span></Box><div>Password Updated!</div>
                    </HStack>
                )
            })
            setPass(false)
        }
        

    }

    return (
        <section className="standout">
            <Center h="100%" w="100%" className={classes}>
                <VStack bgColor={boxcolor} padding=".5vw" borderRadius="4.5px">
                    <h1>Type New Password</h1>
                    <HStack>
                        <input placeholder="New Password" type={PasswordVisible} onChange={e => setPassword(e.target.value)}></input>
                        <button className="material-symbols-outlined" onClick={e => password_visible()}>{PasswordVisible2}</button>
                    </HStack>
                    <HStack>
                        <input placeholder="Confirm Password" type={ConfirmPasswordVisible} onChange={e => setConfirmPassword(e.target.value)}></input>
                        <button className="material-symbols-outlined" onClick={e => confirm_password_visible()}>{ConfirmPasswordVisible2}</button>
                    </HStack>
                    <HStack className="pass_btn">
                        <Button w="5vw" h="5vh" color="white" bgColor={PasswordError} onClick={e => submit()}
                        _hover={{
                            bg:{PasswordError},
                            color: "white",
                            opacity: "0.8"
                        
                        }}
                        >Confirm</Button>
                        <Button _hover={{
                            bg: "#97c0df",
                            color: "white"
                        
                        }}
                        bgColor="#8BB2CF"
                        w="5vw" h="5vh"
                        onClick={e => setPass(false)}
                        >Cancel</Button>
                    </HStack>
                </VStack>
            </Center>
        </section>
    )
}

export function ChangeData() {
    return (
        <section className="standout">
            <HStack>

            </HStack>
        </section>
    )
}

export function ChangeMode() {
    return (
        <section className="standout">
            <HStack>

            </HStack>
        </section>
    )
}