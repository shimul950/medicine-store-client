import HeroCarousel from "@/components/modules/home/slidder";
import { userServices } from "@/services/user.service";


export default async function Home() {
 
  return (
    <div> 
      <HeroCarousel/>
    </div>
  );
}
