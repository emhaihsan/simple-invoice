"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import Link from "next/link";
import { signInWithGoogle } from "@/lib/firebase";

export default function SignIn() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (error) {
      setError("Login gagal. Silakan coba lagi.");
      console.error("Error saat login dengan Google:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <FileText className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-bold">SimpleInvoice</span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md w-96">
          <h1 className="mb-6 text-2xl font-bold text-center">Sign In</h1>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <Button onClick={handleGoogleSignIn} className="w-full mb-4">
            Sign in with Google
          </Button>
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-gray-500 border-t">
        © 2024 SimpleInvoice. All rights reserved.
      </footer>
    </div>
  );
}
