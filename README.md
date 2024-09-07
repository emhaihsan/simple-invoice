# SimpleInvoice

SimpleInvoice is a modern, user-friendly invoice generation application built with Next.js, Firebase, and Tailwind CSS. It allows users to create, manage, and download professional invoices quickly and easily.

## Features

- User authentication with Google Sign-In
- Dashboard with invoice statistics
- Create and manage invoices
- Generate and download invoice PDFs
- Responsive design for desktop and mobile devices

## Technologies Used

- Next.js 14
- React 18
- Firebase (Authentication and Firestore)
- Tailwind CSS
- TypeScript
- Lucide React for icons
- jsPDF and jsPDF-AutoTable for PDF generation

## Getting Started

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/simple-invoice.git
   cd simple-invoice
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up Firebase:

   - Create a new Firebase project at https://console.firebase.google.com/
   - Enable Google Sign-In in the Authentication section
   - Create a Firestore database
   - Copy your Firebase configuration

4. Create a `.env.local` file in the root directory and add your Firebase configuration:

   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

5. Run the development server:

   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
