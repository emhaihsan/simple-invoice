import { Button } from "@/components/ui/button";
import { FileText, LogIn, FilePlus, FileDown } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="#">
          <FileText className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-bold">SimpleInvoice</span>
        </Link>
        <nav className="ml-auto">
          <Link href="/auth/signin">
            <Button variant="ghost">Sign In</Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex flex-col justify-center">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Simplify your billing process today!
              </h1>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Create and generate professional invoices in minutes. No frills,
                just results.
              </p>
              <div className="w-full max-w-sm space-y-2">
                <Link href="/auth/signin">
                  <Button className="w-full" size="lg">
                    Try It For Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold text-center mb-8">
              Core Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <LogIn className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Easy Login</h3>
                <p className="text-gray-500">
                  Secure and quick access to your account.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <FilePlus className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Create Invoice</h3>
                <p className="text-gray-500">
                  Simple form to create professional invoices.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <FileDown className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Generate PDF</h3>
                <p className="text-gray-500">
                  Download your invoice as a PDF with one click.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">
          © 2024 SimpleInvoice. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
