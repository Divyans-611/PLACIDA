"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const products = [
  {
    id: 1,
    name: "Calm Pebble Fidget",
    description: "Smooth stone-textured fidget toy to ground your thoughts.",
    price: 499,
    rating: 4.8,
    image:
      "/p1.jpg",
  },
  {
    id: 2,
    name: "Weighted Plush Companion",
    description:
      "Soft, cuddly plush that provides gentle pressure for calming comfort.",
    price: 899,
    rating: 4.9,
    image:
      "/p2.webp",
  },
  {
    id: 3,
    name: "Aroma Dough Set",
    description:
      "Stress-relief dough infused with lavender and eucalyptus scents.",
    price: 699,
    rating: 4.7,
    image:
      "/p3.jpg",
  },
  {
    id: 4,
    name: "MindFocus Spinner",
    description:
      "Balanced spinner designed to enhance focus and ease nervous tension.",
    price: 349,
    rating: 4.6,
    image:
      "/p4.jpg",
  },
];

export default function Marketplace() {
  const [cart, setCart] = useState<number[]>([]);
  const [addressDialog, setAddressDialog] = useState(false);
  const [paymentDialog, setPaymentDialog] = useState(false);
  const [confirmationDialog, setConfirmationDialog] = useState(false);
  const [addressInfo, setAddressInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const addToCart = (id: number) => {
    setCart((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const totalPrice = cart.reduce(
    (sum, id) => sum + (products.find((p) => p.id === id)?.price || 0),
    0
  );

  const handleProceedToCheckout = () => {
    setAddressDialog(true);
  };

  const handleAddressSubmit = () => {
    setAddressDialog(false);
    setPaymentDialog(true);
  };

  const handlePaymentConfirm = () => {
    setPaymentDialog(false);
    setConfirmationDialog(true);
  };

  return (
    <div className="p-8 text-gray-100 dark:text-gray-100 transition-colors">
      <h1 className="text-3xl font-semibold text-pink-400 mb-4">
        Mindful Marketplace
      </h1>
      <p className="text-gray-400 mb-8 max-w-2xl">
        Discover soothing and mindful products designed to ease stress,
        encourage focus, and bring small moments of calm to your day.
      </p>

      {/* 🛍 Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="bg-[#f9fafb] dark:bg-[#1E1E2A] border border-gray-200 dark:border-gray-800 hover:border-pink-400 transition-colors"
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
              <h2 className="text-lg font-medium text-pink-500 dark:text-pink-300 mb-1">
                {product.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                {product.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-yellow-500 text-sm">
                  <Star className="w-4 h-4 fill-yellow-400" />
                  <span>{product.rating}</span>
                </div>
                <p className="text-pink-500 dark:text-pink-300 font-semibold">
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

      {/* 🧺 Cart Section */}
      {cart.length > 0 && (
        <div className="mt-10 bg-[#f9fafb] dark:bg-[#252535] border border-gray-300 dark:border-gray-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-pink-500 dark:text-pink-300 mb-4">
            Your Cart
          </h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
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
          <div className="border-t border-gray-300 dark:border-gray-700 mt-4 pt-4 flex justify-between">
            <span className="text-pink-500 dark:text-pink-300 font-medium">
              Total
            </span>
            <span className="text-pink-500 dark:text-pink-400 font-semibold">
              ₹{totalPrice.toLocaleString()}
            </span>
          </div>
          <Button
            className="mt-6 w-full bg-pink-500 hover:bg-pink-600 rounded-xl"
            onClick={handleProceedToCheckout}
          >
            Proceed to Checkout
          </Button>
        </div>
      )}

      {/* 🏠 Address Dialog */}
      <Dialog open={addressDialog} onOpenChange={setAddressDialog}>
        <DialogContent className="sm:max-w-md bg-[#f9fafb] dark:bg-[#1E1E2A]">
          <DialogHeader>
            <DialogTitle className="text-pink-500 dark:text-pink-300">
              Delivery Details
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={addressInfo.name}
                onChange={(e) =>
                  setAddressInfo({ ...addressInfo, name: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="e.g. 9876543210"
                value={addressInfo.phone}
                onChange={(e) =>
                  setAddressInfo({ ...addressInfo, phone: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="address">Full Address</Label>
              <Input
                id="address"
                placeholder="Your delivery address"
                value={addressInfo.address}
                onChange={(e) =>
                  setAddressInfo({ ...addressInfo, address: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleAddressSubmit}
              disabled={
                !addressInfo.name || !addressInfo.phone || !addressInfo.address
              }
              className="bg-pink-500 hover:bg-pink-600 w-full"
            >
              Continue to Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 💳 Payment Dialog */}
      <Dialog open={paymentDialog} onOpenChange={setPaymentDialog}>
        <DialogContent className="sm:max-w-md bg-[#f9fafb] dark:bg-[#1E1E2A]">
          <DialogHeader>
            <DialogTitle className="text-pink-500 dark:text-pink-300">
              Choose Payment Method
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Button
              onClick={handlePaymentConfirm}
              className="w-full bg-pink-500 hover:bg-pink-600"
            >
              Cash on Delivery (COD)
            </Button>
            <Button variant="outline" disabled className="w-full opacity-60">
              Online Payment (Coming Soon)
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ✅ Confirmation Dialog */}
      <Dialog open={confirmationDialog} onOpenChange={setConfirmationDialog}>
        <DialogContent className="sm:max-w-md bg-[#f9fafb] dark:bg-[#1E1E2A] text-center">
          <DialogHeader>
            <DialogTitle className="text-pink-500 dark:text-pink-300">
              🎉 Order Confirmed!
            </DialogTitle>
          </DialogHeader>
          <p className="text-gray-600 dark:text-gray-300">
            Thank you, <b>{addressInfo.name}</b>! Your order will be delivered to{" "}
            <b>{addressInfo.address}</b> soon.
          </p>
          <DialogFooter>
            <Button
              onClick={() => {
                setConfirmationDialog(false);
                setCart([]);
              }}
              className="mt-4 bg-pink-500 hover:bg-pink-600 w-full"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
