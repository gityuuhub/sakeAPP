import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import { GridRowId } from '@material-ui/data-grid';

import { DetailDialog } from './DetailDialog';
import { MainContext } from '../providers/mainProvider';
import { BrandDetail } from './brandDetail';
import { getApiUrlFlavorCharts } from '../function/getApiUrl';

type PropsType = {
  rowId: GridRowId;
};

export const DetailButton: React.FC<PropsType> = (props: PropsType) => {
  const { rowId } = props;
  const rowIdNum = Number(rowId) != null ? Number(rowId) : -1;
  const { stubMode, flavorTags, rankings } = useContext(MainContext);

  const [open, setOpen] = useState(false);

  // 選択銘柄のフレーバーデータ
  const [brandDetailRadar, setBrandDetailRadar] = useState<{ [key: string]: string | number }[]>(
    [],
  );

  // 詳細を押した銘柄のidと名前を取得する
  // item : {"rank": number, "score": number, "brandId": number, "id": number, "name": string}
  const item = rankings.find((b) => b.id === rowIdNum);
  let selectBrandId = -1;
  let selectBrandName = '';

  if (item != undefined) {
    selectBrandId = item.brandId;
    selectBrandName = item.name;
  }

  // useEffect(() => {
  //
  // }, [selectBrandId]);

  const handleOpen = () => {
    // フレーバー情報をリセット
    setBrandDetailRadar([
      { flavor: '華やか', value: 0 },
      { flavor: '芳醇', value: 0 },
      { flavor: '濃厚', value: 0 },
      { flavor: '穏やか', value: 0 },
      { flavor: 'ドライ', value: 0 },
      { flavor: '爽快', value: 0 },
    ]);

    fetch(getApiUrlFlavorCharts(stubMode), { mode: 'cors' })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // 配列の中身をループで回して取得
        // 選択された銘柄のフレーバーだけを抽出
        data.flavorCharts.map((fla: { [key: string]: number }) => {
          // 銘柄が一致するものを抽出
          if (fla.brandId === selectBrandId) {
            setBrandDetailRadar([
              // valueだけの代入に書き直したい
              { flavor: '華やか', value: fla.f1 },
              { flavor: '芳醇', value: fla.f2 },
              { flavor: '濃厚', value: fla.f3 },
              { flavor: '穏やか', value: fla.f4 },
              { flavor: 'ドライ', value: fla.f5 },
              { flavor: '爽快', value: fla.f6 },
            ]);
            // 1回処理したらmapをBreakしたい
          }
          // return 0;
        });
      })
      .catch((error) => {
        console.log(error);
        // alert('API実行時はCORS問題を解決すること。');
        console.log('失敗しました');
      });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button color="primary" onClick={handleOpen}>
        詳細
      </Button>
      <DetailDialog open={open} handleClose={handleClose} title={selectBrandName}>
        <BrandDetail
          brandDetailRadar={brandDetailRadar}
          selectBrandId={selectBrandId}
          flavorTags={flavorTags}
        />
      </DetailDialog>
    </>
  );
};
