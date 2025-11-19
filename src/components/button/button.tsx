import { motion } from "framer-motion";
import { Props } from "./button.types";
import { buttonStyle } from "./button.styles";

export const Button: React.FC<Props> = (
    {
        children,
        backgroundColor,
        color,
        radius,
        duration,
        whileTap,
        whileHover,
        className,
        onClick,
        ...props
    }) => {

    return (
        <motion.button
            {...props}
            className={`${buttonStyle.button({ backgroundColor, color, radius })} ${className}`}
            whileTap={{
                scale: 0.90,
                ...whileTap
            }}
            whileHover={{
                ...whileHover
            }}
            transition={{
                duration: duration ? duration : 0.3,
                type: "spring",
                damping: 25,
                stiffness: 300
            }}
            type="submit"
        >
            {children}
        </motion.button>
    )
}