"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { getBusinessTransactions } from "@/lib/business";

// Define the type for a transaction
interface Transaction {
  id: string;
  name: string;
  status: string;
  priority: string;
}

// Define the context type
interface TransactionsContextType {
  transactions: Transaction[];
  refreshTransactions: () => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextType | null>(null);

export function useTransactions() {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error(
      "useTransactions must be used within a TransactionsProvider",
    );
  }
  return context;
}

// export function TransactionsProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [transactions, setTransactions] = useState<Transaction[]>([]);

//   const refreshTransactions = async () => {
//     const fetchedTransactions = await getBusinessTransactions();
//     setTransactions(fetchedTransactions || []);
//   };

//   useEffect(() => {
//     refreshTransactions();
//   }, []);

//   return (
//     <TransactionsContext.Provider value={{ transactions, refreshTransactions }}>
//       {children}
//     </TransactionsContext.Provider>
//   );
// }
