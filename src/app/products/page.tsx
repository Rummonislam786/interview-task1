"use client";

import { useState, useEffect } from 'react';
import Card from '@/components/card';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';

interface ProductImage {
  public_id: string;
  secure_url: string;
  optimizeUrl?: string;
}

interface ProductVideo {
  public_id: string;
  secure_url: string;
}

interface Category {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  category: Category;
  images: ProductImage[];
  video: ProductVideo;
  status: boolean;
  price: string;
  createdAt: string;
  updatedAt: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://glore-bd-backend-node-mongo.vercel.app/api/product"
        );
        const result = await response.json();
        
        if (result.status === 200 && result.data) {
          setProducts(result.data);
        } else {
          setError("Failed to fetch products");
        }
      } catch (err) {
        setError("An error occurred while fetching products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 font-semibold text-xl">{error}</p>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {user && (
            <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
              <h2 className="text-lg font-semibold text-gray-800">Welcome to {user.storeName}</h2>
              <p className="text-sm text-gray-600">Domain: {user.domain}.expressitbd.com | Currency: {user.currency}</p>
            </div>
          )}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Our Products</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Discover our amazing collection of high-quality products</p>
        </div>
        
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product._id}>
                <Card 
                  _id={product._id}
                  name={product.name}
                  description={product.description}
                  category={product.category}
                  images={product.images}
                  video={product.video}
                  price={product.price}
                />
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
