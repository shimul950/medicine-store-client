

export const getUserCart = async (userId: string) => {
  try {
    const res = await fetch(
      `${process.env.API_URL}/api/cart/${userId}`,
      {
        cache: "no-store", 
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch cart");
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error);
    return {
      data: null,
      error: { message: "Something went wrong" },
    };
  }
};


export const addToCart = async (userId: string, medicineId: string, quantity :number) => {
  try {
    const res = await fetch(`${process.env.API_URL}/api/cart/${userId}/add`, {
      method: "POST",
      body: JSON.stringify({ userId, medicineId, quantity }),
    });

    return await res.json();
  } catch (error) {
    console.error(error);
    return { error: { message: "Something went wrong" } };
  }
};

