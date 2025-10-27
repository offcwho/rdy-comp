export interface Props {
    children: React.ReactNode;
    backgroundColor?: string;
    color?: string;
    radius?: number;
    duration?: number;
    whileTap?: {};
    whileHover?: {};
    className?: string;
    onClick?: () => void;
}