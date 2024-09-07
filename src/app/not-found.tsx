import { FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <FileText className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-bold">SimpleInvoice</span>
        </Link>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Oops! Page not found</p>
        <div className="max-w-md text-center mb-8">
          <p className="text-gray-500">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <Link href="/">
          <Button>Go back to homepage</Button>
        </Link>
      </main>
      <footer className="py-6 text-center text-sm text-gray-500 border-t">
        © 2023 SimpleInvoice. All rights reserved.
      </footer>
    </div>
  );
}
