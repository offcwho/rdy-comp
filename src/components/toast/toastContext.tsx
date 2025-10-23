"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import ToastContainer from "./toastContainer";

interface Toast {
    id: number;
    title: string;
    message?: string;
    icon?: React.ReactNode;
    type?: "success" | "error" | "info" | "warning";
}

interface ToastProps {
    title: string;
    message?: string;
    icon?: React.ReactNode;
    type?: "success" | "error" | "info" | "warning";
}

interface ToastContextType {
    toasts: Toast[];
    showToast: ({ title, message, icon, type }: ToastProps) => void;
    removeToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = ({ title, message, icon, type = 'info' }: ToastProps) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, title, message, icon, type }]);
        setTimeout(() => removeToast(id), 4000);
        console.log('qwe')
    };

    const removeToast = (id: number) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error("useToast must be used within ToastProvider");
    return context;
};