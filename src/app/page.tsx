"use client"
import { Monitor, Earth, Mail } from "lucide-react";
import {MdCurrencyExchange, MdOutlineEditLocation} from "react-icons/md"
import {FaShapes} from "react-icons/fa6"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

type FieldKey = "domain" | "storeName" | "currency" | "country" | "category" | "email";

const formFields: Array<{
  icon: any;
  title: string;
  description: string;
  type: string;
  placeholder?: string;
  key: FieldKey;
  options?: string[];
}> = [
  {
    icon: Monitor,
    title: "Give your online store a name",
    description: "A great store name is a big part of your success. Make sure it aligns with your brand and products.",
    type: "input",
    placeholder: "How'd you like to call your store?",
    key: "storeName"
  },
  {
    icon: Earth,
    title: "Your online store subdomain",
    description: "A SEO-friendly store name is a crucial part of your success. Make sure it aligns with your brand and products.",
    type: "domain",
    placeholder: "enter your domain name",
    key: "domain"
  },
  {
    icon: MdOutlineEditLocation,
    title: "Where's your store located?",
    description: "Set your store's default location so we can optimize store access and speed for your customers.",
    type: "select",
    key: "country",
    options: ["Bangladesh", "India", "Srilanka", "Nepal", "China", "Pakistan", "Bhutan", "Myanmar"]
  },
  {
    icon: FaShapes,
    title: "What's your Category?",
    description: "Set your store's default category so we can optimize store access and speed for your customers.",
    type: "select",
    key: "category",
    options: ["Fashion", "Electronics", "Clothing", "Footwear", "Jewelry", "Books", "Stationery", "Beauty"]
  },
  {
    icon: MdCurrencyExchange,
    title: "Choose store currency",
    description: "This is the main currency you wish to sell in.",
    type: "select",
    key: "currency",
    options: ["BDT", "USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "HKD", "NZD", "SGD", "ZAR"]
  },
  {
    icon: Mail,
    title: "Store contact email",
    description: "This is the email you'll use to send notifications and receive orders from customers.",
    type: "email",
    placeholder: "you@example.com",
    key: "email"
  }
];

export default function Home() {
  const [formData, setFormData] = useState({
    domain: "", storeName: "", currency: "", country: "", category: "", email: ""
  });
  const [domainAvailable, setDomainAvailable] = useState<boolean | null>(null);
  const [checkingDomain, setCheckingDomain] = useState(false);
  const [domainError, setDomainError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [key in FieldKey]?: string }>({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  
  useEffect(() => {
    // If user is already authenticated, redirect to products page
    if (isAuthenticated) {
      router.push('/products');
    }
  }, [isAuthenticated, router]);

  const updateFormData = (key: FieldKey, value: string) => setFormData(prev => ({ ...prev, [key]: value }));

  async function checkDomain() {
    setCheckingDomain(true);
    setDomainAvailable(null);
    setDomainError(null);
    try {
      const res = await fetch(`https://interview-task-green.vercel.app/task/domains/check/${formData.domain}.expressitbd.com`);
      const data = await res.json();
      console.log(data);
      if (data?.data?.taken) {
        setDomainAvailable(false);
        setDomainError(data?.data?.message || "This domain is already taken!");
      } else {
        setDomainAvailable(true);
        setDomainError(null);
      }
    } catch (e) {
      setDomainAvailable(false);
      setDomainError("Error checking domain");
    } finally {
      setCheckingDomain(false);
    }
  }

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  console.log(formData);
  checkDomain();
  if (checkingDomain) return;
    e.preventDefault();
    // setFormError(null); // Removed unused variable
    setFieldErrors({});
    const errors: { [key in FieldKey]?: string } = {}; // Use proper type

    if (!formData.storeName || formData.storeName.trim().length < 3) {
      errors.storeName = "Store name must be at least 3 characters.";
    }
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!formData.domain || formData.domain.trim().length < 3) {
      errors.domain = "Domain must be at least 3 characters.";
    }
    if (!formData.country) {
      errors.country = "Please select your country.";
    }
    if (!formData.category) {
      errors.category = "Please select a category.";
    }
    if (!formData.currency) {
      errors.currency = "Please select a currency.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    if (!domainAvailable) {
      setFormError("Please check domain availability first.");
      return;
    }

    try {
      // Here you would typically submit the form data to your backend
      console.log("Form submitted:", formData);
      
      // Log the user in using the auth context
      login(formData);
      
      // Set registration success
      setRegistrationSuccess(true);
      
      // Redirect to products page
      router.push("/products");
    } catch (error: unknown) {
      console.error("Error submitting form:", error);
      setFormError("An error occurred while creating your store. Please try again.");
    }
}

  const renderField = (field: {
  icon: any;
  title: string;
  description: string;
  type: string;
  placeholder?: string;
  key: FieldKey;
  options?: string[];
}) => {
    const Icon = field.icon;
    const commonClasses = "w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900";
    return (
      <div key={field.key} className="space-y-4 sm:space-y-6 mb-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
          <div className="self-start pt-1">
            <Icon className="text-blue-500 w-5 h-5" />
          </div>
          <div className="flex-1 space-y-2 sm:space-y-4">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1">
                {field.title}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {field.description}
              </p>
            </div>
          </div>
          <div className="flex flex-col w-full sm:w-1/2">
            {field.type === "domain" ? (
              <div className="flex w-full max-w-md rounded-md border border-gray-300 overflow-hidden">
                <input
                  type="text"
                  placeholder={field.placeholder}
                  className="w-full px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none"
                  value={formData[field.key]}
                  onChange={e => updateFormData(field.key, e.target.value)}
                />
                <span className="px-4 py-2 text-gray-500 bg-gray-50 whitespace-nowrap">
                  .expressitbd.com
                </span>
              </div>
            ) : field.type === "select" ? (
              <select 
                className={commonClasses}
                value={formData[field.key]}
                onChange={e => updateFormData(field.key, e.target.value)}
              >
                <option value="">Select a {field.key}</option>
                {field.options?.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <div className="flex w-full max-w-md rounded-md border border-gray-300 overflow-hidden">
                <input
                  type={field.type === "email" ? "email" : "text"}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none"
                  value={formData[field.key]}
                  onChange={e => updateFormData(field.key, e.target.value)}
                />
              </div>
            )}
            {fieldErrors[field.key] && (
              <p className="mt-0 text-sm text-red-600">{fieldErrors[field.key]}</p>
            )}
            {(field.key === "domain" && domainError) && (
              <p className="mt-0 text-sm text-red-600">{domainError}</p>
            )}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-2 sm:py-12 sm:px-4">
      <div className="max-w-4xl mx-auto w-full">
        <div className="bg-white p-4 sm:p-8 shadow-sm rounded-lg border flex flex-col w-full">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
              Create a store
            </h1>
            <p className="text-black space-x-1 sm:space-x-3 text-sm sm:text-base">
              Add your basic store information and complete the setup
            </p>
            <hr className="my-2 border-gray-300" />
          </div>
          <form onSubmit={handleSubmit}>
            {formFields.map(renderField)}
            <button
              type="submit"
              className="w-full sm:w-1/3 md:w-1/5 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 self-end mt-4">
              Create Store
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}