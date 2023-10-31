import { Box, HStack, VStack, useStatStyles, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

export function AddUserSubs ({ setDisplay }){
    let toast = useToast()
    var token = ""
    if (sessionStorage.getItem('token')){
         token = JSON.parse(sessionStorage.getItem('token')).user.id
      }

    const [name, setName] = useState()
    const [price, setPrice] = useState()
    const [date, setStartDate] = useState()
    
    function reset(){
        setName()
        setPrice()
        setStartDate()
    }

    function SubmitSubs(e){
        e.preventDefault()

        let current = String(date).split('-')
        let future = new Date(Number(current[0]), Number(current[1]), Number(current[2]))
        future = String(future).split(' ')
        let renewal_date = future[1] + ' ' + future[2] + ' ' + future[3]
        
            const fetchData = async () => {
                const { error } = await Supabase
                .from("User_Subs")
                .insert([{user_id: token, name: name, price: price, start_date: date, renewal_date: renewal_date}])

                if (error){
                    toast({
                        title: 'Error',
                        position: "top-center",
                        duration: 1500,
                        render: () => (
                            <HStack color="black" p={3} bg="White" borderRadius="10px">
                                <Box color="red">
                              <span class="material-symbols-outlined">cancel</span></Box><div>Error in adding Item</div>
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
                              </span></Box><div>Item added successfully</div>
                            </HStack>
                        )
                    })

                    
                }
            }
    
            fetchData()

        close()
    }
    function close(){
        setDisplay(false)
    }

    return(
        <section className="standout"> t
            <div className="add_user_box">
                <form onSubmit={SubmitSubs}>
                    <VStack>
                        <input placeholder="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} required></input>
                        <input placeholder="Price" type="number" step='0.01' value={price} onChange={(e) => setPrice(e.target.value)} required></input>
                        <p style={
                        {
                            marginTop: "1vh"
                        }
                        }
                        >Most recent payment date</p>
                        <input placeholder="Name"  type="date" value={date} onChange={(e) => setStartDate(e.target.value)} required></input>
                        <HStack>
                            <button type="submit">Add</button>
                            <button type="reset" onClick={(e) => reset()}>Reset</button>
                            <button onClick={e => close()}>Close</button>
                        </HStack>
                    </VStack>
                </form>
            </div>
        </section>
    )
}