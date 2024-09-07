import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';

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

interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: UserOptions) => void;
  lastAutoTable: {
    finalY: number;
  };
}

export const generateInvoicePDF = (invoiceData: InvoiceData) => {
    const pdf = new jsPDF() as jsPDFWithAutoTable;
  
    // Warna tema
    const primaryColor = [41, 128, 185];
    const secondaryColor = [52, 73, 94];
  
    // Fungsi untuk mendapatkan simbol mata uang
    const getCurrencySymbol = (currency: string) => {
      switch (currency.toLowerCase()) {
        case 'usd': return '$';
        case 'eur': return '€';
        case 'gbp': return '£';
        default: return currency.toUpperCase();
      }
    };
  
    // Fungsi untuk menghitung tanggal jatuh tempo
    const calculateDueDate = (date: string, paymentTerms: string) => {
      const invoiceDate = new Date(date);
      switch (paymentTerms) {
        case 'due-on-receipt':
          return invoiceDate.toISOString().split('T')[0];
        case 'net-15':
          invoiceDate.setDate(invoiceDate.getDate() + 15);
          break;
        case 'net-30':
          invoiceDate.setDate(invoiceDate.getDate() + 30);
          break;
        case 'net-60':
          invoiceDate.setDate(invoiceDate.getDate() + 60);
          break;
      }
      return invoiceDate.toISOString().split('T')[0];
    };
  
    // Header
    pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    pdf.rect(0, 0, pdf.internal.pageSize.width, 40, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.text('INVOICE', 20, 30);
  
    // Informasi invoice
    pdf.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    pdf.setFontSize(12);
    pdf.text(`Invoice Number: ${invoiceData.invoiceNumber}`, 20, 60);
    pdf.text(`Date: ${invoiceData.date}`, 20, 70);
    pdf.text(`Due Date: ${calculateDueDate(invoiceData.date, invoiceData.paymentTerms)}`, 20, 80);
  
    // Informasi klien
    pdf.setFontSize(14);
    pdf.text('Bill To:', 20, 100);
    pdf.setFontSize(12);
    pdf.text(invoiceData.clientName, 20, 110);
    pdf.text(invoiceData.clientEmail, 20, 120);
  
    // Deskripsi dan jumlah
    const currencySymbol = getCurrencySymbol(invoiceData.currency);
    pdf.autoTable({
      startY: 140,
      head: [['Description', 'Amount']],
      body: [
        [invoiceData.description, `${currencySymbol}${invoiceData.amount.toFixed(2)}`]
      ],
      theme: 'striped',
      headStyles: { fillColor: primaryColor as [number, number, number], textColor: [255, 255, 255] },
      styles: { halign: 'center' },
      columnStyles: {
        0: { cellWidth: 130 },
        1: { cellWidth: 60 }
      }
    });
  
    // Total
    const finalY = pdf.lastAutoTable.finalY || 140;
    pdf.setFontSize(14);
    pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    pdf.text(`Total: ${currencySymbol}${invoiceData.amount.toFixed(2)}`, 150, finalY + 20);
  
    // Status
    pdf.setFontSize(16);
    const statusColor = invoiceData.status === 'Paid' ? [46, 204, 113] : [231, 76, 60];
    pdf.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
    pdf.text(invoiceData.status.toUpperCase(), 150, finalY + 40);
  
    // Footer
    pdf.setFontSize(10);
    pdf.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    pdf.text('Thank you for your business!', 105, 280, { align: 'center' });
  
    return pdf;
  };
