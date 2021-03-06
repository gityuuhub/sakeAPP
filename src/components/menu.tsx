import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Box from '@mui/material/Box';

import { DrawerMenu } from './drawerMenu';

type ContentsShoFlagType = {
  init: boolean;
  stepBar: boolean;
  areas: boolean;
  selectFlavor: boolean;
  ranking: boolean;
  searchBrand: boolean;
};
type PropsType = {
  contentsShowFlag: ContentsShoFlagType;
  setContentsShowFlag: (param: ContentsShoFlagType) => void;
  setNowStep: (param: number) => void;
  drawerOpen: boolean;
  setDrawerOpen: (param: boolean) => void;
};

export const Menu: React.FC<PropsType> = (props: PropsType) => {
  const { contentsShowFlag, setContentsShowFlag, setNowStep, drawerOpen, setDrawerOpen } = props;
  // ページ遷移用変数
  const pageUrl = useNavigate();

  const onClickArea = () => {
    // ページ遷移処理
    pageUrl('/main');
    // ステップバーの表示を更新
    setNowStep(0);
    // 産地から選ぶ押下時：ステップバーと産地を表示
    setContentsShowFlag({
      ...contentsShowFlag, // 要らないけど分割代入の書き方メモ
      init: false,
      stepBar: true,
      areas: true,
      selectFlavor: false,
      ranking: false,
      searchBrand: false,
    });
  };

  const onClickRanking = () => {
    // ページ遷移処理
    pageUrl('/main');
    // ランキングボタン押下時：ランキングを表示
    setContentsShowFlag({
      init: false,
      stepBar: false,
      areas: false,
      selectFlavor: false,
      ranking: true,
      searchBrand: false,
    });
  };

  const onClickFlavor = () => {
    // ページ遷移処理
    pageUrl('/main');
    // フレーバーから選ぶ押下時：フレーバーを表示
    setContentsShowFlag({
      init: false,
      stepBar: false,
      areas: false,
      selectFlavor: true,
      ranking: false,
      searchBrand: false,
    });
  };

  const onClickSearchBrand = () => {
    // ページ遷移処理
    pageUrl('/main');
    // 銘柄名から検索押下時：銘柄名から検索を表示
    setContentsShowFlag({
      init: false,
      stepBar: false,
      areas: false,
      selectFlavor: false,
      ranking: false,
      searchBrand: true,
    });
  };

  return (
    <>
      <h3>メニュー</h3>
      <Box m={2}>
        <Button style={{ width: '60%' }} variant="contained" color="primary" onClick={onClickArea}>
          産地から選ぶ
        </Button>
        <Button
          style={{ width: '60%' }}
          variant="contained"
          color="primary"
          onClick={onClickFlavor}>
          フレーバーから選ぶ
        </Button>
        <Button
          style={{ width: '60%' }}
          variant="contained"
          color="primary"
          onClick={onClickRanking}>
          ランキング
        </Button>
        <Button
          style={{ width: '60%' }}
          variant="contained"
          color="primary"
          onClick={onClickSearchBrand}>
          銘柄名から検索
        </Button>
        <br />
        <br />
        <Link to="/hogehoge">
          <Button style={{ width: '60%' }} variant="contained" color="primary">
            hoge
          </Button>
        </Link>
      </Box>
      <DrawerMenu drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
    </>
  );
};
