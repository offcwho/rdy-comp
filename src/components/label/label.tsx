interface Props {
    htmlFor?: string
    className?: string
    children: React.ReactNode
}

export const Label: React.FC<Props> = ({ htmlFor, className, children }) => {
    return (
        <label htmlFor={htmlFor} className={`${className}`}>
            {children}
        </label>
    )
}