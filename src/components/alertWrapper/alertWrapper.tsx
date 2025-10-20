
import { css } from "@emotion/css"
import { AnimatePresence, motion } from "framer-motion"
import { AlertWrapperCSS } from "./alertWrapper.styles"

interface Props {
    children: React.ReactNode
    width?: number
}

export const AlertWrapper: React.FC<Props> = ({ children, width }) => {



    return (
        <AnimatePresence>
            <div className={AlertWrapperCSS.wrapper}>
                <motion.ul className={AlertWrapperCSS.alerts}>
                    {children}
                </motion.ul>
            </div>
        </AnimatePresence >
    )
}