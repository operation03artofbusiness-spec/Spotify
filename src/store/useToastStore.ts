'use client';

import { create } from 'zustand';

interface Toast {
  id: number;
  message: string;
}

interface ToastState {
  toasts: Toast[];
  pushToast: (message: string) => void;
  removeToast: (id: number) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  pushToast: (message) =>
    set((state) => ({
      toasts: [...state.toasts, { id: Date.now(), message }]
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id)
    }))
}));
