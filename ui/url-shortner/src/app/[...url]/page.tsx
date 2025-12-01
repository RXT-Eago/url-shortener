"use client";
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';
 
export default function Page() {
  const params = useParams()
  const [message, setMessage] = useState("Redirecting...");

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
            if (window.location.href === data.url) {
              setMessage("You are already at the correct URL.");
            } else {
              setMessage("You are being redirected to the correct URL.");
              window.location.href = data.url; 
            }
          } else {
             setMessage("URL data missing in response.");
          }
        } else if (response.status === 404) {
          setMessage("URL not found.");
        } else {
          setMessage(`Error fetching URL: ${response.statusText}`);
        }
      } catch (error) {
         setMessage("Network or unexpected error fetching URL.");
      }
    };
    fetchUrl();
  }, [params.url]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-4">
      {message.includes("Redirecting") && (
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      )}
      <p>{message}</p>
    </div>
  );
}