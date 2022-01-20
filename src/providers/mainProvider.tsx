// グローバルステート管理用プロバイダー
// ルーター機能も持たせる
import { createContext, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

type mainContextType = {
  stubMode: boolean;
  setStubMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MainContext = createContext({} as mainContextType);

export const MainProvider = (props: any) => {
  const { children } = props;

  // スタブモードのフラグ管理
  const [stubMode, setStubMode] = useState(true);

  return (
    <BrowserRouter>
      <MainContext.Provider value={{ stubMode, setStubMode }}>{children}</MainContext.Provider>;
    </BrowserRouter>
  );
};
