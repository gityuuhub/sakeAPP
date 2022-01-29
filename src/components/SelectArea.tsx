import React, { useState, useEffect, useContext } from 'react';
import { Button } from '@material-ui/core';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { BrandDetail } from './brandDetail';
import {
  getApiUrlAreas,
  getApiUrlBreweries,
  getApiUrlFlavorCharts,
  getApiUrlFlavorTags,
  getApiUrlBrandFlavorTags,
} from '../function/getApiUrl';
import { getAllBrand } from '../function/getAllBrand';
import { MainContext } from '../providers/mainProvider';

type PropsType = {
  setNowStep: (param: number) => void;
};

export const SelectArea: React.FC<PropsType> = (props: PropsType) => {
  const { setNowStep } = props;
  const {
    stubMode,
    prefectures,
    setPrefectures,
    flavorTags,
    setFlavorTags,
    breweries,
    setBreweries,
    allBrands,
    setAllBrands,
  } = useContext(MainContext);

  /*******************
    選択状態フラグ
  ********************/
  // 都道府県の選択フラグ
  const [prefectureSelectFlag, setPrefectureSelectFlag] = useState<boolean[]>([]);
  // 蔵元の選択フラグ
  const [breweriesSelectFlag, setBreweriesSelectFlag] = useState<boolean[]>([]);
  // 銘柄の選択フラグ
  const [brandsSelectFlag, setbrandsSelectFlag] = useState<boolean[]>([]);

  /*******************
    表示用データ
  ********************/
  // 選択した蔵元の銘柄一覧
  // const [brands, setBrands] = useState<string[]>([]);
  // // 銘柄一覧のID。上記とまとめてOBJ化したい
  // const [brandsId, setBrandsId] = useState<number[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  // 選択銘柄のフレーバーデータ
  const [brandDetailRadar, setBrandDetailRadar] = useState<{ [key: string]: string | number }[]>(
    [],
  );
  // 選択した銘柄のbrandId
  const [selectBrandId, setSelectBrandId] = useState(0);
  // 選択した銘柄のフレーバータグ配列
  const [selectBrandFlavorTags, setSelectBrandFlavorTags] = useState<number[]>([]);

  /*******************
    表示制御フラグ
  ********************/
  // 銘柄詳細エリアの制御フラグ
  const [brandDetailShowFlag, setBrandDetailShowFlag] = useState(false);
  // 蔵元エリアの表示フラグ
  const [breweriesShowFlag, setBreweriesShowFlag] = useState(false);
  // 銘柄エリアの制御フラグ
  const [brandsShowFlag, setBrandsShowFlag] = useState(false);

  useEffect(() => {
    // 都道府県を一度も取得していなかったら
    if (prefectures.length === 0) {
      // 都道府県一覧の取得
      console.log('都道府県一覧取得する！！！');
      fetch(getApiUrlAreas(stubMode), { mode: 'cors' })
        .then((response) => {
          return response.json();
          // APIレスポンスはresponse.areas[n]{id:1, name:北海道}
        })
        .then((data) => {
          // 配列の中身をループで回して取得
          const array: Array<Area> = [];
          const arrayPrefectureSelectFlag: Array<boolean> = [];
          data.areas.map((area: Area) => {
            array.push(area);
            arrayPrefectureSelectFlag.push(false);
            return 0;
          });
          // API実行結果をpropsに格納
          setPrefectures(array);
          setPrefectureSelectFlag(arrayPrefectureSelectFlag);
          // console.log('都道府県一覧を取得');
          // console.log(arrayPre);
        })
        .catch((error) => {
          console.log(error);
          // alert(
          //   'API実行時はCORS問題を解決すること。 --disable-web-security --user-data-dir="ディレクトリ"',
          // );
          console.log('失敗しました');
        });
    }

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

  // 産地選択後に銘柄を取得する
  const onClickBreweriesGet = (index: number) => {
    // prefecture[index]（押下された産地）に対応するprefectureId（API戻り値のID）を取得する方法
    // console.log(prefectureId[index]);

    // ステップバーの表示を更新
    setNowStep(1);
    // コンテンツエリアの表示制御をリセット
    setBreweriesShowFlag(true);
    setBrandsShowFlag(false);
    setBrandDetailShowFlag(false);

    // 選択されたボタンを非活性にするようにフラグ更新
    const arrayFlag = prefectureSelectFlag;
    // 現在trueになっているフラグをリセットする
    arrayFlag.fill(false);
    arrayFlag[index] = true;
    setPrefectureSelectFlag(arrayFlag);

    // 蔵元一覧を取得
    if (breweries.length === 0) {
      fetch(getApiUrlBreweries(stubMode), { mode: 'cors' })
        .then((response) => {
          return response.json();
          // APIレスポンスはresponse.breweries[n]{id:1, name:蔵元, areaId:地域一覧のID}
        })
        .then((data) => {
          // 配列の中身をループで回して取得
          // 選択された産地の蔵元だけを抽出
          const array: Array<Brewery> = [];
          const arrayNameSelectFlag: Array<boolean> = [];
          data.breweries.map((bre: Brewery) => {
            // 地域が一致かつ蔵元名が空以外を抽出
            if (bre.areaId === prefectures[index].id && bre.name !== '') {
              array.push(bre);
              arrayNameSelectFlag.push(false);
            }
            return 0;
          });
          // API実行結果をbreweriesに格納
          setBreweries(array);
          setBreweriesSelectFlag(arrayNameSelectFlag);
        })
        .catch((error) => {
          console.log(error);
          // alert('API実行時はCORS問題を解決すること。');
          console.log('失敗しました');
        });
    }
  };
  // 選択した蔵元の銘柄一覧を取得
  const onClickBrandsGet = async (index: number) => {
    // ステップバーの表示を更新
    setNowStep(2);
    // コンテンツエリアの表示制御をリセット
    // 関数化したいな
    setBrandsShowFlag(true);
    setBrandDetailShowFlag(false);

    // 選択されたボタンを非活性にするようにフラグ更新
    const arrayFlag = breweriesSelectFlag;
    // 現在trueになっているフラグをリセットする
    arrayFlag.fill(false);
    arrayFlag[index] = true;
    setBreweriesSelectFlag(arrayFlag);

    // 全銘柄一覧を取得
    if (allBrands.length === 0) {
      // 全銘柄一覧の取得
      console.log('銘柄一覧の取得する！！！');
      const array = await getAllBrand(stubMode);

      // API実行結果をallBrandsに格納
      setAllBrands(array);
      console.log(array);

      const arrayBrand: Array<Brand> = [];
      const arrayNameSelectFlag: Array<boolean> = [];
      array.map((bra: Brand) => {
        // 蔵元が一致かつ銘柄が空以外を抽出
        if (bra.breweryId === breweries[index].id && bra.name !== '') {
          arrayBrand.push(bra);
          arrayNameSelectFlag.push(false);
        }
        return 0;
      });
      // API実行結果をbrandsに格納
      setBrands(arrayBrand);
      setbrandsSelectFlag(arrayNameSelectFlag);
    } else {
      // 全銘柄を取得済みであれば抽出処理のみ
      const arrayBrand = allBrands.filter((bra) => {
        return bra.breweryId === breweries[index].id && bra.name !== '';
      });
      setBrands(arrayBrand);
    }
  };

  // 銘柄フレーバー取得
  const onClickflavorGet = (index: number) => {
    // ステップバーの表示を更新
    setNowStep(3);
    // コンテンツエリアの表示制御をリセット
    setBrandDetailShowFlag(true);

    // 選択されたボタンを非活性にするようにフラグ更新
    const arrayFlag = brandsSelectFlag;
    // 現在trueになっているフラグをリセットする
    arrayFlag.fill(false);
    arrayFlag[index] = true;
    setbrandsSelectFlag(arrayFlag);

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
        // ToDo API実行を1回だけにしたい。
        // 実行有無フラグをグローバルに持たせて、OBJはディープコピーすること。
        // 一度OBJをJSON形式に戻して再代入するとスムーズ。

        console.log('選択した銘柄id' + brands[index].id);
        // 選択した銘柄のidを状態として持つように変更
        setSelectBrandId(brands[index].id);
        console.log('選択した銘柄idをセットした' + selectBrandId);

        // 配列の中身をループで回して取得
        // 選択された銘柄のフレーバーだけを抽出
        data.flavorCharts.map((fla: { [key: string]: number }) => {
          // 銘柄が一致するものを抽出
          if (fla.brandId === brands[index].id) {
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

    if (brands[index].id != selectBrandId) {
      // 銘柄フレーバータグ一覧の取得
      fetch(getApiUrlBrandFlavorTags(stubMode), { mode: 'cors' })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // console.log('brand-flavor-tags(銘柄フレーバータグ一覧):');
          // console.log(data);
          // タグのリストをリセット
          setSelectBrandFlavorTags([]);

          data.flavorTags.forEach((fla: BrandFlavorTag) => {
            // 銘柄が一致するものを抽出
            if (fla.brandId === brands[index].id) {
              setSelectBrandFlavorTags(fla.tagIds);
              console.log('selectBrandFlavorTags' + selectBrandFlavorTags);
              // 1回処理したらmapをBreakしたい
            }
          });
        })
        .catch((error) => {
          console.log(error);
          alert('brand-flavor-tagsでerror');
          console.log('失敗しました');
        });
    }
  };
  return (
    <>
      <Grid item xs={8}>
        {/* コンテンツ配置 */}
        <Box component="span" m={1}>
          <div>
            <h3>都道府県から探す</h3>
            {prefectures.map((pre, index) => {
              return (
                <Button
                  key={index} // key変更
                  variant="contained"
                  disabled={prefectureSelectFlag[index]}
                  style={{ width: 100 }}
                  onClick={() => onClickBreweriesGet(index)}
                >
                  {pre.name}
                </Button>
              );
            })}
          </div>
        </Box>
        <Box component="span" m={1} style={{ display: breweriesShowFlag ? '' : 'none' }}>
          <div>
            <h3>蔵元を指定する</h3>
            {breweries.map((bre, index) => {
              return (
                <Button
                  key={index} // key変更
                  variant="contained"
                  disabled={breweriesSelectFlag[index]}
                  onClick={() => onClickBrandsGet(index)}
                >
                  {bre.name}
                </Button>
              );
            })}
          </div>
        </Box>
        <Box component="span" m={1} style={{ display: brandsShowFlag ? '' : 'none' }}>
          <div>
            <h3>銘柄を指定する</h3>
            {brands.map((bra, index) => {
              return (
                <Button
                  key={index} // key変更
                  variant="contained"
                  disabled={brandsSelectFlag[index]}
                  onClick={() => onClickflavorGet(index)}
                >
                  {bra.name}
                </Button>
              );
            })}
          </div>
        </Box>
        <Box component="span" m={1} style={{ display: brandDetailShowFlag ? '' : 'none' }}>
          <div>
            <h3>銘柄詳細</h3>
            <BrandDetail
              brandDetailRadar={brandDetailRadar}
              selectBrandId={selectBrandId}
              flavorTags={flavorTags}
            ></BrandDetail>
          </div>
        </Box>
      </Grid>
    </>
  );
};
