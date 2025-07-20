// src/types/index.ts

export interface User {
  email: string;
  token: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface ExpenseSummary {
  categoryId: number;
  categoryName: string;
  total: number;
  count: number;
}

export interface ExpenseDetail {
  id: number;
  categoryId: number;
  description: string;
  amount: number;
  date: string;
}

export interface Goal {
  id: number;
  targetAmount: number;
  month: number;
  year: number;
}