import React, { useState, useEffect, useContext } from 'react';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { getApiUrlBrandFlavorTags } from '../function/getApiUrl';
import { MainContext } from '../providers/mainProvider';

type PropsType = {
  selectBrandId: number;
  flavorTags: FlavorTag[];
};

// タグ表示コンポーネント
export const BrandDetailTags: React.FC<PropsType> = (props: PropsType) => {
  const { flavorTags, selectBrandId } = props;
  const { stubMode } = useContext(MainContext);

  // 選択した銘柄のフレーバータグ配列
  const [selectBrandFlavorTags, setSelectBrandFlavorTags] = useState<number[]>([]);

  //const { selectBrandFlavorTags, flavorTags } = props;

  useEffect(() => {
    // タグのリストをリセット
    setSelectBrandFlavorTags([]);

    // 銘柄フレーバータグ一覧の取得
    fetch(getApiUrlBrandFlavorTags(stubMode), { mode: 'cors' })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.flavorTags);

        data.flavorTags.map((fla: BrandFlavorTag) => {
          // 銘柄が一致するものを抽出
          if (fla.brandId === selectBrandId) {
            console.log('一致したものあった');
            console.log(fla.tagIds);
            setSelectBrandFlavorTags(fla.tagIds);
            console.log('selectBrandFlavorTags');
            // 1回処理したらmapをBreakしたい
          }
        });
      })
      .catch((error) => {
        console.log(error);
        alert('brand-flavor-tagsでerror');
        console.log('失敗しました');
      });
  }, [selectBrandId]);

  return (
    <>
      <br />
      <h3>特徴</h3>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          padding: 0.5,
        }}
      >
        {selectBrandFlavorTags.map((brandTagId, index) => {
          const tagObj = flavorTags.find((flavorTag) => flavorTag.id === brandTagId);
          if (tagObj != undefined)
            return <Chip key={index} label={tagObj.tag} color="primary" sx={{ margin: 0.5 }} />;
        })}
      </Box>
    </>
  );
};

export default BrandDetailTags;
