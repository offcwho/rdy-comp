"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { SelectCSS } from "./select.styles";
import { color, motion } from "framer-motion";
import { RIconError } from "../../index";

type OptionValue = string;

interface OptionData {
    value: string;
    label: string;
}

interface SelectContextProps {
    open: boolean;
    value: OptionValue | OptionValue[];
    selectedLabels: string[];
    multiple: boolean;
    searchable: boolean;
    query: string;
    chips?: boolean;
    setQuery: (q: string) => void;
    selectOption: (opt: OptionData) => void;
    clear: () => void;
    isSelected: (val: OptionValue) => boolean;
    registerOption: (opt: OptionData) => void;
    options: OptionData[];
}

const SelectContext = createContext<SelectContextProps | null>(null);
export function useSelect() {
    const ctx = useContext(SelectContext);
    if (!ctx) throw new Error("CustomSelectOption must be used inside CustomSelect");
    return ctx;
}

interface SelectProps {
    name?: string;
    value?: string | string[];
    onChange?: (value: string | string[]) => void;
    multiple?: boolean;
    searchable?: boolean;
    placeholder?: string;
    className?: string;
    chips?: boolean;
    clearable?: boolean;
    children: React.ReactNode;
    ref: React.Ref<HTMLSelectElement>;
}


export const Select: React.FC<SelectProps> = React.forwardRef(({
    name,
    value,
    onChange,
    multiple = false,
    chips,
    searchable = false,
    placeholder = "Выберите...",
    className = "",
    clearable = true,
    children,
    ...props
}, ref) => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [options, setOptions] = useState<OptionData[]>([]);
    const rootRef = useRef<HTMLDivElement | null>(null);

    const selectedValues = React.useMemo(() => {
        if (multiple) {
            if (!value) return [] as string[];
            return Array.isArray(value) ? value : [value];
        }
        return value ? [value as string] : [];
    }, [value, multiple]);

    const selectedLabels = React.useMemo(() => {
        return options
            .filter((opt) => selectedValues.includes(opt.value))
            .map((opt) => opt.label);
    }, [options, selectedValues]);

    const registerOption = (opt: OptionData) => {
        setOptions((prev) => {
            if (!prev.find((o) => o.value === opt.value)) {
                return [...prev, opt];
            }
            return prev;
        });
    };

    const toggle = () => setOpen((s) => !s);

    const selectOption = (opt: OptionData) => {
        if (multiple) {
            const exists = selectedValues.includes(opt.value);
            const next = exists
                ? selectedValues.filter((v) => v !== opt.value)
                : [...selectedValues, opt.value];
            onChange?.(next);
        } else {
            onChange?.(opt.value);
            setOpen(false);
        }
    };

    const clear = () => {
        if (multiple) onChange?.([]);
        else onChange?.("");
        setQuery("");
    };

    const isSelected = (val: OptionValue) => selectedValues.includes(val);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!rootRef.current) return;
            if (!rootRef.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <SelectContext.Provider
            value={{
                open,
                multiple,
                searchable,
                query,
                setQuery,
                selectOption,
                clear,
                isSelected,
                value: value ?? "",
                selectedLabels,
                registerOption,
                options,
                chips,
            }}
        >
            {/* for react-hook-form */}
            <select
                ref={ref}
                {...props}
                multiple={multiple}
                hidden
            >
                {!multiple ? (
                    selectedValues[0]
                ) : (
                    selectedValues.map((item, index) => (
                        <option value={item} key={index}></option>
                    ))
                )}
            </select>

            {/*Pinsil */}
            <div ref={rootRef} className={`relative ${className}`}>
                {/* Select */}
                <div
                    onClick={toggle}
                    className={SelectCSS.select()}
                >
                    {chips ? (
                        <ul className={SelectCSS.selectList()}>
                            {selectedLabels.length === 0 ? (
                                placeholder
                            ) : (
                                selectedLabels.map((item, index) => (
                                    <li key={index} className={SelectCSS.selectShip()}>{item}</li>
                                ))
                            )}
                        </ul>
                    ) : (
                        <span className={SelectCSS.selectValue()}>
                            {selectedLabels.length === 0 ? (
                                placeholder
                            ) : multiple ? (
                                selectedLabels.join(", ")
                            ) : (
                                selectedLabels[0]
                            )}
                        </span>
                    )}


                    <div className={SelectCSS.clear()}>
                        {clearable && selectedLabels.length > 0 && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    clear();
                                }}
                                className={SelectCSS.clearButton()}
                                aria-label="Очистить"
                            >
                                <RIconError
                                    size={20}
                                    color="#cdcccc"
                                />
                            </button>
                        )}
                        <motion.svg
                            animate={
                                open ? { rotate: 180 } : ''
                            }
                            transition={{
                                type: 'spring',
                                duration: .3,
                            }}
                            className={SelectCSS.arrow()}
                            viewBox="0 0 20 20"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                d="M6 8l4 4 4-4"
                                strokeWidth={1.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </motion.svg>
                    </div>
                </div>

                {/* Options */}
                {open && (
                    <motion.div
                        className={SelectCSS.poppup()}
                        initial={{
                            opacity: 0,
                            height: 0,
                        }}
                        animate={{
                            opacity: 1,
                            height: 'auto',
                        }}
                        transition={{
                            duration: .3,
                            type: 'spring',
                            damping: 25,
                            stiffness: 300
                        }}
                    >
                        {searchable && (
                            <div className={SelectCSS.search()}>
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Поиск..."
                                    className={SelectCSS.searchInput()}
                                    autoFocus
                                />
                            </div>
                        )}

                        <div className={SelectCSS.options()}>{children}</div>
                    </motion.div>
                )}
            </div>
        </SelectContext.Provider>
    );
});
