import { revalidateTag, updateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface MediDataInput {
    name: string,
    description: string,
    price: number,
    stock: number,
    categoryName: string,
}


export const getAllMedicines = async () => {
    try {
        const res = await fetch(`${process.env.API_URL}/api/medicine`, {
            next: {
                tags:['medicines']
            },
        });
        const result = await res.json();
        return result;
    } catch (error) {
        console.log(error);
        return { data: null, error: { message: "Something went wrong" } }
    }
};

export const getFeaturedMedicines = async () => {
    try {
        const res = await fetch(`${process.env.API_URL}/api/medicine?featured=true`, {
            next: {
                revalidate: 10,
            },
        });
        const result = await res.json();
        return result;
    } catch (error) {
        console.log(error);
        return { data: null, error: { message: "Something went wrong" } }
    }
};

export const getSinglemedicine = async (id: string) => {
    try {
        const res = await fetch(`${process.env.API_URL}/api/medicine/${id}`, {
            next: {
                revalidate: 10,
            },
        });
        const result = await res.json();
        return result;
    } catch (error) {
        console.log(error);
        return { data: null, error: { message: "Something went wrong" } }
    }
};

export const addingMediService = async (data: MediDataInput) => {
    try {
        const cookieStore = await cookies();

        const res = await fetch(`${process.env.API_URL}/api/medicine/seller/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
            body: JSON.stringify(data)
        })

        if (!res.ok) {
            throw new Error("Failed to add medicine");
        }


        if(res.ok){
            revalidateTag("medicines", "max");
            // updateTag("medicines")   //todo: use either one of them

        }
    } catch (error) {
        console.log(error);
        return { data: null, error: { message: "Something went wrong" } }
    }
}