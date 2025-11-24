import { css } from "@emotion/css";
import { AnimatePresence, motion } from "motion/react"
import { useEffect } from "react";
import { useModal } from "./modal.context";

interface Props {
    id: string;
    onClose?: () => void;
    alwaysOpen?: boolean;
    title: string;
    className: string;
    children: React.ReactNode;
    width?: string;
    background?: string;
    rounded?: string;
    close?: true
}

export const Modal: React.FC<Props> = ({
    id,
    title,
    children,
    className,
    onClose,
    alwaysOpen,
    width,
    background,
    rounded,
    close
}) => {

    const { isModalOpen, closeModal } = useModal();
    const isOpen = isModalOpen(id);

    const handleClose = () => {
        closeModal(id);
        onClose?.();
    };

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                handleClose()
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, id]);

    const modalOverlay = css`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        padding: 20px;
    `;

    const modalContent = css`
        background: ${background || 'white'};
        border-radius: ${rounded || '16px'};
        width: 100%;
        color: #2d3748;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
        overflow: hidden;
        max-height: 90vh;
        overflow-y: auto;
        max-width: ${width || '600px'};
        display: flex;
        flex-direction: column;
    `;

    const modalHeader = css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 25px 30px 0;
        margin-bottom: 40px;
    `;

    const modalTitle = css`
        font-size: 1.6rem;
        margin: 0;
        font-weight: 700;
    `;

    const closeButton = css`
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: #718096;
        transition: all 0.2s ease;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        font-weight: 300;

        &:hover{
            color: #e53e3e;
        }
    `;

    const modalBody = css`
        padding: 0 30px 30px;
        color: #4a5568;
        line-height: 1.7;
        height: 100%;
    `;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={modalOverlay}
                    onClick={handleClose}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className={`${modalContent} ${className}`}
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 300,
                            duration: 0.3
                        }}
                    >
                        <div className={modalHeader}>
                            <h2 className={modalTitle}>{title}</h2>
                            {close && (
                                <motion.button
                                    className={closeButton}
                                    onClick={handleClose}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    &times;
                                </motion.button>
                            )}
                        </div>
                        <div className={modalBody}>
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}