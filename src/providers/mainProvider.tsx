// グローバルステート管理用プロバイダー
// ルーター機能も持たせる
import { createContext, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

// グローバルステート管理の型定義
// スタブモードの変数とセット関数（useState）
type mainContextType = {
  stubMode: boolean;
  setStubMode: React.Dispatch<React.SetStateAction<boolean>>;
};

// こいつを子コンポーネントでimportして利用する
export const MainContext = createContext({} as mainContextType);

// こいつは親コンポーネントで入れておく
export const MainProvider = (props: any) => {
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
