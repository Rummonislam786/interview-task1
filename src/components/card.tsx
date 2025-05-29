import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

interface ProductProps {
  _id: string;
  name: string;
  description: string;
  category: Category;
  images: ProductImage[];
  video?: ProductVideo;
  price: string;
}

const Card = ({ _id, name, description, category, images, video, price }: ProductProps) => {
  return (
    <Link href={`/products/${_id}`} className="block">
      <div className="w-full h-100 bg-gray-800 p-3 flex flex-col gap-1 rounded-br-3xl transform transition-transform hover:-translate-y-2 hover:shadow-xl">
        <div className="relative h-64 overflow-hidden">
          {images && images.length > 0 ? (
            <Image 
              src={images[0].secure_url} 
              alt={name}
              fill
              className="duration-500 contrast-75 hover:contrast-100 object-cover rounded-tl-lg"
            />
          ) : (
            <div className="duration-500 contrast-50 h-full w-full bg-gradient-to-bl from-black via-orange-900 to-indigo-600 hover:contrast-100 rounded-tl-lg" />
          )}
          
          {/* Video indicator */}
          {video && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white p-1.5 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <span className="text-xl text-gray-50 font-bold line-clamp-1">{name}</span>
              <p className="text-xs text-gray-400">{category.name}</p>
            </div>
            <span className="font-bold text-red-600">৳{price}</span>
          </div>
          <p className="text-xs text-gray-300 line-clamp-2">{description}</p>
          <button className="hover:bg-sky-700 text-gray-50 bg-sky-800 py-2 rounded-br-xl mt-auto cursor-pointer">View Details</button>
        </div>
      </div>
    </Link>
  );
}

export default Card;
