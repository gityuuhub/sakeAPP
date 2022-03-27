import React from 'react';

export const ApiTest = () => {
  return (
    <>
      <p>入力値をもとにブラウザからPOSTリクエストを投げて結果をそのまま表示。</p>
      <ul>
        <li>XSSがJSX記法で効かない確認</li>
        <li>CSRFを試してみる</li>
      </ul>
    </>
  );
};
