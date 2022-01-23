// グローバルステート管理用プロバイダー
import React, { createContext, useState, ReactNode } from 'react';
// ルーター機能も持たせる

import { BrowserRouter } from 'react-router-dom';

// グローバルステート管理の型定義
// スタブモードの変数とセット関数（useState）

type mainContextType = {
  stubMode: boolean;
  setStubMode: React.Dispatch<React.SetStateAction<boolean>>;
  allBrands: BrandType[];
  setAllBrands: (param: BrandType[]) => void;
  rankings: { [key: string]: number }[];
  setRankings: (param: { [key: string]: number }[]) => void;
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

  // 全銘柄一覧 {name: string, id: number}
  const [allBrands, setAllBrands] = useState<BrandType[]>([]);

  // ランキング一覧
  const [rankings, setRankings] = useState<{ [key: string]: number }[]>([]);

  // 数が多くなったのでvalueの値を変数にいれる
  const value = {
    stubMode,
    setStubMode,
    allBrands,
    setAllBrands,
    rankings,
    setRankings
  }

  // valueの値が子コンポーネントで利用できる
  // ついでにルートに近い位置にルーターも入れておく
  // グローバルスステートをページ単位で作って、ルーターで切り替えるなら、要書き換え
  return (
    <BrowserRouter>
      <MainContext.Provider value={value}>{children}</MainContext.Provider>
    </BrowserRouter>
  );
};
