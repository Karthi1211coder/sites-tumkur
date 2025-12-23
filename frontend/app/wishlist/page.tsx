"use client";

import { useEffect, useState } from "react";
import SiteCard from "../components/SiteCard";

interface Site {
  name: string;
  location: string;
  price: number | string;
  code: string;
}

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<Site[]>([]);

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );
    setWishlist(data);
  }, []);

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">
          ❤️ Your wishlist is empty
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">
        My Wishlist
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((site) => (
          <SiteCard
            key={site.code}
            name={site.name}
            location={site.location}
            price={site.price}
            code={site.code}
          />
        ))}
      </div>
    </div>
  );
}
