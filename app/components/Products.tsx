/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import Card from './Card';

const Products = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [sortCriteria, setSortCriteria] = useState('default');

    // Fetch products inside useEffect
    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await client.fetch(groq`*[_type=="product"]`);
            setProducts(fetchedProducts);
        };

        fetchProducts();
    }, []);

    // Sorting logic
    const sortProducts = (products: any[]) => {
        switch (sortCriteria) {
            case 'priceAsc':
                return [...products].sort((a, b) => a.price - b.price);
            case 'priceDesc':
                return [...products].sort((a, b) => b.price - a.price);
            case 'nameAsc':
                return [...products].sort((a, b) => a.name.localeCompare(b.name));
            case 'nameDesc':
                return [...products].sort((a, b) => b.name.localeCompare(a.name));
            default:
                return products;
        }
    };

    const sortedProducts = sortProducts(products);

    return (
        <div className='bg-[#f8f8f8] w-full py-12 mt-[125px]'>
            <div className='container'>
                <div className='py-4'>
                    <h1 className='text-3xl font-bold'>Best Selling Products</h1>
                    <h1>Enjoy Up To 50%</h1>
                </div>
                <div className='flex justify-end mb-4'>
                    <select
                        className='border rounded-md px-4 py-2'
                        value={sortCriteria}
                        onChange={(e) => setSortCriteria(e.target.value)}
                    >
                        <option value="default">Default</option>
                        <option value="priceAsc">Price: Low to High</option>
                        <option value="priceDesc">Price: High to Low</option>
                        <option value="nameAsc">Name: A to Z</option>
                        <option value="nameDesc">Name: Z to A</option>
                    </select>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-6'>
                    {sortedProducts.map((product: any, index: number) => (
                        <Card key={index} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;
