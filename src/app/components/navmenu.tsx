"use client"
import Link from "next/link"
import {signIn,signOut,useSession} from "next-auth/react"

function Authbutton(){
    const {data:session} = useSession()
    if(session){
        return(
            <>
            {session?.user?.name}<br/>
            <button onClick={()=>signOut()}>Sign out </button>
            </>
        )
    }
    return(
        <>
        Not signed in <br/>
        <button onClick={()=>signIn()}>Sign in </button>
        </>
    )
}

export default function navmenu(){
    return(
        <div>
            <Authbutton/>
        </div>
    )
}