// グローバルステート管理用プロバイダー
import React, { createContext, useState, ReactNode } from 'react';
// ルーター機能も持たせる

import { BrowserRouter } from 'react-router-dom';

// グローバルステート管理の型定義
// スタブモードの変数とセット関数（useState）

type mainContextType = {
  stubMode: boolean;
  setStubMode: React.Dispatch<React.SetStateAction<boolean>>;
};

type PropsType = {
  children: ReactNode;
};

// こいつを子コンポーネントでimportして利用する
export const MainContext = createContext({} as mainContextType);

// こいつは親コンポーネントで入れておく
export const MainProvider: React.FC<PropsType> = (props: any) => {
  const { children } = props;

  // スタブモードのフラグ管理
  const [stubMode, setStubMode] = useState(true);

  // valueの値が子コンポーネントで利用できる
  // ついでにルートに近い位置にルーターも入れておく
  // グローバルスステートをページ単位で作って、ルーターで切り替えるなら、要書き換え
  return (
    <BrowserRouter>
      <MainContext.Provider value={{ stubMode, setStubMode }}>{children}</MainContext.Provider>
    </BrowserRouter>
  );
};
