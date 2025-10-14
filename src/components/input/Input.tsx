'use client'

import React, { useState } from 'react';
import { motion } from "motion/react"
import { Label } from '../../index'
import { MotionLabel } from '../../index';

import './input.css'

interface Props {
    type?: "text" | "password" | "email" | "number" | "search";
    placeholder?: string | "";
    className?: string;
    id?: string;
    label?: string;
    error?: string;
    ref?: React.Ref<HTMLInputElement>;
}

export const Input: React.FC<Props> = React.forwardRef((
    {
        type,
        placeholder = "",
        className,
        id,
        label,
        error,
        ...props
    }, ref) => {

    const [isFocused, setIsFocused] = useState(false)
    const [value, setValue] = useState('');

    return (
        <div className="relative">
            <motion.label
                htmlFor={id}
                className={`absolute left-3 pointer-events-none transition-colors ${isFocused || value ? 'text-blue-500' : 'text-gray-400'
                    }`}
                initial={{ y: 0, fontSize: '16px' }}
                animate={{
                    y: isFocused || value ? -25 : 0,
                    fontSize: isFocused || value ? '14px' : '16px'
                }}
                transition={{ duration: 0.2 }}
            >
                {label}
            </motion.label>
            <motion.input
                id={id}
                ref={ref}
                {...props}
                className="input-floating"
                animate={{
                    borderColor: isFocused ? "#3B82F6" : "#D1D5DB",
                    backgroundColor: isFocused ? "rgba(59, 130, 246, 0.05)" : "white"
                }}
                transition={{ duration: 0.2 }}
                onFocus={(e) => {
                    setIsFocused(true)
                }}
                onBlur={(e) => {
                    setIsFocused(false)
                }}
            />
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
});