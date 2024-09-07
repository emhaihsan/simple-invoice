"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileText, ArrowLeft, FileDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";

export default function CreateInvoice() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (!user) {
        router.push("/auth/signin");
      }
    });

    return () => unsubscribe();
  }, [router]);
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "",
    date: "",
    clientName: "",
    clientEmail: "",
    description: "",
    amount: "",
    currency: "usd",
    dueDate: "",
    paymentTerms: "due-on-receipt",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setInvoiceData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (!user) {
        setError("You must be logged in to create an invoice.");
        return;
      }

      const invoiceRef = await addDoc(collection(db, "invoices"), {
        ...invoiceData,
        amount: parseFloat(invoiceData.amount),
        userId: user.uid,
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      setSuccess("Invoice created successfully!");
      setTimeout(() => router.push("/dashboard"), 2000);
    } catch (error) {
      setError("Error creating invoice. Please try again.");
      console.error("Error creating invoice:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <FileText className="h-6 w-6 text-primary mr-2" />
            <h1 className="text-2xl font-semibold text-gray-900">
              SimpleInvoice
            </h1>
          </div>
          <Link href="/dashboard">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Create Invoice Form */}
      <main className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Create New Invoice</CardTitle>
            <CardDescription>
              Fill in the details to generate a new invoice.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="invoiceNumber">Invoice Number</Label>
                  <Input
                    id="invoiceNumber"
                    value={invoiceData.invoiceNumber}
                    onChange={handleInputChange}
                    placeholder="e.g., INV-001"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Invoice Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={invoiceData.date}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name</Label>
                <Input
                  id="clientName"
                  value={invoiceData.clientName}
                  onChange={handleInputChange}
                  placeholder="Enter client name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientEmail">Client Email</Label>
                <Input
                  id="clientEmail"
                  type="email"
                  value={invoiceData.clientEmail}
                  onChange={handleInputChange}
                  placeholder="client@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={invoiceData.description}
                  onChange={handleInputChange}
                  placeholder="Enter invoice description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={invoiceData.amount}
                    onChange={handleInputChange}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={invoiceData.currency}
                    onValueChange={(value) =>
                      setInvoiceData((prev) => ({ ...prev, currency: value }))
                    }
                  >
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD</SelectItem>
                      <SelectItem value="eur">EUR</SelectItem>
                      <SelectItem value="gbp">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={invoiceData.dueDate}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentTerms">Payment Terms</Label>
                <Select
                  value={invoiceData.paymentTerms}
                  onValueChange={(value) =>
                    setInvoiceData((prev) => ({ ...prev, paymentTerms: value }))
                  }
                >
                  <SelectTrigger id="paymentTerms">
                    <SelectValue placeholder="Select payment terms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="due-on-receipt">
                      Due on Receipt
                    </SelectItem>
                    <SelectItem value="net-15">Net 15</SelectItem>
                    <SelectItem value="net-30">Net 30</SelectItem>
                    <SelectItem value="net-60">Net 60</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full" type="submit">
                <FileDown className="mr-2 h-4 w-4" /> Generate Invoice
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
