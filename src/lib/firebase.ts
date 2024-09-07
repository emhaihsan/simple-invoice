import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, query, orderBy, limit, getDocs , where, doc, updateDoc, getDoc, addDoc} from "firebase/firestore";
import {generateInvoicePDF} from './pdfGenerator';

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  clientName: string;
  clientEmail: string;
  description: string;
  amount: number;
  currency: string;
  paymentTerms: string;
  status: string;
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export const getRecentInvoices = async (userId: string, limitCount = 5) => {
  const q = query(
    collection(db, "invoices"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
    limit(limitCount)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getInvoiceStats = async (userId: string) => {
  const q = query(collection(db, "invoices"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  
  let totalInvoices = 0;
  let totalRevenue = 0;
  let pendingInvoices = 0;
  let paidInvoices = 0;
  let overdueInvoices = 0;
  const customers = new Set();

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    totalInvoices++;
    totalRevenue += data.amount;
    if (data.status === "Pending") pendingInvoices++;
    if (data.status === "Paid") paidInvoices++;
    if (data.status === "Overdue") overdueInvoices++;
    customers.add(data.clientName);
  });

  return { 
    totalInvoices, 
    totalRevenue, 
    pendingInvoices, 
    paidInvoices, 
    overdueInvoices, 
    totalCustomers: customers.size 
  };
};

export const updateInvoiceStatus = async (invoiceId: string, newStatus: string) => {
  const invoiceRef = doc(db, "invoices", invoiceId);
  await updateDoc(invoiceRef, {
    status: newStatus
  });
};

function isInvoiceData(data: unknown): data is InvoiceData {
  return (
    typeof data === 'object' &&
    data !== null && 
    'invoiceNumber' in data && 
    typeof (data as InvoiceData).invoiceNumber === 'string' &&
    'date' in data && 
    typeof (data as InvoiceData).date === 'string' &&
    'dueDate' in data && 
    typeof (data as InvoiceData).dueDate === 'string' &&
    'clientName' in data && 
    typeof (data as InvoiceData).clientName === 'string' &&
    'clientEmail' in data && 
    typeof (data as InvoiceData).clientEmail === 'string' &&
    'description' in data && 
    typeof (data as InvoiceData).description === 'string' &&
    'amount' in data && 
    typeof (data as InvoiceData).amount === 'number' &&
    'currency' in data && 
    typeof (data as InvoiceData).currency === 'string' &&
    'paymentTerms' in data && 
    typeof (data as InvoiceData).paymentTerms === 'string' &&
    'status' in data && 
    typeof (data as InvoiceData).status === 'string'
  );
}

export const generateAndDownloadInvoicePDF = async (invoiceId: string) => {
  const invoiceRef = doc(db, "invoices", invoiceId);
  const invoiceSnap = await getDoc(invoiceRef);

  if (invoiceSnap.exists()) {
    const data = invoiceSnap.data();
    if (isInvoiceData(data)) {
      const pdf = generateInvoicePDF(data);
      pdf.save(`invoice_${data.invoiceNumber}.pdf`);
    } else {
      console.error("Data tidak sesuai dengan format InvoiceData");
    }
  } else {
    console.error("Invoice not found");
  }
};

export const createInvoice = async (invoiceData: InvoiceData, userId: string) => {
  try {
    const invoicesRef = collection(db, "invoices");
    const newInvoiceData = {
      ...invoiceData,
      userId,
      createdAt: new Date(),
      status: "Pending"
    };
    const docRef = await addDoc(invoicesRef, newInvoiceData);
    return docRef.id;
  } catch (error) {
    console.error("Error creating invoice:", error);
    throw error;
  }
};