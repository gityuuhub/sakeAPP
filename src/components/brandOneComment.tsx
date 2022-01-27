import React, { useState, useEffect } from 'react';
import { getOneCommentStar } from '../function/restApiOneComment';

import { Typography, Rating } from '@mui/material';

type PropsType = {
  selectBrandId: number;
};

// API実行を待ってコメントをセットする
async function callGetOneComment(
  selectBrandId: number,
  setComment: React.Dispatch<React.SetStateAction<string>>,
  setStarPoint: React.Dispatch<React.SetStateAction<number>>,
) {
  const commentStar = await getOneCommentStar(selectBrandId);
  // 3項演算子：取得コメントが空なら適当なコメントを返す
  setComment(commentStar.comment !== '' ? commentStar.comment : '飲んだことないからよく分かんない');
  setStarPoint(commentStar.starPoint);
}

// コメント表示コンポーネント
export const BrandOneComment: React.FC<PropsType> = (props: PropsType) => {
  const { selectBrandId } = props;
  const [comment, setComment] = useState<string>('');
  const [starPoint, setStarPoint] = useState<number>(0);

  // selectBrandIdが変わるたびに、一言コメントを取得してcommentにセットする
  useEffect(() => {
    console.log('selectBrandIDの変更を検知:' + selectBrandId);
    // 戻り値が来る前にset関数が動いてるっぽいので関数切り出しで同期処理
    callGetOneComment(selectBrandId, setComment, setStarPoint);
  }, [selectBrandId]);

  return (
    <>
      <h3>一言コメント</h3>
      <Typography component="legend">★byR</Typography>
      <Rating name="starbyR" value={starPoint} readOnly />
      <p>{comment}</p>
    </>
  );
};

export default BrandOneComment;
