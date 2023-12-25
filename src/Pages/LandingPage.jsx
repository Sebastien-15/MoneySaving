import { Center, HStack, VStack } from '@chakra-ui/react';
import { Supabase } from '../supabase';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function LandingPage(){
    const [fName, setfName] = useState()
    const [lName, setlName] = useState()
    const [EmailAddress, setEmailAddress] = useState()
    const [Password, setPassword] = useState()
    const [id, setID] = useState()

    async function HandleSubmit(e){
        e.preventDefault()
        try {
    const { data, error } = await Supabase.auth.signUp(
        {
          email: EmailAddress,
          password: Password,
        }
      )

      if (error) {
        throw error
      }
      if (data){
          setID(data.user.id)
          const { error } = await Supabase
            .from('User_Info')
            .insert([
            { first_name: fName, last_name: lName, email: EmailAddress, user_id: data.user.id }
            ])

            if (error){
                console.log(error)
            }
      }
    
    }
        catch (error) {
            alert(error)
    }    
    
    

    }


    return (
        <form  onSubmit={HandleSubmit}>
            <div  className='LandingPage'>
            <HStack h={"10vh"} >
            {/* <div className='Logo_Image'> </div> */}
            <img src="https://wteetmksupsiwaiqmcql.supabase.co/storage/v1/object/public/Logo/Logo.png" alt="Logo" className="Logo_Image"></img>
                <ul className='LandingPageOptions'>
                    <li>
                        <a href={`/login`}>
                            Login
                        </a>
                    </li>
                    <li>
                        <a href={`/features`}>
                            Features
                        </a>
                    </li>
                    <li>
                        <a>
                            Developers
                        </a>
                    </li>
                </ul>
            </HStack>
            <HStack w={"100vw"} color="white" h={"90vh"}>
                <div className='CompanyInfo'>
                    <VStack marginLeft={"5vw"} w={"50vw"}>
                        <h1>
                            What is SubsTrackr?
                        </h1>
                        <p>SubsTrackr is your go-to website for effortless management and tracking of your monthly subscriptions. SubsTrackr simplifies your financial life by helping you keep a close eye on all your active subscriptions.</p>
                    </VStack>
                </div>
                    <div className='InfoCreateAccount'>
                        <VStack marginLeft={"10vw"} w={"30vw"}>
                            <h2>
                                Get Started Today!
                            </h2>
                            <input placeholder='First Name' type="text" value={fName} onChange={(e) => setfName(e.target.value)} required></input>
                            <input placeholder='Last Name' type="text" value={lName} onChange={(e) => setlName(e.target.value)} required></input>
                            <input placeholder='Email Address'  type="email" value={EmailAddress} onChange={(e) => setEmailAddress(e.target.value)}></input>
                            <input placeholder='Password: at least 6 characters' type='password' value={Password} onChange={(e) => setPassword(e.target.value)}></input>
                            <button type='submit'>Create Account</button>
                        </VStack>
                    </div>
            </HStack>
            </div>
        </form>
    )
}