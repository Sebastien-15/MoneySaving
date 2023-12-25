import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { Supabase } from "../supabase";

export function SideBar({ theme }){
    const [classes, setClasses] = useState('SideBar')
    const [buttoncolor, setButtonColor] = useState("buttonchecked")
    const [value, setValue] = useState('btn1')
    let navigate = useNavigate()

    async function HandleLogout(){
        sessionStorage.clear()
        const { error } = await Supabase.auth.signOut()
        navigate('/')
    }

    const [buttonchecked1, setButtonChecked1] = useState("buttonchecked")
    const [buttonchecked2, setButtonChecked2] = useState()
    const [buttonchecked3, setButtonChecked3] = useState()
    const [buttonchecked4, setButtonChecked4] = useState()

    useEffect(() => {
    function buttonstate(value){
        if (value === 'btn1'){
            setButtonChecked1(buttoncolor)
            setButtonChecked2('normal')
            setButtonChecked3('normal')
            setButtonChecked4('normal')
            navigate('main_page/dashboard')
            }

        if (value === 'btn2'){
        setButtonChecked2(buttoncolor)
        setButtonChecked1('normal')
        setButtonChecked3('normal')
        setButtonChecked4('normal')
        navigate('main_page/history')
            }

        if (value === 'btn3'){
            setButtonChecked3(buttoncolor)
            setButtonChecked1('normal')
            setButtonChecked2('normal')
            setButtonChecked4('normal')
            navigate('main_page/settings')
            }
        
        if (value === 'btn4'){
            setButtonChecked4(buttoncolor)
            setButtonChecked1('normal')
            setButtonChecked3('normal')
            setButtonChecked2('normal')
            HandleLogout()
            }
    }
    buttonstate(value)
    }
    , [value, buttoncolor])

    useEffect(() => {
        if (theme === 'white'){
            setClasses('SideBar')
            setButtonColor('buttonchecked')
        }
        else {
            setClasses('SideBar_dark')
            setButtonColor('buttonchecked_dark')
        }
    }, [theme])
    



    return (
        <div className={classes}>
            <ul>
                <li className={buttonchecked1} onClick={e => setValue('btn1')}>
                    <i className="material-symbols-outlined" id="icons" >dashboard</i> <a>DashBoard</a>
                </li>
                <li className={buttonchecked2} onClick={e => setValue('btn2')}>
                    <i className="material-symbols-outlined" id="icons">bar_chart_4_bars</i><a>History</a>
                </li>
                <div className="settingsnlogout">
                    <li className={buttonchecked3} onClick={e => setValue('btn3')}>
                        <i className="material-symbols-outlined" id="icons">settings</i><a> Settings</a>
                    </li>
                    <li className={buttonchecked4} onClick={e => setValue('btn4')}>
                        <i className="material-symbols-outlined" id="icons">logout</i><a> Sign Out</a>
                    </li>
                </div>
            </ul>
        </div>
    )
}