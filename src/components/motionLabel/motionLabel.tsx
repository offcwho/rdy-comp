import { motion } from "motion/react"

interface Props {
    children: React.ReactNode;
    isFocused: boolean | false;
    value: string | '';
    className?: string;
    color?: string | '#3b82f6';
    background?: string | '#ffffff';
    htmlFor?: string;
}

export const MotionLabel: React.FC<Props> = ({ children, isFocused, value, className, color, background, htmlFor }) => {
    return (
        <motion.label
            htmlFor={htmlFor}
            className={className}
            animate={{
                y: isFocused || value ? -25 : 0,
                scale: isFocused || value ? 0.8 : 1,
                color: isFocused ? color : '#6b7280',
                background: isFocused ? background : 'none'
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {children}
        </motion.label>
    )
}