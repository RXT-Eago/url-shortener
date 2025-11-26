"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("http://localhost:3000/");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Shortening:", url);
    // TODO: Integrate with backend API
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background text-foreground font-sans">
      <main className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            URL Shortener
          </h1>
          <p className="text-muted-foreground">
            Enter a long URL to generate a short link.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Shorten Link</CardTitle>
            <CardDescription>Paste your long URL below</CardDescription>
          </CardHeader>
          <CardContent>
             <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input 
                  type="url" 
                  placeholder="http://localhost:3000/your-slug" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
                <Button type="submit" className="w-full">
                  Shorten URL
                </Button>
             </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
