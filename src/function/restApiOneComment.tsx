/*
DynamoDBにsakeOneCommnetテーブルがある。
  テーブル構造
    brandId：（Number型＠パーティションキー）酒のIDが入る。
    comment：（文字列型）brandIdの酒に対するコメント。
    starPoint: （Number型）0-5の星の数が入る。
  DBリソースへのアクセスは、下記sakeOneCommnetのURL。
  RestFullなAPIを目指す。
  メソッド
    Get：バラメータにbrandIdを指定することで登録されているコメントを返す。
      こんな感じ：https://url?brandId=0
      ※レスポンスはAPI-GWの総合レスポンスで整形。
    Post：バラメータでbrandIdとcommentを指定した内容をDBに登録できる。
      ※パーテションキーが重複したら上書きされるっぽい。RDSと勝手が違う。
      こんな感じ：https://url
      params:{"brandId":0,"comment":"レモンサワーからの梅酒（売り切れ直前）", "starPoint":5}
ノーガードなので変なアクセス受けると店じまい予定。
*/
import axios from 'axios';

const sakeOneCommnetUrl =
  'https://2ygmpjbho2.execute-api.ap-northeast-1.amazonaws.com/dynamoAPI/sakeonecomment';

type returnType = {
  comment: string;
  starPoint: number;
};

// 引数のbrand（酒）に応じた一言コメントを返す
export const getOneCommentStar = (props: number): Promise<returnType> => {
  // APIの実行完了を待たせる
  return new Promise(function (resolve) {
    const selectBrandId = props;
    console.log('コメントを取得するbrandId:' + selectBrandId);

    // クエリ作成と実行
    //  axiosっぽく書いてみた
    axios.get(sakeOneCommnetUrl, { params: { brandId: selectBrandId } }).then(function (res) {
      console.log(res.data);
      resolve(res.data);
    });
  });
};

// 引数のbrand（酒）に引数のcommentをDB登録する
//export const getOneComment = () => {
//};
