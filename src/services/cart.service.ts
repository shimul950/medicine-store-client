
export const getUserCart = async (userId: string) => {
  try {
    const res = await fetch(
      `${process.env.API_URL}/api/cart/${userId}`,
      {
        cache: "no-store", // cart must always be fresh
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
  console.log(userId, medicineId);
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

