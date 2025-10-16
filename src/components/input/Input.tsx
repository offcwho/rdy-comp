'use client'

import React, { useState, useEffect } from 'react';
import { motion } from "motion/react"
import { css } from '@emotion/css';

interface Props {
    type?: "text" | "password" | "email" | "number" | "search";
    placeholder?: string | "";
    className?: string;
    id: string;
    label?: string;
    error?: string;
    bordered?: {
        onFocus?: string,
        onBlur?: string,
    }
    rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full" | boolean;
    backgroundColor?: {
        onFocus?: string,
        onBlur?: string,
    };
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
        bordered,
        rounded,
        backgroundColor,
        value: externalValue,
        onChange: externalOnChange,
        ...props
    }, ref) => {

    const [isFocused, setIsFocused] = useState(false)
    const [internalValue, setInternalValue] = useState(externalValue || '');

    // Синхронизация внутреннего состояния с внешним значением
    useEffect(() => {
        if (externalValue !== undefined) {
            setInternalValue(externalValue);
        }
    }, [externalValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInternalValue(newValue);

        // Вызов внешнего обработчика, если он передан
        if (externalOnChange) {
            externalOnChange(e);
        }
    };

    const containerStyles = css`
        position: relative;
    `;

    const labelStyles = css`
        position: absolute;
        left: calc(.25rem * 3);
        top: 0;
        bottom: 0;
        margin: auto 0;
        display: flex;
        align-items: center;
    `;

    const inputStyles = css`
        width: 100%;
        border-style: solid;
        border-width: 1px;
        border-radius: ${(rounded === 'sm')
            ? '.15rem'
            : (rounded === 'md')
                ? '.25rem'
                : (rounded === 'lg')
                    ? '.35rem'
                    : (rounded === 'xl')
                        ? '.45rem'
                        : (rounded === '2xl')
                            ? '.55rem'
                            : (rounded === '3xl')
                                ? '.65rem'
                                : (rounded === 'full')
                                    ? '100%'
                                    : (rounded === 'none') && 'none'
        };
        padding-inline: .75rem;
        padding-block: .50rem;

        &:focus{
            outline: none
        }
    `

    const pStyles = css`
        color: #f31266ff;
        font-size: 10px;
        margin-top: .1rem;
        font-weight: 200;
    `

    return (
        <div>
            <div className={containerStyles}>
                <motion.label
                    htmlFor={id}
                    className={labelStyles}
                    initial={{ y: 0, fontSize: '16px' }}
                    animate={{
                        y: isFocused || internalValue ? -31 : 0,
                        left: isFocused || internalValue ? '.25rem' : '.75rem',
                        fontSize: isFocused || internalValue ? '13px' : '14px',
                        color: error ? 'rgba(243, 18, 102, 1)'
                            : isFocused || internalValue
                                ? '#5c5c5c'
                                : '#9c9c9c',
                    }}
                    transition={{
                        duration: 0.15,
                        ease: "easeInOut",
                    }}
                >
                    {label}
                </motion.label>
                <motion.input
                    id={id}
                    ref={ref}
                    type={type}
                    {...props}
                    className={`${inputStyles} ${className || ''}`}
                    value={internalValue}
                    animate={{
                        x: error ? [0, -10, 10, -10, 10, 0] : 0,
                        borderColor: error
                            ? 'rgba(243, 18, 102, 1)'
                            : (bordered && isFocused)
                                ? bordered.onFocus
                                : (bordered && !isFocused)
                                    ? bordered.onBlur
                                    : isFocused
                                        ? '#609dffff'
                                        : 'rgba(209, 213, 219, 1)',
                        backgroundColor: error
                            ? 'rgba(255, 0, 0, 0.05)'
                            : (backgroundColor && isFocused)
                                ? backgroundColor.onFocus
                                : (backgroundColor && !isFocused)
                                    ? backgroundColor.onBlur
                                    : isFocused
                                        ? '#111111ff'
                                        : 'black',
                        color: error
                            ? 'rgba(243, 18, 102, 1)'
                            : '#fff'
                    }}
                    transition={{
                        duration: 0.15,
                        ease: "easeInOut",
                    }}
                    onChange={handleChange}
                    onFocus={() => {
                        setIsFocused(true)
                    }}
                    onBlur={() => {
                        setIsFocused(false)
                    }}
                />
            </div>
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={pStyles}
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
});