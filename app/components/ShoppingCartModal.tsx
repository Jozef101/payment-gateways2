"use client"

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Checkout from "./Checkout";

export default function ShoppingCartModal() {
  const { cartCount, shouldDisplayCart, handleCartClick, cartDetails, removeItem, totalPrice, redirectToCheckout, decrementItem, incrementItem } = useShoppingCart();
  const initialOptions = {
    "clientId": "AaAy5Y-uQonrraqMfwAIO82xRhoeY9wQ1WbFmkJqpSxdJgnb1sKXa5bdBMWfNcHKO3AdwlsW4y4IOHHA",
    currency: "EUR",
    intent: "capture",
  };

  const handleDecrement = (id: string) => {
    decrementItem(id);
  };

  const handleIncrement = (id: string) => {
    incrementItem(id);
  };

  const handleCheckoutClick = async (event: any) => {
    event.preventDefault();
    try {
      const result = await redirectToCheckout()
      if (result?.error) {
        console.log("result");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Round totalPrice to two decimal places
  const roundedTotalPrice = totalPrice? totalPrice.toFixed(2) : '' ;

  return (
    <PayPalScriptProvider options={initialOptions}>
      <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
        <SheetContent className="sm:max-w-lg w-[90vw]">
          <SheetHeader>
            <SheetTitle>Nákupný košík</SheetTitle>
          </SheetHeader>
          <div className="h-full flex flex-col justify-between">
            <div className="mt-8 flex-1 overflow-y-auto">
              <ul className="my-6 divide-y divide-gray-200">
                {cartCount === 0 ? (
                  <h1>Váš košík je prázdny</h1>
                ) : (
                  <>
                    {Object.values(cartDetails ?? {}).map((entry) => (
                      <li key={entry.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border-gray-200">
                          <Image src={entry.image as string} alt="Fotka produktu" width={100} height={100} />
                        </div>
                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{entry.name}</h3>
                              <p>{entry.price} €</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                              {entry.description}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="flex items-start justify-start">
                              <p className="mr-5">{entry.quantity} ks</p>
                              <button className="mr-5 font-extrabold" onClick={() => handleDecrement(entry.id)}>-</button>
                              <button className="mr-5 font-extrabold" onClick={() => handleIncrement(entry.id)}>+</button>
                            </div>
                            <div className="flex">
                              <button type="button" className="font-medium text-primary hover:text-primary/80" onClick={() => removeItem(entry.id)}>
                                odstrániť
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                    
                  </>                  
                )}
              </ul>
            </div>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Spolu:</p>
                <p>{roundedTotalPrice} €</p>
              </div>
              <div className="mt-6">
                <Checkout roundedTotalPrice = {Number(roundedTotalPrice)}/>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  alebo <button onClick={() => handleCartClick()} className="font-medium text-primary hover:text-primary/80">pokračujte v nákupe</button>
                </p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </PayPalScriptProvider>
  );
}
