import React, { useContext } from 'react';

const Appcontext = React.createContext();

const AppProvider = ({ children }) => {
    return <Appcontext.Provider value={'hello'}>{children}</Appcontext.Provider>;
};

export const useGlobalContext = () => {
    return useContext(AppProvider);
};

export { Appcontext, AppProvider };
