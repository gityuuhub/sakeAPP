import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { Header } from './components/header';
import { Menu } from './components/menu';
import { Footer } from './components/footer';
import { MainProvider } from './providers/mainProvider';

import { TsukidashiContent } from './templates/tsukidashiContents';
import { SakenowaContent } from './templates/sakenowaContents';
import { HogehogeContent } from './templates/hogehogeContents';
import { OneCommentAdmin } from './templates/oneCommentAdmin';

export const App: React.FC = () => {
  // 表示フラグをOBJでまとめた
  const [contentsShowFlag, setContentsShowFlag] = useState({
    init: true, // 初期コンテンツエリアの表示フラグ
    stepBar: false, // StepBarの表示フラグ
    areas: false, // 「都道府県から選ぶ」の表示フラグ
    selectFlavor: false, // 「フレーバーから選ぶ」の表示フラグ
    ranking: false, // 「ランキング」の表示フラグ
    searchBrand: false, // 「銘柄から検索」の表示フラグ
  });

  // ステップバーの現在の段階
  const [nowStep, setNowStep] = useState(0);

  // ドロワーメニューの開閉状態
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <MainProvider>
      {/* ヘッダー */}
      <Grid container>
        <Grid item xs={12}>
          <Box component="span" m={5}>
            <Header setDrawerOpen={setDrawerOpen}>さけのわでりあくと</Header>
          </Box>
        </Grid>
        {/* ドロワーメニューとAPI実行 */}
        <Grid item xs={4}>
          <Box component="span" m={1}>
            <Menu
              contentsShowFlag={contentsShowFlag}
              setContentsShowFlag={setContentsShowFlag}
              setNowStep={setNowStep}
              drawerOpen={drawerOpen}
              setDrawerOpen={setDrawerOpen}
            />
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Routes>
            <Route path="/index.html" element={<TsukidashiContent />}></Route>
            <Route
              path="/main"
              element={
                <SakenowaContent
                  contentsShowFlag={contentsShowFlag}
                  setNowStep={setNowStep}
                  nowStep={nowStep}
                />
              }></Route>
            {/* hogehogeメニュー */}
            <Route path="/hogehoge" element={<HogehogeContent />}></Route>
            {/* 管理者メニュー */}
            <Route path="/onecomment" element={<OneCommentAdmin />}></Route>
          </Routes>
        </Grid>
        {/* フッター */}
        <Grid item xs={12}>
          <Box component="span" m={5}>
            <Footer />
          </Box>
        </Grid>
      </Grid>
    </MainProvider>
  );
};
