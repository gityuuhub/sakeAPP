import React, { useState, useEffect, useContext, ReactNode } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@material-ui/data-grid';

import { getApiUrlRankings, getApiUrlBrands } from '../function/getApiUrl';
import { MainContext } from '../providers/mainProvider';
import { DetailButton } from './DetailButton';

export const RankingArea = () => {
  const { stubMode, allBrands, setAllBrands, rankings, setRankings } = useContext(MainContext);

  useEffect(() => {
    // 銘柄一覧取得を一度もしていなかったら
    if(allBrands.length === 0) {
    // 銘柄一覧の取得
    console.log("銘柄一覧の取得する！！！")
    fetch(getApiUrlBrands(stubMode), { mode: 'cors' })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const array: Array<BrandType> = [];
        data.brands.map((bra: { [key: string]: any }) => {
          // 銘柄が空以外を抽出
          if (bra.name !== '') {
            // 銘柄名と銘柄idを1つのOBJ化
            const brand = {name: bra.name, id: bra.id}
            array.push(brand)
          }
          return 0;
        });
        // API実行結果をallBrandsに格納
        setAllBrands(array);
      })
      .catch((error) => {
        console.log(error);
        // alert('API実行時はCORS問題を解決すること。');
        console.log('失敗しました');
      });
    }
  }, []);

  // APIでよびだした値をcontextに入れた
  useEffect(() => {
    // ランキング取得を一度もしていなかったら
    if(rankings.length === 0 && allBrands.length > 0) {
    // ランキング一覧の取得
    fetch(getApiUrlRankings(stubMode), { mode: 'cors' })
      .then((response) => {
        return response.json();
        // APIレスポンスはresponse.overall[n]{"rank": number, "score": number, "brandId": number}
      })
      .then((data) => {
        // DataGridを使うためにユニークID付与
        data.overall.map((item: { [key: string]: any }, index: number) => {
          item.id = index;
          // 小数点第3位を四捨五入
          item.score = Math.round(item.score * 100) / 100;

          // 銘柄名を探す
          const brand = allBrands.findIndex((b) => b.id === item.brandId);

          if (brand) {
            item.name = allBrands[brand].name;
          }
          // {"rank": number, "score": number, "brandId": number, "id": number, "name": string}
        });
        setRankings(data.overall);
        // console.log(data.overall);
      })
      .catch((error) => {
        console.log(error);
        // alert(
        //   'ranking取得API失敗',
        // );
        console.log('失敗しました');
      });
    }
  }, [allBrands]);

  // ランキング表のカラム
  const columns = [
    { field: 'rank', headerName: 'ランク', width: 150 },
    { field: 'score', headerName: 'スコア', width: 150 },
    { field: 'name', headerName: '銘柄', width: 200 },
    {
    field: 'editBtn',
    headerName: '詳細',
    sortable: false,
    width: 90,
    disableClickEventBubbling: true,
    renderCell: (params: any) => <DetailButton rowId={ params.id } />
    },
  ];

  return (
    <>
      <Grid item xs={11}>
        <div>
          <h3>ランキング</h3>
          <div style={{ height: 925, width: '100%' }}>
            <DataGrid rows={rankings} columns={columns} pageSize={15} />
          </div>
        </div>
      </Grid>
    </>
  );
};
