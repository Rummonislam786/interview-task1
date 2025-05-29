"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";

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

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [mediaItems, setMediaItems] = useState<Array<{type: 'image' | 'video', url: string}>>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://glore-bd-backend-node-mongo.vercel.app/api/product"
        );
        const result = await response.json();
        
        if (result.status === 200 && result.data) {
          const foundProduct = result.data.find((p: Product) => p._id === id);
          if (foundProduct) {
            setProduct(foundProduct);
            
            // Create media items array for carousel
            const media: Array<{type: 'image' | 'video', url: string}> = [];
            
            // Add images
            if (foundProduct.images && foundProduct.images.length > 0) {
              foundProduct.images.forEach((image: ProductImage) => {
                media.push({
                  type: 'image',
                  url: image.secure_url
                });
              });
            }
            
            // Add video if exists
            if (foundProduct.video && foundProduct.video.secure_url) {
              media.push({
                type: 'video',
                url: foundProduct.video.secure_url
              });
            }
            
            setMediaItems(media);
          } else {
            setError("Product not found");
          }
        } else {
          setError("Failed to fetch product data");
        }
      } catch (err) {
        setError("An error occurred while fetching the product");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);
  
  const goToNextMedia = () => {
    if (mediaItems.length > 0) {
      setCurrentMediaIndex((prevIndex) => 
        prevIndex === mediaItems.length - 1 ? 0 : prevIndex + 1
      );
    }
  };
  
  const goToPrevMedia = () => {
    if (mediaItems.length > 0) {
      setCurrentMediaIndex((prevIndex) => 
        prevIndex === 0 ? mediaItems.length - 1 : prevIndex - 1
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">{error || "Product not found"}</h1>
        <Link href="/products" className="text-blue-500 hover:underline">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="w-full bg-gray-100">
        <div className="w-full max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 ">
          <Link href="/products" className="text-blue-500 hover:underline mb-8 inline-block">
            ← Back to Products
          </Link>
      
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Media Carousel */}
          <div className="p-6">
            <div className="relative">
              {/* Media Display */}
              <div className="relative h-150 w-full rounded-lg overflow-hidden mb-4">
                {mediaItems.length > 0 && (
                  mediaItems[currentMediaIndex].type === 'image' ? (
                    <Image
                      src={mediaItems[currentMediaIndex].url}
                      alt={`${product.name} - Image ${currentMediaIndex + 1}`}
                      fill
                      className="w-full h-full object-cover"
                      priority
                    />
                  ) : (
                    <video 
                      controls 
                      className="w-full h-full object-cover"
                      poster={product.images?.[0]?.secure_url}
                      autoPlay={true}
                      loop
                      muted
                    >
                      <source src={mediaItems[currentMediaIndex].url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )
                )}
              </div>
              
              {/* Carousel Navigation Arrows */}
              {mediaItems.length > 1 && (
                <>
                  <button 
                    onClick={goToPrevMedia}
                    className="absolute top-1/2 left-2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md focus:outline-none transition-all z-10"
                    aria-label="Previous media"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    onClick={goToNextMedia}
                    className="absolute top-1/2 right-2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md focus:outline-none transition-all z-10"
                    aria-label="Next media"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>
            
            {/* Media Indicators */}
            {mediaItems.length > 1 && (
              <div className="flex justify-center mt-4 space-x-2">
                {mediaItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentMediaIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${currentMediaIndex === index ? 'bg-blue-600 scale-110' : 'bg-gray-300'}`}
                    aria-label={`Go to media ${index + 1}`}
                  />
                ))}
              </div>
            )}
            
            {/* Media Type Indicator */}
            <div className="flex justify-center mt-4">
              <span className="text-sm text-gray-500">
                {mediaItems.length > 0 && (
                  mediaItems[currentMediaIndex].type === 'image' 
                    ? `Image ${currentMediaIndex + 1} of ${mediaItems.filter(item => item.type === 'image').length}` 
                    : 'Product Video'
                )}
              </span>
            </div>
          </div>
          
          {/* Product Details */}
          <div className="p-6 flex flex-col">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-sm text-gray-500 mb-4">Category: {product.category.name}</p>
              
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <span className="text-2xl font-bold text-blue-600">৳{product.price}</span>
              </div>
              
              <div className="prose max-w-none mb-8">
                <h3 className="text-xl font-semibold mb-2">Description</h3>
                <p className="text-gray-700">{product.description}</p>
              </div>
            </div>
            
            <div className="mt-auto">
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
