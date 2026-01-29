import { Navbar1 } from "@/components/shared/navbar1";


export default function commonLayout({children}:{children:React.ReactNode}){
    return(
        <div className="mx-2 lg:mx-20">
            <Navbar1/>
            {children}
        </div>
    )
}