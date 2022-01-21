import React from 'react';
import Box from '@mui/material/Box';

import { StepBar } from '../components/stepBar';
import { InitContents } from '../components/initContents';
import { SelectArea } from '../components/SelectArea';
import { RankingArea } from '../components/RankingArea';
import { SelectFlavor } from '../components/SelectFlavor';

type PropsType = {
  contentsShowFlag: {
    init: boolean;
    stepBar: boolean;
    areas: boolean;
    selectFlavor: boolean;
    ranking: boolean;
  };
  nowStep: number;
  setNowStep: (param: number) => void;
};

export const SakenowaContent = (props: PropsType) => {
  const { contentsShowFlag, nowStep, setNowStep } = props;

  return (
    <>
      <Box component="span" m={1} style={{ display: contentsShowFlag.stepBar ? '' : 'none' }}>
        <StepBar nowStep={nowStep} />
      </Box>
      {/* コンテンツ配置 */}
      <Box component="span" m={1} style={{ display: contentsShowFlag.init ? '' : 'none' }}>
        <div>
          <InitContents />
        </div>
      </Box>
      {contentsShowFlag.areas && <SelectArea setNowStep={setNowStep} />}
      {contentsShowFlag.selectFlavor && <SelectFlavor setNowStep={setNowStep} />}
      {contentsShowFlag.ranking && <RankingArea />}
    </>
  );
};
