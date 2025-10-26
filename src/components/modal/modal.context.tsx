import { createContext, useContext, useState } from "react";

interface ModalContextType {
    openModal: (id: string) => void;
    closeModal: (id: string) => void;
    isModalOpen: (id: string) => boolean;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
    const context = useContext(ModalContext)
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }

    return context;
};

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [openModals, setOpenModals] = useState<Set<string>>(new Set());

    const openModal = (id: string) => {
        setOpenModals(prev => new Set(prev).add(id));
    };

    const closeModal = (id: string) => {
        setOpenModals(prev => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
        });
    };

    const isModalOpen = (id: string) => {
        return openModals.has(id);
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal, isModalOpen }}>
            {children}
        </ModalContext.Provider>
    );
};