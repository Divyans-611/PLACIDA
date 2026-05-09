"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const products = [
  {
    id: 1,
    name: "Calm Pebble Fidget",
    description: "Smooth stone-textured fidget toy to ground your thoughts.",
    price: 499,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1606813902913-52527b9c3f9b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Weighted Plush Companion",
    description:
      "Soft, cuddly plush that provides gentle pressure for calming comfort.",
    price: 899,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1628191010644-b3e7dc4c5d6b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Aroma Dough Set",
    description:
      "Stress-relief dough infused with lavender and eucalyptus scents.",
    price: 699,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1623776059420-57d0d2b25d3b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "MindFocus Spinner",
    description:
      "Balanced spinner designed to enhance focus and ease nervous tension.",
    price: 349,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1604335399105-9f2c61b1d5b0?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Marketplace() {
  const [cart, setCart] = useState<number[]>([]);

  const addToCart = (id: number) => {
    setCart((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  return (
    <div className="p-8 text-gray-100">
      <h1 className="text-3xl font-semibold text-pink-400 mb-4">
        Mindful Marketplace
      </h1>
      <p className="text-gray-400 mb-8 max-w-2xl">
        Discover soothing and mindful products designed to ease stress,
        encourage focus, and bring small moments of calm to your day.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="bg-[#1E1E2A] border border-gray-800 hover:border-pink-400 transition-colors"
          >
            <CardContent className="p-4">
              <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-lg font-medium text-pink-300 mb-1">
                {product.name}
              </h2>
              <p className="text-gray-400 text-sm mb-3">
                {product.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-yellow-400 text-sm">
                  <Star className="w-4 h-4 fill-yellow-400" />
                  <span>{product.rating}</span>
                </div>
                <p className="text-pink-300 font-semibold">
                  ₹{product.price.toLocaleString()}
                </p>
              </div>
              <Button
                onClick={() => addToCart(product.id)}
                className={`mt-4 w-full rounded-xl ${
                  cart.includes(product.id)
                    ? "bg-pink-700 hover:bg-pink-800"
                    : "bg-pink-500 hover:bg-pink-600"
                }`}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {cart.includes(product.id) ? "Added to Cart" : "Add to Cart"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="mt-10 bg-[#252535] border border-gray-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-pink-300 mb-4">
            Your Cart
          </h2>
          <ul className="space-y-2 text-gray-300">
            {cart.map((id) => {
              const item = products.find((p) => p.id === id);
              return (
                <li key={id} className="flex justify-between">
                  <span>{item?.name}</span>
                  <span>₹{item?.price.toLocaleString()}</span>
                </li>
              );
            })}
          </ul>
          <div className="border-t border-gray-700 mt-4 pt-4 flex justify-between">
            <span className="text-pink-300 font-medium">Total</span>
            <span className="text-pink-400 font-semibold">
              ₹
              {cart
                .reduce(
                  (sum, id) => sum + (products.find((p) => p.id === id)?.price || 0),
                  0
                )
                .toLocaleString()}
            </span>
          </div>
          <Button className="mt-6 w-full bg-pink-500 hover:bg-pink-600 rounded-xl">
            Proceed to Checkout
          </Button>
        </div>
      )}
    </div>
  );
}
