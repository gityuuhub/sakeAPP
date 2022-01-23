// グローバルステート管理用プロバイダー
import React, { createContext, useState, ReactNode } from 'react';
// ルーター機能も持たせる

import { BrowserRouter } from 'react-router-dom';

// グローバルステート管理の型定義
// スタブモードの変数とセット関数（useState）

type mainContextType = {
  stubMode: boolean;
  setStubMode: React.Dispatch<React.SetStateAction<boolean>>;
  prefectures: Area[];
  setPrefectures: (param: Area[]) => void;
  flavorTags: FlavorTag[];
  setFlavorTags: (param: FlavorTag[]) => void;
  allBrands: BrandType[];
  setAllBrands: (param: BrandType[]) => void;
  rankings: Ranking[];
  setRankings: (param: Ranking[]) => void;
};

type PropsType = {
  children: ReactNode;
};

// こいつを子コンポーネントでimportして利用する
export const MainContext = createContext({} as mainContextType);

// こいつは親コンポーネントで入れておく
export const MainProvider: React.FC<PropsType> = (props: PropsType) => {
  const { children } = props;

  // スタブモードのフラグ管理
  const [stubMode, setStubMode] = useState(true);

  // APIで取得してきた都道府県を挿入
  // 配列をpropsで渡しても元値を上書きできないのでuseState使う
  // 都道府県idと都道府県名をOBJ化
  const [prefectures, setPrefectures] = useState<Area[]>([]);

  // フレーバータグ一覧  {"id": number, "tag": string}
  const [flavorTags, setFlavorTags] = useState<FlavorTag[]>([]);

  // 全銘柄一覧 {name: string, id: number}
  const [allBrands, setAllBrands] = useState<BrandType[]>([]);

  // ランキング一覧
  const [rankings, setRankings] = useState<Ranking[]>([]);

  // 数が多くなったのでvalueの値を変数にいれる
  const value = {
    stubMode,
    setStubMode,
    prefectures,
    setPrefectures,
    flavorTags,
    setFlavorTags,
    allBrands,
    setAllBrands,
    rankings,
    setRankings,
  };

  // valueの値が子コンポーネントで利用できる
  // ついでにルートに近い位置にルーターも入れておく
  // グローバルスステートをページ単位で作って、ルーターで切り替えるなら、要書き換え
  return (
    <BrowserRouter>
      <MainContext.Provider value={value}>{children}</MainContext.Provider>
    </BrowserRouter>
  );
};
