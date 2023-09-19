import { useEffect, useState } from "react"
import { Supabase } from "../supabase"

export function GetUserInfo( id ){
    const [data, setData] = useState()
    const [error, setFetchError] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await Supabase
            .from("User_Info")
            .select()
            .eq("user_id", id )

            if (error) {
                setFetchError("Could not get data from Supabase.")
                setData(null)
                console.log(error)
            }

            
            if (data) {
                setData(data)
                setFetchError(null)
            }
        }

        fetchData( )
    }, [])

return data
}
