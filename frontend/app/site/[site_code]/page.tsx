"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Site {
  site_code: string;
  name: string;
  location: string;
  price: number;
  area?: number;
  owner?: string;
  description?: string;
  image?: string;
}

export default function SiteDetails() {
  const params = useParams();
  const siteCode = params.site_code as string;

  const [site, setSite] = useState<Site | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSite = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/sites/${siteCode}/`
        );

        if (!res.ok) {
          throw new Error("Site not found");
        }

        const data = await res.json();
        setSite(data);
      } catch {
        setError("Failed to load site details");
      }
    };

    fetchSite();
  }, [siteCode]);

  if (error) {
    return <p className="text-red-600 text-center mt-10">{error}</p>;
  }

  if (!site) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* IMAGE */}
      {site.image && (
        <img
          src={site.image}
          alt={site.name}
          className="w-full h-72 object-cover rounded-lg mb-6"
        />
      )}

      <h1 className="text-3xl font-bold mb-2 text-gray-800">
        {site.name}
      </h1>

      {/* ✅ SITE CODE */}
      <p className="text-sm text-gray-500 mb-2">
        <b>Site Code:</b> {site.site_code}
      </p>

      <p className="text-gray-600 mb-2">
        📍 {site.location}
      </p>

      <p className="text-xl font-semibold text-red-600 mb-4">
        ₹ {site.price}
      </p>

      {site.area && (
        <p className="mb-2">
          <b>Area:</b> {site.area} sq.ft
        </p>
      )}

      {site.owner && (
        <p className="mb-2">
          <b>Owner:</b> {site.owner}
        </p>
      )}

      {site.description && (
        <p className="mt-4 text-gray-700">
          {site.description}
        </p>
      )}
    </div>
  );
}
