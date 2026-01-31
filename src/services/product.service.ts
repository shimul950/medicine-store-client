

export const getAllMedicines = async () => {
    try {
        const res = await fetch(`${process.env.API_URL}/api/medicine`, {
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