import React, { useState } from 'react';

import { TextField, Typography, Rating } from '@mui/material';
import { Button } from '@material-ui/core';

import axios from 'axios';

// とりあえず何も考えずにやっつけでPOSTでデータ飛ばしてみた
// 要リファクタリング
// API呼び出しはfunctionに切り出し
// 画面コンポーネント要素はcomponentsに切り出し
const sakeOneCommnetUrl =
  'https://2ygmpjbho2.execute-api.ap-northeast-1.amazonaws.com/dynamoAPI/sakeonecomment';

const onClickSendComment = (brandId: number, comment: string, starPoint: number) => {
  axios.post(
    sakeOneCommnetUrl,
    { params: { brandId: brandId, comment: comment, starPoint: starPoint } },
    { headers: { 'content-type': 'application/json' } },
  );
};

export const RegistOneComment = () => {
  // ユーザ入力値をuseStateで管理
  const [brandId, setBrandId] = useState(1);
  const [comment, setComment] = useState('');
  const [starPoint, setStarPoint] = useState(0);

  return (
    <>
      <p>brandIdを指定してコメントと★starPoint★をaxios先生がDBに登録する。</p>
      <TextField
        id="brandId"
        value={brandId}
        type="number"
        label="brandId"
        variant="outlined"
        onChange={(e) => {
          setBrandId(Number(e.target.value));
        }}
      />
      <TextField
        fullWidth
        id="comment"
        value={comment}
        label="comment"
        variant="outlined"
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <Typography component="legend">★starPointSystem by R★</Typography>
      <Rating
        name="starbyR"
        value={starPoint}
        onChange={(event, newValue) => {
          setStarPoint(Number(newValue));
        }}
      />
      <br />
      {/* ボタン押下でuseState管理している入力値を飛ばす */}
      <Button
        variant="contained"
        color="secondary"
        onClick={() => onClickSendComment(brandId, comment, starPoint)}
      >
        DB登録
      </Button>
    </>
  );
};
