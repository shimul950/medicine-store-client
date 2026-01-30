import HeroCarousel from "@/components/modules/home/slidder";
import { authClient } from "@/lib/auth-client";
import { cookies } from "next/headers";


export default async function Home() {
 
  const cookieStore = await cookies();

  const res = await fetch("http://localhost:5000/api/auth/get-session",{
    headers:{
      Cookie : cookieStore.toString()
    }
  })

  const session = await res.json()

  console.log(session);

  return (
    <div> 
      <HeroCarousel/>
    </div>
  );
}
