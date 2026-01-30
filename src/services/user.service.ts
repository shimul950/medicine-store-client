

import { cookies } from "next/headers";


export const userServices = {
    getsession: async function () {
        try {
            const cookieStore = await cookies();

            const res = await fetch("http://localhost:5000/api/auth/get-session", {
                headers: {
                    Cookie: cookieStore.toString()
                }
            })

            const session = await res.json()

            if(session === null){
                return({error:"Session not found"})
            }

            return { data: session, error: null }
        }catch(error){
            console.log(error);
            return{data:null, error:{message:"Something went wrong"}}
        }
    }

}