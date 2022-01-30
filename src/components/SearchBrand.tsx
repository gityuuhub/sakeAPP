import React, { useEffect, useContext,useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button } from '@material-ui/core';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import { getApiUrlFlavorTags } from '../function/getApiUrl';
import { getAllBrand } from '../function/getAllBrand';
import { MainContext } from '../providers/mainProvider';
// import { DetailButton } from './DetailButton';

export const SearchBrand: React.FC = () => {
  const { stubMode, allBrands, setAllBrands, flavorTags, setFlavorTags } =
    useContext(MainContext);

  // 検索ワード
  const [ keyWord , setKeyWord ] = useState('');
  
  // 検索結果
  const [ arrayBrand , setArrayBrand ] = useState<Brand[]>([]);

  // 検索結果表示フラグ
  const [searchFlag, setSearchFlag] = useState(false);

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
          setFlavorTags(data.tags);
        })
        .catch((error) => {
          console.log(error);
          alert('flavor-tagsでAPI実行時に失敗');
          console.log('失敗しました');
        });
    }
  }, []);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyWord(event.target.value);
  }

  const onClickSearchButton = () => {
    // キーワードを含む銘柄のみ抽出
    const array = allBrands.filter(
      (item) => {
        return item.name.includes(keyWord);
      }
    )
    setArrayBrand(array);
    setSearchFlag(true);
    console.log(array);
  }

  return (
    <>
      <Grid item xs={11}>
        <div>
          <h3>銘柄検索</h3>
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Brand"
              inputProps={{ 'aria-label': 'search brand' }}
              onChange={onChange}
            />
            <IconButton sx={{ p: '10px' }} aria-label="search" onClick={onClickSearchButton}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        <Box component="span" m={1} style={{ display: searchFlag ? '' : 'none' }}>
          <div>
            <h3>検索結果</h3>
            検索結果{arrayBrand.length}件<br/><br/>
            {arrayBrand.length > 0 ? arrayBrand.map((bra, index) => {
              return (
                <Button
                  key={index} // key変更
                  variant="contained"
                  // TODO ランキングエリアのようにモーダル表示で詳細出す？
                  // onClick={() => onClick(index)}
                >
                  {bra.name}
                </Button>
              );
            }) : <>検索結果0件</>}
          </div>
        </Box>
      </Grid>
    </>
  );
};
