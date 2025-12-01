"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupInput } from "@/components/ui/input-group";
import { useState } from "react";

export default function Home() {
  const [longUrl, setLongUrl] = useState("");
  const [slug, setSlug] = useState("");

  async function handleSubmit() {
    console.log("Shortening:", longUrl);
    const response = await fetch("http://localhost:5050/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ longUrl: longUrl }),
    });
    const data = await response.json();
    console.log("Shortened URL:", data);
    setSlug(data.slug);
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
              <InputGroup>
                <InputGroupInput 
                  placeholder="super-long-url-to-be-shorten-please"
                  className=""
                  onChange={(e) => setLongUrl(e.target.value)}
                  value={longUrl}
                />
                <InputGroupAddon>
                  <InputGroupText>https://localhost:3000/</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              {slug && (
                <p className="text-sm text-muted-foreground">
                  Shortened URL: <a href={`http://localhost:3000/${slug}`} className="text-primary underline">{`http://localhost:3000/${slug}`}</a>
                </p>
              )}
                <Button onClick={() => handleSubmit()} className="mt-4 hover:cursor-pointer">
                  Shorten URL
                </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
