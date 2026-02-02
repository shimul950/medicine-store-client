

import { cookies } from "next/headers";


export const userServices = {
    getsession: async function () {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${process.env.API_URL}/api/auth/get-session`, {
                headers: {
                    Cookie: cookieStore.toString()
                },

            })

            const session = await res.json()

            if (session === null) {
                return ({ error: "Session not found" })
            }

            return { data: session, error: null }
        } catch (error) {
            console.log(error);
            return { data: null, error: { message: "Something went wrong" } }
        }
    },

    getAllUsers: async function () {
        try {

            console.log("API_URL:", process.env.API_URL);

            const res = await fetch(
                `${process.env.API_URL}/api/admin/users`,
                {
                    cache: "no-store"
                }
            );

            if (!res.ok) {
                throw new Error("Failed to fetch users");
            }

            const result = await res.json();
            return result;
        } catch (error) {
            console.error("Get all users error:", error);
            return { data: [] };
        }
    }

}