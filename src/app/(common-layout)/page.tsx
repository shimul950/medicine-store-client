import HeroCarousel from "@/components/modules/home/slidder";
import { userServices } from "@/services/user.service";



export default async function Home() {
 
  const session = await userServices.getsession();
  console.log(session);

  return (
    <div> 
      <HeroCarousel/>
    </div>
  );
}
