import React, { useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from '../api-client';

type ToastMessage = {
    message: string;
    type: "SUCCESS" | "ERROR";
}

type AppContext = {
    showToast: (toastMessage: ToastMessage) => void;
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
}

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const { isError } = useQuery("validateToken", apiClient.validateToken, {
        retry: false,
        onSuccess: () => setIsLoggedIn(true),
        onError: () => setIsLoggedIn(false),
    });

    return (
        <AppContext.Provider value={
            { showToast: (message) => setToast(message), isLoggedIn, setIsLoggedIn }
        }>
            {toast &&
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onclose={() => setToast(undefined)} />}
            {children}
        </AppContext.Provider>
    )
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    return context as AppContext;
}