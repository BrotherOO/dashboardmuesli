"use client";
import React, { useState } from "react";
import { useAdmin } from "@/components/AdminProvider";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";

export default function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isAdmin } = useAdmin();
  const router = useRouter();

  if (isAdmin) {
    router.push("/");
    return null;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      router.push("/");
    } else {
      setError("Zugriff verweigert. Versuchen Sie 'admin'.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-sm p-10 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-background shadow-neu-flat flex items-center justify-center mb-6 text-primary border border-white/50">
          <Lock size={24} />
        </div>
        <h1 className="text-2xl font-black mb-2 text-foreground">Secure Login</h1>
        <p className="text-sm font-bold tracking-widest uppercase text-primary/70 mb-8 text-center">David Dubinskiy Analytics</p>
        <form onSubmit={handleLogin} className="w-full space-y-6">
          <div className="space-y-2">
            <Input 
              type="password" 
              placeholder="Passwort ('admin')" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          {error && <p className="text-sm text-primary text-center font-bold px-4">{error}</p>}
          <Button type="submit" variant="primary" className="w-full">
            Dashboard betreten
          </Button>
        </form>
      </Card>
    </div>
  );
}
