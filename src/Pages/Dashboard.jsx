import { Center, HStack, VStack } from "@chakra-ui/react";
import { AddUserSubs } from "../Components/AddUser";
import { useEffect, useState } from "react";
//import { GetUserSubs } from "../Utitlities/Get_User_Subs";
import { DeleteSubs } from "../Components/DeleteSubs";
import { useNavigate } from "react-router-dom";
import { FormatDate } from "../Utitlities/formatdate";
import { Supabase } from "../supabase";

export function DashBoard({ theme }){
    const [display, setDisplay] = useState(false)
    const [todelete, setToDelete] = useState(false)
    const [iddelete, setIdDelete] = useState()
    const [Usersubs, setUsersubs] = useState()
    const [total, setTotal] = useState()
    const [refresh, setRefresh] = useState(false)
    const [boxcolor, setBoxColor] = useState('#ececec') 
    const [textcolor, setTextColor] = useState('black')
    const [classes, setClasses] = useState("add_button")

    var token 
    if (sessionStorage.getItem('token')){
         token = JSON.parse(sessionStorage.getItem('token')).user.id
    }
    

    useEffect(() => {
    async function state_update(){
        var Subz = Supabase.channel('custom-all-channel')
        .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'User_Subs' },
        (payload) => {
            if (payload.eventType === 'DELETE' || payload.eventType === 'INSERT' || payload.eventType === 'UPDATE'){
                change()
                console.log('Change received!', payload)
            }
        }
        )
        .subscribe()
    }
        state_update();
    });

    function change(){
        if (refresh){
            console.log('refresh')
            setRefresh(false)
        }
        else{
            console.log('refresh')
            setRefresh(true)
        }
    }


    useEffect(() => { 
        async function get_subs(){
            const { data, error } = await Supabase
            .from('User_Subs')
            .select()
            .eq('user_id', token)

            if (error){
                console.log(error)
            }
            else {
                setUsersubs(data)
            }
        }
        get_subs()
    }, [refresh])

    useEffect(() => {
        setTotal(helper()) 
    }, [Usersubs])

    function helper(){
        let result = 0
        if (Usersubs){
            for (let i = 0; i < Usersubs.length; i++){
                result = result + Usersubs[i].price
                console.log(Usersubs[i].price)
            }
        }
        return result
    }
    
        
    function adding(){
        if (display){
            setDisplay(false)
        }

        else {
            setDisplay(true)
        }
    }

    function isdelete( id ){
        if (todelete) {
            setToDelete(false)
        }
        else {
            setToDelete(true)
            setIdDelete(id)
                    }
    }

    useEffect(() => {
        if (theme === 'white'){
            setBoxColor('#ececec')
            setTextColor('black')
            setClasses("add_button")
        }
        else {
            setBoxColor('#2c3134')
            setTextColor('white')
            setClasses("add_button_dark")
        }
    } 
    ,[theme])

    return (

            <VStack w={'80vw'}  position='relative' left={'2vw'} top={"8.5vh"}>
                <Center>
                    <HStack w={"88vw"} color="white" position='relative' top={'-20vh'}>
                        <div className="gradient_boxes">
                            <h2>${Math.round(total * 100) / 100}</h2>
                            <p>Total payments per month</p>
                            <hr></hr>
                        </div>
                        <div className="gradient_boxes_2">
                            <h2>Netflix</h2>
                            <p>Upcoming payment on June 5</p>
                            <hr></hr>
                        </div>
                    </HStack>
                </Center>
                <div className={classes}>
                <button onClick={e => adding()}>
                        <i className="material-symbols-outlined" id="icons" >add</i> <a>Add</a>
                    </button></div>
                    {display && (
                        <AddUserSubs setDisplay={setDisplay} 
                        total = {total}/>
                    )}
                <div className="Subs_Container" >
                    <HStack  w="inherit" position="relative" left=".7vw" color={textcolor}>
                        <p className="logo">logo</p>
                        <p className="name">Name</p>
                        <p className="price">Price</p>
                        <p className="date">Renewal date</p>
                    </HStack>
                    <hr></hr>
                    <ul>
                    {todelete && (
                                        <DeleteSubs setToDisplay={setToDelete} id={iddelete} theme={theme}/>
                                    )}
                    {Usersubs && Usersubs.map(subs => (
                        <li id={subs.id}>
                            <HStack marginTop={"0.5vh"} bgColor={boxcolor} padding={"0.7vw"} borderRadius={"5px"} color={textcolor}>
                                    <p className="logo">logo</p>
                                    <p className="name">{subs.name}</p>
                                    <p className="price">${subs.price}</p>
                                    <p className="date">{FormatDate(subs.renewal_date)}</p>
                                    <button className="material-symbols-outlined" onClick={e => isdelete(e.target.value)} value={subs.id}>delete</button>
                                    
                            </HStack>
                        </li>
                    ))}
                    </ul>
                </div>
            </VStack>

    )
}