import React, { useState } from 'react';

import { TextField } from '@mui/material';
import { Button } from '@material-ui/core';

import axios from 'axios';

// とりあえず何も考えずにやっつけでPOSTでデータ飛ばしてみた
const sakeOneCommnetUrl =
  'https://2ygmpjbho2.execute-api.ap-northeast-1.amazonaws.com/dynamoAPI/sakeonecomment';

const onClickSendComment = (brandId, comment, starPoint) => {
  axios.post(sakeOneCommnetUrl, {
    params: { brandId: brandId, comment: comment, starPoint: starPoint },
  });
};

export const OneCommentAdmin = () => {
  const [brandId, setBrandId] = useState(1);
  const [comment, setComment] = useState('');
  const [starPoint, setStarPoint] = useState(0);

  const bChange = (e) => {
    setBrandId(() => e.target.value);
  };
  const cChange = (e) => {
    setComment(() => e.target.value);
  };
  const sChange = (e) => {
    setStarPoint(() => e.target.value);
  };

  return (
    <>
      <p>
        brandIdを指定してコメントをDBに登録する処理を書くつもり。
        <br /> 単純なinput2つとsubmitボタンで。
      </p>
      {/* コンポーネントに移したいがとりあえず書く */}
      <TextField
        id="brandId"
        value={brandId}
        label="brandId"
        variant="outlined"
        onChange={bChange}
      />
      <TextField
        id="comment"
        value={comment}
        label="comment"
        variant="outlined"
        onChange={cChange}
      />
      <TextField
        id="starPoint"
        value={starPoint}
        label="starPoint"
        variant="outlined"
        onChange={sChange}
      />
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
