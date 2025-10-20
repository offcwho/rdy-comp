'use client'

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react";
import { AlertCSS } from "./alert.styles";
import { Props } from "./alert.types";

export const Alert: React.FC<Props> = ({ message, error, success, alert }) => {

    const [isMessage, setIsMessage] = useState<string | undefined>('');
    const [isHover, setIsHover] = useState(false)

    useEffect(() => {
        setIsMessage(message);
    }, [message]);

    const handleDoubleClick = () => {
        setIsMessage('')
    }

    return (
        <AnimatePresence>
            {isMessage && (
                <motion.li
                    onHoverStart={() => setIsHover(true)}
                    onHoverEnd={() => setIsHover(false)}
                    onDoubleClick={handleDoubleClick}
                    whileHover={{
                        scale: 1.02
                    }}
                    initial={{ opacity: 0, scale: 0.9, y: 0 }}
                    animate={{ opacity: 1, scale: 1, y: [0, -50, 10, -20, 0] }}
                    exit={{ opacity: 0, y: -100, scale: 0.9 }}
                    drag='y'
                    transition={{ duration: .4 }}
                    dragTransition={{
                        bounceStiffness: 600,
                        bounceDamping: 10
                    }}
                    dragConstraints={{
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                    }}
                    dragElastic={0.04}
                    className={AlertCSS.item({ error, success, alert })}
                >
                    <h2 className={AlertCSS.type}>Success</h2>
                    <p className={AlertCSS.description}>
                        {message}
                    </p>
                    <AnimatePresence>
                        {isHover && (
                            <motion.span
                                className={AlertCSS.span}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: .3 }}
                                exit={{ opacity: 0 }}
                            >
                                Double click to hide!
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.li>
            )}
        </AnimatePresence >
    )
}