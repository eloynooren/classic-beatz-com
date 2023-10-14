import React, { createContext, useState, useContext } from 'react';
import GoogleAd from "./GoogleAd";

interface DispatcherContextProps {
    active: string | null;
    activate: (id: string) => void;
}

const DispatchContext = createContext<DispatcherContextProps>({
    active: null,
    activate: () => {},
});

interface DispatcherProps {
    children: React.ReactNode;
}

export const Dispatcher: React.FC<DispatcherProps> = ({ children }) => {
    const [active, setActive] = useState<string | null>(null);

    const activate = (id: string) => {
        setActive(id);
    };

    return (
        <DispatchContext.Provider value={{ active, activate }}>
            {children}
        </DispatchContext.Provider>
    );
};

export const useDispatch = () => {
    return useContext(DispatchContext);
};

export default Dispatcher
