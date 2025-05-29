import { Monitor,Earth,Mail } from "lucide-react";
import { MdCurrencyExchange } from "react-icons/md";
import { MdOutlineEditLocation } from "react-icons/md";
import { FaShapes } from "react-icons/fa6";

export default function Home() {
  return (
   <div className="min-h-screen bg-gray-50 py-12 px-4">

      <div className="max-w-4xl mx-auto">
        
        <div className="bg-white p-8 shadow-sm rounded-lg border flex flex-col w-full">
          
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">
              Create a store
            </h1>
            <p className="text-black space-x-3 ">
              Add your basic store information and complete the setup
            </p>
            <hr className="my-2 border-gray-300"/>
          </div>
          <div className="space-y-6 mb-3">
            <div className="flex items-center space-x-2">
              <div className="self-start pt-1">
              <Monitor className="text-blue-500 w-5 h-5"/>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-sm font-small text-gray-900 mb-1 font-bold">
                    Give your online store a name
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    A great store name is a big part of your success. Make sure it aligns with your brand and products.
                  </p>
                </div>
              </div>
              <input className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"/>
            </div>
          </div>
          <div className="space-y-6 mb-3">
          <div className="flex items-center space-x-2">
              <div className="self-start pt-1">
              <Earth className="text-blue-500 w-5 h-5"/>
              </div>
              <div className="flex-1 space-y-4 gap-4">
                <div>
                  <h3 className="text-sm font-small text-gray-900 mb-1 font-bold">
                    Give your online store a name
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    A great store name is a big part of your success. Make sure it aligns with your brand and products.
                  </p>
                </div>
              </div>
              <input className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"/>
            </div>
          </div>
          <div className="space-y-6 mb-3">
            <div className="flex items-center space-x-2">
              <div className="self-start pt-1">
              <MdOutlineEditLocation className="text-blue-500 w-5 h-5" />
              </div>
              
              <div className="flex-1 space-y-4 gap-4">
                <div>
                  <h3 className="text-sm font-small text-gray-900 mb-1 font-bold">
                    Give your online store a name
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    A great store name is a big part of your success. Make sure it aligns with your brand and products.
                  </p>
                </div>
              </div>
              <input className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"/>
            </div>
          </div>
          <div className="space-y-6 mb-3">
            <div className="flex items-center space-x-2">
              <div className="self-start pt-1">
              <FaShapes className="text-blue-500 w-4 h-4" />
              </div>
              <div className="flex-1 space-y-4 gap-4">
                <div>
                  <h3 className="text-sm font-small text-gray-900 mb-1 font-bold">
                    Give your online store a name
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    A great store name is a big part of your success. Make sure it aligns with your brand and products.
                  </p>
                </div>
              </div>
              <input className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"/>
            </div>
          </div>
          <div className="space-y-6 mb-3">
            <div className="flex items-center space-x-2">
              <div className="self-start pt-1">
              <MdCurrencyExchange className="text-blue-500 w-4 h-4" />
              </div>
              <div className="flex-1 space-y-4 gap-4">
                <div>
                  <h3 className="text-sm font-small text-gray-900 mb-1 font-bold">
                    Give your online store a name
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    A great store name is a big part of your success. Make sure it aligns with your brand and products.
                  </p>
                </div>
              </div>
              <input className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"/>
            </div>
          </div>
          <div className="space-y-6 mb-3">
            <div className="flex items-center space-x-2">
              <div className="self-start pt-1">
              <Mail className="text-blue-500 w-4 h-4" />
              </div>
              <div className="flex-1 space-y-4 gap-4">
                <div>
                  <h3 className="text-sm font-small text-gray-900 mb-1 font-bold">
                    Give your online store a name
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    A great store name is a big part of your success. Make sure it aligns with your brand and products.
                  </p>
                </div>
              </div>
              <input className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"/>
            </div>
          </div>
          <button className="w-1/5 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 self-end">Create Store</button>
        </div>
      </div>
    </div>
  );
}
