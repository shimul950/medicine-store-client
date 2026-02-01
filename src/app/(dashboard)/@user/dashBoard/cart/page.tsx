

"use client";

import { useEffect, useState } from "react";
import { getUserCart } from "@/services/cart.service";

export default function CartPage({ userId }: { userId: string }) {
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      const result = await getUserCart(userId);
      if (result.data) {
        setCart(result.data);
      } else {
        console.error(result.error.message);
      }
      setLoading(false);
    };

    fetchCart();
  }, [userId]);

  if (loading) return <p>Loading cart...</p>;

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.medicine.name} - {item.quantity} pcs
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
