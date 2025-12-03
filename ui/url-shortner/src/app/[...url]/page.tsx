"use client";

import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react';
 
export default function Page() {
  const params = useParams()
  const router = useRouter()

  const fetchUrl = async () => {
    try {
      const response = await fetch(`http://localhost:5050/${params.url}`)
      
      const data = await response.json();
      console.log("data", data)
      if (data.redirect) {
        router.push(data.url);
      }
    } catch (error) {
      console.error("Error fetching URL:", error);
    }
  };

  useEffect(() => {
    console.log("params.url", params.url)
    fetchUrl();
  }, [params.url]);
  
  return (
    <div className="">
    </div>
  );
}