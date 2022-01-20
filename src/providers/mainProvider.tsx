// グローバルステート管理用プロバイダー

// ルーター機能も持たせる
import React, { createContext, useState, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
type mainContextType = {
  stubMode: boolean;
  setStubMode: React.Dispatch<React.SetStateAction<boolean>>;
};

type PropsType = {
  children: ReactNode
}

export const MainContext = createContext({} as mainContextType);

export const MainProvider: React.FC<PropsType> = (props: any) => {
  const { children } = props;

  // スタブモードのフラグ管理
  const [stubMode, setStubMode] = useState(true);

  return (
    <MainContext.Provider value={{ stubMode, setStubMode }}>
      {children}
    </MainContext.Provider>
  );
};
