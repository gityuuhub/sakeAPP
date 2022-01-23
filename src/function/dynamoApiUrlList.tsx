// DynamoDBにsakeOneCommnetテーブルがある。
// 　テーブル構造
// 　　brandId：（Number型＠パーティションキー）酒のIDが入る。
// 　　comment：（文字列型）brandIdの酒に対するコメント。
// DBリソースへのアクセスは、下記sakeOneCommnetのURL。
// RestFullなAPIを目指す。
// 　メソッド
// 　Get：バラメータにbrandIdを指定することで登録されているコメントを返す。
// 　　こんな感じ：https://url?brandId=0
// 　Post：バラメータでbrandIdとcommentを指定した内容をDBに登録できる。
// 　　※後ほどレスポンスを整形しなおすかも。
// 　　※パーテションキーが重複したら上書きされるっぽい。RDSと勝手が違う。
// 　　こんな感じ：https://url
// 　　　　　　　　body{"brandId":"0","comment":"レモンサワーからの梅酒（売り切れ直前）"}
// ノーガードなので変なアクセス受けると店じまい予定。

export const urlList = {
  // 通常モードの時に呼び出すURL
  sakeOneCommnet:
    'https://2ygmpjbho2.execute-api.ap-northeast-1.amazonaws.com/dynamoAPI/sakeonecomment',
  hogehoge: 'なんか作ればURL',
};
