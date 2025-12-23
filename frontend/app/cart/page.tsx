"use client";

import { useEffect, useState } from "react";

interface CartItem {
  name: string;
  location: string;
  price: number | string;
  code: string;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  // 🔹 Load cart from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(data);
  }, []);

  // 🔹 Remove item from cart
  const removeFromCart = (code: string) => {
    const updated = cart.filter((item) => item.code !== code);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // 🔹 Submit booking to backend
  const submitBooking = async () => {
    if (!name || !phone || !date) {
      alert("Please fill booking details");
      return;
    }

    const bookingData = {
      name,
      phone,
      date,
      sites: cart,
    };

    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/bookings/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      if (!res.ok) throw new Error("Booking failed");

      // ✅ Clear cart after successful booking
      localStorage.removeItem("cart");
      setCart([]);
      setMessage("✅ Booking request submitted!");
    } catch (err) {
      alert("❌ Failed to submit booking");
    }
  };

  // 🔹 Empty cart state
  if (cart.length === 0) {
  return (
    <div style={{ padding: "20px" }}>
      {message ? (
        <p>{message}</p>
      ) : (
        <p>Cart is empty</p>
      )}
    </div>
  );
}


  return (
    <div style={{ padding: "20px" }}>
      <h1>My Cart</h1>

      {/* 🛒 CART ITEMS */}
      {cart.map((item) => (
        <div
          key={item.code}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px",
          }}
        >
          <h3>{item.name}</h3>
          <p>📍 {item.location}</p>
          <p>💰 ₹{item.price}</p>

          <button onClick={() => removeFromCart(item.code)}>
            ❌ Remove
          </button>
        </div>
      ))}

      {/* 📅 BOOKING FORM */}
      <h2>Book a Visit</h2>

      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <br /><br />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <br /><br />

      <button onClick={submitBooking}>
        Submit Booking
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}
