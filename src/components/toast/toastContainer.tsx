import { css } from "@emotion/css";
import { motion, AnimatePresence } from "framer-motion";
import { RIconSuccess } from "../../index";
import { RIconWarning } from "../../index";
import { RIconError } from "../../index";

interface ToastContainerProps {
    toasts: { id: number; title: string; message?: string; icon?: React.ReactNode, type?: string }[];
    removeToast: (id: number) => void;
}

export default function ToastContainer({ toasts, removeToast }: ToastContainerProps) {

    const container = css`
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        z-index: 50;
        width: 100%;
        max-width: 360px;
    `

    const style = (type?: string) => css`
        display: flex;
        align-items: center;
        background-color: ${type === "success" ? 'color-mix(in oklab,hsl(145.96 79.46% 43.92%/1)20%,transparent)'
            : type === "error"
                ? 'color-mix(in oklab, hsl(0deg 90% 60.78%) 20%, transparent)'
                : type === "warning"
                    ? 'color-mix(in oklab, hsl(37.01 91.26% 64.12%/1)20%,transparent)'
                    : ''}; 
        border: 1px solid hsl(146.2 79.78% 17.45%);
        border-width: 1px;
        border-style: solid;
        border-color: ${type === "success" ? 'hsl(146.2 79.78% 17.45%)'
            : type === "error" ? 'hsl(0deg 90% 60.78%)'
                : type === "warning" ? 'hsl(37.01 91.26% 64.12%)'
                    : ''
        };
        color: ${type === "success" ? 'hsl(145.96 79.46% 43.92%)'
            : type === "error" ? 'hsl(0deg 90% 60.78%)'
                : type === "warning" ? 'hsl(37.01 91.26% 64.12%)'
                    : ''
        };;
        max-width: 360px;
        width: 100%;
        &:not(:last-child) {
            margin-bottom: .5rem
        }
    `

    const icon = css`
        padding-right: 1rem;
    `


    return (
        <div className={container}>
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        className={`${style(toast.type)} px-4 py-3 rounded-2xl shadow-md text-white ${toast.type === "success"
                            ? "bg-green-500"
                            : toast.type === "error"
                                ? "bg-red-500"
                                : toast.type === "warning"
                                    ? "bg-yellow-500"
                                    : "bg-blue-500"
                            }`}
                        onClick={() => removeToast(toast.id)}
                    >
                        {toast.icon ? (
                            <div className={icon}>
                                {toast.icon}
                            </div>
                        ) : toast.type && (
                            <div className={icon}>
                                {toast.type === 'success' ? <RIconSuccess size="35px" />
                                    : toast.type === 'warning' ? <RIconWarning size="35px" />
                                        : toast.type === 'error' && <RIconError size={35} />
                                }
                            </div>
                        )}
                        <div className="">
                            <h5>{toast.title}</h5>
                            {toast.message && (
                                <p>{toast.message}</p>
                            )}
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
