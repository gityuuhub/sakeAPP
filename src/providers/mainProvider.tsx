// グローバルステート管理用プロバイダー
import { createContext, useState } from 'react';

type mainContextType = {
  stubMode: boolean;
  setStubMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MainContext = createContext({} as mainContextType);

export const MainProvider = (props: any) => {
  const { children } = props;

  // スタブモードのフラグ管理
  const [stubMode, setStubMode] = useState(true);

  return <MainContext.Provider value={{ stubMode, setStubMode }}>{children}</MainContext.Provider>;
};
