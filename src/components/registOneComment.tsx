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
  const [brandId, setBrandId] = useState(1);
  const [comment, setComment] = useState('');
  const [starPoint, setStarPoint] = useState(0);

  const bChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrandId(() => Number(e.target.value));
  };
  const cChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(() => e.target.value);
  };

  return (
    <>
      <p>brandIdを指定してコメントをDBに登録する処理を適当に書いた。</p>
      {/* コンポーネントに移したいがとりあえず書く */}
      <TextField
        id="brandId"
        value={brandId}
        type="number"
        label="brandId"
        variant="outlined"
        onChange={bChange}
      />
      <TextField
        fullWidth
        id="comment"
        value={comment}
        label="comment"
        variant="outlined"
        onChange={cChange}
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
