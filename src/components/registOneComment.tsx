import React, { useState } from 'react';

import { TextField, Typography, Rating } from '@mui/material';
import { Button } from '@material-ui/core';

import { postOneComment } from '../function/restApiOneComment';

// パラメータをOBJに詰めてfunctionにAPI実行をお任せ。
const onClickSendComment = (brandId: number, comment: string, starPoint: number) => {
  const params = { brandId: brandId, comment: comment, starPoint: starPoint };
  postOneComment(params);
};

export const RegistOneComment = () => {
  // ユーザ入力値をuseStateで管理
  const [brandId, setBrandId] = useState(1);
  const [comment, setComment] = useState('');
  const [starPoint, setStarPoint] = useState(0);

  // （仮）データ登録結果を格納するuseState（useRef使ってみたい）
  //    const [registerResult setRegisterResult] = useState(0);

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
