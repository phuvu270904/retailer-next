/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState, useEffect, useContext } from 'react';
import { usePathname } from 'next/navigation'; // For Next.js app directory, use `next/navigation`
import { Hero, Navbar, Products } from './components';
import { AppContext } from './context/AppContext';
import { CartContext } from './context/CartContext'; // Assuming CartContext is defined

export default function Home() {
  const [showCart, setShowCart] = useState(false);
  const { setQty, successMessage }: any = useContext(CartContext);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/') {
      setQty(1);
    }
  }, [pathname, setQty]);

  return (
    <AppContext.Provider value={{ showCart, setShowCart }}>
      {successMessage && (
        <div className='fixed top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-4 rounded-md text-lg' style={{zIndex: 100}}>
          <span>{successMessage}</span>
        </div>
      )}
      <Navbar />
      <Hero />
      <Products />
    </AppContext.Provider>
  );
}
