"use client";
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';
 
export default function Page() {
  const params = useParams()
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const slug = Array.isArray(params.url) ? params.url.join('') : params.url;
        const response = await fetch(`http://localhost:5050/${slug}`, {
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.url) {
             setRedirectUrl(data.url);
             setTimeout(() => {
                 window.location.href = data.url;
             }, 2000);
          }
        } else {
          console.error("URL not found");
        }
      } catch (error) {
         console.error("Error fetching URL:", error);
      }
    };
    fetchUrl();
  }, [params.url]);

  if (redirectUrl) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-4">
            <p className="text-xl">You are being redirected to the correct URL:</p>
            <a href={redirectUrl} className="text-blue-500 underline text-lg">{redirectUrl}</a>
        </div>
      )
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      <p>Redirecting...</p>
    </div>
  );
}