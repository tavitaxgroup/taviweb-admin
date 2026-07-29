"use client";
import { Toaster } from 'react-hot-toast';

export function ToastProvider() {
  return <Toaster position="top-right" toastOptions={{
      duration: 3000,
      style: {
        background: '#fff',
        color: '#334155',
        fontWeight: 'bold',
        borderRadius: '16px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        padding: '16px 24px',
      },
      success: {
        iconTheme: {
          primary: '#4f46e5', // indigo-600
          secondary: '#fff',
        },
      },
  }} />;
}
