import { VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ChangePassword, ChangeProfileInfo } from "../Components/SettingUtilities";

export function Settings( { theme }){
    const [Profile, setProfile] = useState(false)
    const [Pass, setPass] = useState(false)
    const [Data, setData] = useState(false)
    const [Mode, setMode] = useState(false)
    const [textcolor, setTextColor] = useState('black')
    const [classes, setClasses] = useState("setting_options_li")
    
    useEffect(() => {
        if (theme === 'white'){
            setTextColor('black')
        }
        else{
            setTextColor('white')
        }
    }, 
    [theme])

    function changestate(btn){
        if (btn == 1){
            if (Profile){
                setProfile(false)
            }
            else{
                setProfile(true)
                setMode(false)
                setPass(false)
                setData(false)
            }
        }
        if (btn == 2){
            if (Pass){
                setPass(false)
            }
            else{
                setProfile(false)
                setMode(false)
                setPass(true)
                setData(false)
            }
        }
        if (btn == 3){
            if (Data){
                setData(false)
            }
            else{
                setProfile(false)
                setMode(false)
                setPass(false)
                setData(true)
            }
        }
        if (btn == 4){
            if (Mode){
                setMode(false)
            }
            else{
                setProfile(false)
                setMode(true)
                setPass(false)
                setData(false)
            }
        }
    }

    useEffect(() => {
        if (theme === 'white'){
            setClasses("setting_options_li")
        }
        else{
            setClasses("setting_options_dark_li")
        }
    } ,[theme])


    return (
        <VStack color={textcolor}>
            <h1 className="setting_h1">Settings</h1>
            <ul className="setting_options">
                <li className={classes} onClick={e => changestate(1)}>Profile<i className="material-symbols-outlined">person</i></li>
                {Profile && (
                    <ChangeProfileInfo setProfile = {setProfile} theme = {theme} textcolor = {textcolor}/>
                )}
                <li className={classes} onClick={e => changestate(2)}>Manage Password<i className="material-symbols-outlined">key</i></li>
                {Pass && (
                    <ChangePassword setPass = {setPass} theme={theme}/>
                )}
                <li className={classes} onClick={e => changestate(3)}>Manage data<i className="material-symbols-outlined">analytics</i></li>
                {Data && (
                    <ul className="setting_options_extra">
                        <li>Delete All Data</li>
                    </ul>
                )}
            </ul>
        </VStack>
    )
}