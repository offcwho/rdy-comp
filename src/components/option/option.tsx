"use client";

import React, { useEffect } from "react";
import { useRdySelect } from "../../index";
import { OptionCSS } from "./option.styles";
import { RSelectIcon } from "../../index";

interface OptionProps {
    value: string;
    label: string;
    children: React.ReactNode;
    disabled?: boolean;
}

export function Option({ value, label, children, disabled = false }: OptionProps) {
    const { isSelected, selectOption, searchable, query, registerOption } = useRdySelect();

    useEffect(() => {
        registerOption({ value, label });
    }, [value, label, registerOption]);

    const visible = !searchable || label.toLowerCase().includes(query.toLowerCase());
    if (!visible) return null;

    return (
        <div
            role="option"
            aria-selected={isSelected(value)}
            onClick={() => !disabled && selectOption({ value, label })}
            className={`${OptionCSS.option(disabled)}`}
        >
            <div className="">
                {children}
            </div>
            <div className="">
                {isSelected(value) ? (
                    <RSelectIcon size={20} />
                ) : ''}
            </div>
        </div>
    );
}
