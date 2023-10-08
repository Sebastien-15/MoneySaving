import { HStack, useToast } from "@chakra-ui/react";
import { Supabase } from "../supabase";

export function DeleteSubs ({ setToDisplay, id, setTotal, setUsersubs, check }){

    console.log(id)
    let toast = useToast()

function deletting(id){
    async function deleting( id ){
        console.log(id)   
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
                description: "Could Not delete Item",//(Error).message,
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }
        else {
            toast({
                title: 'Success',
                description: "Item deleted successfully",//(Success).message,
                status: 'success',
                duration: 2000,
                isClosable: true,
                color: "#0ff0a0"
            })

            if (check){
                const { dat, error } = await Supabase
                .from("User_Subs")
                .select()
                .eq("user_id", token )
    
                if (dat){
                    console.log(dat)
                    setUsersubs(dat)
                    setTotal(helper())
                    setcheck(false)
                }
        
    
    
            if (error){
                console.log(error)
            }
            }
        }
}
    deleting(id)
}

function close(){
    setToDisplay(false)
}



    return (
        <section className="standout_2">
            <div className="delete_subs">
                <h2>Are you sure?</h2>
                <HStack>
                    <button onClick={e => deletting(id)}>Yes</button>
                    <button onClick={e => close()}>No</button>
                </HStack>
            </div>
        </section>
    )
}