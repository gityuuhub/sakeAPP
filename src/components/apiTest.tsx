import React, { useState } from 'react';

import { TextField } from '@mui/material';

export const ApiTest = () => {
  // ユーザ入力値をuseStateで管理
  const [url, setUrl] = useState('hogehoge.com');

  return (
    <>
      <p>入力値をもとにブラウザからPOSTリクエストを投げて結果をそのまま表示。</p>
      <ul>
        <li>XSSがJSX記法で効かない確認</li>
        <li>CSRFを試してみる</li>
      </ul>

      <TextField
        id="targetUrl"
        value={url}
        label="TargetURL"
        variant="outlined"
        onChange={(e) => {
          setUrl(e.target.value);
        }}
      />
    </>
  );
};
