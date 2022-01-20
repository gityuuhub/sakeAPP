import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
// route v5に下げて利用中。v6の記述になおしたい

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { Header } from './components/header';
import { Menu } from './components/menu';
import { StepBar } from './components/stepBar';
import { InitContents } from './components/initContents';
import { Footer } from './components/footer';
import { SelectArea } from './components/SelectArea';
import { RankingArea } from './components/RankingArea';
import { SelectFlavor } from './components/SelectFlavor';
import { MainProvider } from './providers/mainProvider';

export const App: React.FC = () => {
  // 表示フラグをOBJでまとめた
  const [contentsShowFlag, setContentsShowFlag] = useState({
    init: true, // 初期コンテンツエリアの表示フラグ
    stepBar: false, // StepBarの表示フラグ
    areas: false, // 「都道府県から選ぶ」の表示フラグ
    selectFlavor: false, // 「フレーバーから選ぶ」の表示フラグ
    ranking: false, // 「ランキング」の表示フラグ
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
        {/* ステップバーとコンテンツを別ファイルにまとめてページ化したい */}
        {/* initContentsは/で別パス切るかな */}
        {/* ステップバー */}
        <Switch>
          <Route exact path="/main">
            <Grid item xs={8}>
              <Box
                component="span"
                m={1}
                style={{ display: contentsShowFlag.stepBar ? '' : 'none' }}
              >
                <StepBar nowStep={nowStep} />
              </Box>
              {/* コンテンツ配置 */}
              <Box component="span" m={1} style={{ display: contentsShowFlag.init ? '' : 'none' }}>
                <div>
                  <InitContents />
                </div>
              </Box>
              {contentsShowFlag.areas && <SelectArea setNowStep={setNowStep} />}
              {contentsShowFlag.selectFlavor && <SelectFlavor setNowStep={setNowStep} />}
              {contentsShowFlag.ranking && <RankingArea />}
            </Grid>
          </Route>
          {/* DBメニュー */}
          <Route exact path="/database">
            <h1>てすと</h1>
          </Route>
        </Switch>
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
