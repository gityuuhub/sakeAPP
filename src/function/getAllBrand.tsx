import { getApiUrlBrands } from '../function/getApiUrl';
export const getAllBrand = async (stubMode: boolean) => {
  const array: Array<Brand> = [];
  await fetch(getApiUrlBrands(stubMode), { mode: 'cors' })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.brands.map((bra: Brand) => {
        // 銘柄が空以外を抽出
        if (bra.name !== '') {
          array.push(bra);
        }
      });
    })
    .catch((error) => {
      console.log(error);
      // alert('API実行時はCORS問題を解決すること。');
      console.log('失敗しました');
    });
  return array;
};
