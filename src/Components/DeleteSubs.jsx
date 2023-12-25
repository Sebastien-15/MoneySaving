import { Box, HStack, useToast } from "@chakra-ui/react";
import { Supabase } from "../supabase";
import { useEffect, useState } from "react";

export function DeleteSubs ({ setToDisplay, id, theme }){
    let toast = useToast()
    const [boxcolor, setBoxColor] = useState('#ececec')
    const [textcolor, setTextColor] = useState('black')

function deletting(id){
    async function deleting( id ){ 
        const { data, error } = await Supabase
        .from('User_Subs')
        .delete()
        .eq('id', id)
        .select()
        setToDisplay(false)

        if (data){
            console.log(data)
        }

        if (error){
            toast({
                title: 'Error',
                        position: "top-center",
                        duration: 1500,
                        render: () => (
                            <HStack color="black" p={3} bg="White" borderRadius="10px">
                                <Box color="red">
                              <span class="material-symbols-outlined">cancel</span></Box><div>Could not delete Item</div>
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
                              </span></Box><div>Item deleted successfully</div>
                            </HStack>
                        )
            })

            
        }
}
    deleting(id)
}

function close(){
    setToDisplay(false)
}

useEffect(() => {
    if (theme === 'white'){
        setTextColor('black')
        setBoxColor("delete_subs")
    }
    else{
        setTextColor('white')
        setBoxColor('delete_subs_dark')
    }
}, [theme])

    return (
        <section className="standout_2">
            <div className={boxcolor}>
                <h2>Are you sure?</h2>
                <HStack>
                    <button onClick={e => deletting(id)}>Yes</button>
                    <button onClick={e => close()}>No</button>
                </HStack>
            </div>
        </section>
    )
}