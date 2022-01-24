// DynamoDBにsakeOneCommnetテーブルがある。
// 　テーブル構造
// 　　brandId：（Number型＠パーティションキー）酒のIDが入る。
// 　　comment：（文字列型）brandIdの酒に対するコメント。
// DBリソースへのアクセスは、下記sakeOneCommnetのURL。
// RestFullなAPIを目指す。
// 　メソッド
// 　Get：バラメータにbrandIdを指定することで登録されているコメントを返す。
// 　　こんな感じ：https://url?brandId=0
// 　　※レスポンスはAPI-GWの総合レスポンスで整形。
//      JSONのNumber型でも""括りが残っているが妥協。
// 　Post：バラメータでbrandIdとcommentを指定した内容をDBに登録できる。
// 　　※パーテションキーが重複したら上書きされるっぽい。RDSと勝手が違う。
// 　　こんな感じ：https://url
// 　　　　　　　　body{"brandId":"0","comment":"レモンサワーからの梅酒（売り切れ直前）"}
// ノーガードなので変なアクセス受けると店じまい予定。

import axios from 'axios';

const sakeOneCommnetUrl =
  'https://2ygmpjbho2.execute-api.ap-northeast-1.amazonaws.com/dynamoAPI/sakeonecomment';

// sakeOneCommnetをGetメソッドで実行して結果を返す
const dosakeOneCommnetAPI = (selectBrandId: number) => {
  console.log('コメントを取得するbrandId:' + selectBrandId);

  // クエリ作成と実行
  //  axiosっぽく書いてみた
  axios.get(sakeOneCommnetUrl, { params: { brandId: selectBrandId } }).then(function (res) {
    console.log(res.data);
    return res.data.comment;
  });
};

type PropsTypeGet = {
  selectBrandId: number;
};

// 引数のbrand（酒）に応じた一言コメントを返す
export const getOneComment = (props: PropsTypeGet) => {
  const selectBrandId = props;
  // APIを実行してBrandIdに応じたコメントを返す
  return dosakeOneCommnetAPI(selectBrandId);
};

// 引数のbrand（酒）に引数のcommentをDB登録する
//export const getOneComment = () => {
//};
