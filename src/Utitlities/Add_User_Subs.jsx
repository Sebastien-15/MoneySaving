import { useEffect, useState } from "react"
import { Supabase } from "../supabase"

export function AddSubs ({ name, price, user_id }){

    useEffect(() => {
        const fetchData = async () => {
            const { error } = await Supabase
            .from("User_Subs")
            .insert([{user_id: user_id, name: name, price: price, renewal_date: renewal_date}])
        }

        fetchData( )
    }, [])

}