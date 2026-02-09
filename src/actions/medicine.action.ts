"use server";

import { addingMediService, MediDataInput } from "@/services/product.service";
import { updateTag } from "next/cache";

export const sendFormMediDataForAdding = async(data:MediDataInput) =>{
    const res = await addingMediService(data)

    updateTag("medicines")
    return res;
}