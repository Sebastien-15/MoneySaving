import { Center, HStack, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { Supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

export function LoginPage({ setToken }){
    let navigate = useNavigate()
    const [EmailAddress, setEmailAddress] = useState()
    const [Password, setPassword] = useState()
    
    async function Update_ID (tokener){
        const { data, error } = await Supabase
        .from("User_Info")
        .select()
        .eq("email", EmailAddress )
        

        if (data){
            if (data[0].user_id === '0'){
                const { error } = await Supabase
                .from('User_Info')
                .update({ user_id: tokener.user.id })
                .eq( "email", EmailAddress )

                if (error){
                    console.log('could not update first log in ID')
                }
            }
        }

    }

    async function HandleSubmit(e){
        e.preventDefault()
        try {
        const { data, error } = await Supabase.auth.signInWithPassword({
            email: EmailAddress,
            password: Password,
          })

          if (error) throw error
          setToken(data)
          Update_ID(data)
          navigate('/Welcome')

        }
        catch (error){
            throw error
        }
    }
    return (
        <>
            <form className="LoginPage" onSubmit={HandleSubmit}>
                <Center>
                    <img src="https://wteetmksupsiwaiqmcql.supabase.co/storage/v1/object/public/Logo/Logo.png" alt="Logo" className="Logo_Image2"></img>
                    <VStack position="fixed" w={"30vw"} marginTop={"100vh"} bgColor="white" padding={"20px"} opacity={"0.95"}>
                        <input placeholder='Email Adress' value={EmailAddress} onChange={(e) => setEmailAddress(e.target.value)}></input>
                        <input placeholder='Password' type='password' value={Password} onChange={(e) => setPassword(e.target.value)}></input>
                        <button type='submit'>Log In</button>
                        <p>Don't have an account? <a href={`/`}>Create Account</a></p>
                    </VStack>
                </Center>
            </form>
            
        </>
    )
}