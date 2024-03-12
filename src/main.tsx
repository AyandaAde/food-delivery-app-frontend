import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.css'
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './AppRoutes';
import { ClerkProvider } from '@clerk/clerk-react';
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "@/components/ui/sonner";
import { Provider } from 'react-redux';
import { store } from './store';

//* Clerk publishable key import
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <Provider store={store}>
            <AppRoutes />
            <Toaster visibleToasts={1} richColors />
          </Provider>
        </ClerkProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode >,
)
