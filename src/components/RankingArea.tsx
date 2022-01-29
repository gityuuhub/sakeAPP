import React, { useEffect, useContext } from 'react';
import Grid from '@mui/material/Grid';
import { DataGrid, GridCellParams } from '@material-ui/data-grid';

import { getApiUrlRankings, getApiUrlFlavorTags } from '../function/getApiUrl';
import { getAllBrand } from '../function/getAllBrand';
import { MainContext } from '../providers/mainProvider';
import { DetailButton } from './DetailButton';

export const RankingArea: React.FC = () => {
  const { stubMode, allBrands, setAllBrands, rankings, setRankings, flavorTags, setFlavorTags } =
    useContext(MainContext);

  useEffect(() => {
    // 直接、await getAllBrand(stubMode)は呼べない
    // useEffectはpromiseを返さない（useEffectに渡す関数の戻り値はcleanup）
    const getData = async() => {
      // 全銘柄一覧取得を一度もしていなかったら
      if (allBrands.length === 0) {
        const array = await getAllBrand(stubMode);
        setAllBrands(array);
      }
    }
    getData();

    // フレーバータグ一覧を一度も取得していなかったら
    if (flavorTags.length === 0) {
      // フレーバータグ一覧の取得
      fetch(getApiUrlFlavorTags(stubMode), { mode: 'cors' })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // console.log('flavor-tags(フレーバータグ一覧):');
          // console.log(data);
          // console.log('フレーバータグ一覧取り出す');
          // console.log(data.tags);
          setFlavorTags(data.tags);
        })
        .catch((error) => {
          console.log(error);
          alert('flavor-tagsでAPI実行時に失敗');
          console.log('失敗しました');
        });
    }
  }, []);

  // APIでよびだした値をcontextに入れた
  useEffect(() => {
    // ランキング取得を一度もしていなかったら
    if (rankings.length === 0 && allBrands.length > 0) {
      // ランキング一覧の取得
      fetch(getApiUrlRankings(stubMode), { mode: 'cors' })
        .then((response) => {
          return response.json();
          // APIレスポンスはresponse.overall[n]{"rank": number, "score": number, "brandId": number}
        })
        .then((data) => {
          // DataGridを使うためにユニークID付与
          data.overall.map((item: Ranking, index: number) => {
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
      renderCell: (params: GridCellParams) => <DetailButton rowId={params.id} />,
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
