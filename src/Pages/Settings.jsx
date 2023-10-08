import { VStack } from "@chakra-ui/react";
import { useState } from "react";

export function Settings(){
    const [Profile, setProfile] = useState(false)
    const [Pass, setPass] = useState(false)
    const [Data, setData] = useState(false)
    const [Mode, setMode] = useState(false)

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


    return (
        <VStack>
            <h1 className="setting_h1">Settings</h1>
            <ul className="setting_options">
                <li className="setting_options_li" onClick={e => changestate(1)}>Profile<i className="material-symbols-outlined">person</i></li>
                {Profile && (
                    <ul className="setting_options_extra">
                        <li>Change Name</li>
                        <li>Change Profile Picture</li>
                        <li>Change Email</li>
                    </ul>
                )}
                <li className="setting_options_li" onClick={e => changestate(2)}>Manage Password<i className="material-symbols-outlined">key</i></li>
                {Pass && (
                    <ul className="setting_options_extra">
                        <li>Change Password</li>
                    </ul>
                )}
                <li className="setting_options_li" onClick={e => changestate(3)}>Manage data<i className="material-symbols-outlined">analytics</i></li>
                {Data && (
                    <ul className="setting_options_extra">
                        <li>Delete All Data</li>
                    </ul>
                )}
                <li className="setting_options_li" onClick={e => changestate(4)}>Change Light Mode<i className="material-symbols-outlined">light_mode</i></li>
                {Mode && (
                    <ul className="setting_options_extra">
                        <li>Change Mode</li>
                    </ul>
                )}
            </ul>
        </VStack>
    )
}