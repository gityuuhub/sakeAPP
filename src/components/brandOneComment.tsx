import React, { useState, useEffect } from 'react';
import { getOneComment } from '../function/restApiOneComment';

type PropsType = {
  selectBrandId: number;
};

// API実行を待ってコメントをセットする
async function callGetOneComment(
  selectBrandId: number,
  setComment: React.Dispatch<React.SetStateAction<string>>,
) {
  const returnComment = await getOneComment(selectBrandId);
  // 3項演算子：取得コメントが空なら適当なコメントを返す
  setComment(returnComment !== '' ? returnComment : '飲んだことないからよく分かんない');
}

// コメント表示コンポーネント
export const BrandOneComment: React.FC<PropsType> = (props: PropsType) => {
  const { selectBrandId } = props;
  const [comment, setComment] = useState<string>('');

  // selectBrandIdが変わるたびに、一言コメントを取得してcommentにセットする
  useEffect(() => {
    console.log('selectBrandIDの変更を検知:' + selectBrandId);
    // 戻り値が来る前にset関数が動いてるっぽいので関数切り出しで同期処理
    callGetOneComment(selectBrandId, setComment);
  }, [selectBrandId]);

  return (
    <>
      <h3>一言コメント</h3>
      <p>{comment}</p>
    </>
  );
};

export default BrandOneComment;