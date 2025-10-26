import { useState } from 'react';
import { motion } from 'framer-motion';
import { css } from '@emotion/css';
import React from 'react';

interface Props {
    className?: string;
    background?: {
        enabled: string;
        disabled: string;
    }
    ref: React.Ref<HTMLInputElement>
}

export const Toggle: React.FC<Props> = React.forwardRef(({
    className,
    background,
    ...props
}, ref) => {
    const [isChecked, setIsChecked] = useState(false);

    console.log(isChecked);

    const label = css`
        display:flex;
        align-items: center;
        cursor: pointer
        &: > * + * {
            margin-left: 0.75rem; /* 12px */
        }
    `

    const input = css`
        visibility: hidden;
        width: 0;
    `;

    const toggle = css`
        width: 3.5rem;
        height: 2rem;
        border-radius: calc(infinity * 1px);
        background-color: ${(isChecked && background?.enabled)
            ? background.enabled + '!important'
            : background?.disabled + '!important'
                ? '#00c950' : '#d1d5dc'};
    `

    const item = css`
        background-color: #52525c;
        width: 1.50rem;
        height: 1.50rem;
        border-radius: 100%;
        margin-left: .25rem;
        margin-top: .25rem;
    `

    return (
        <label className={label}>
            <input
                ref={ref}
                {...props}
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className={input}
            />
            <div className={`${toggle} ${className}`}>
                <motion.div
                    className={`${item}`}
                    animate={{
                        x: isChecked ? 24 : 0
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 15,
                        mass: 1
                    }}
                    whileTap={{
                        scale: 0.9
                    }}
                />
            </div>
            {/*}
            <motion.span
                className="text-sm font-medium"
                animate={{
                    color: isChecked ? "#10B981" : "#6B7280"
                }}
                transition={{ duration: 0.2 }}
            >
                {isChecked ? 'Вкл' : 'Выкл'}
            </motion.span>
            {*/}
        </label >
    );
});