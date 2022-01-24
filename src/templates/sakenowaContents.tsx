import React from 'react';
import Box from '@mui/material/Box';

import { StepBar } from '../components/stepBar';
import { SelectArea } from '../components/SelectArea';
import { RankingArea } from '../components/RankingArea';
import { SelectFlavor } from '../components/SelectFlavor';

type PropsType = {
  contentsShowFlag: {
    stepBar: boolean;
    areas: boolean;
    selectFlavor: boolean;
    ranking: boolean;
  };
  nowStep: number;
  setNowStep: (param: number) => void;
};

export const SakenowaContent: React.FC<PropsType> = (props: PropsType) => {
  const { contentsShowFlag, nowStep, setNowStep } = props;

  return (
    <>
      <Box component="span" m={1} style={{ display: contentsShowFlag.stepBar ? '' : 'none' }}>
        <StepBar nowStep={nowStep} />
      </Box>
      {/* コンテンツ配置 */}
      {contentsShowFlag.areas && <SelectArea setNowStep={setNowStep} />}
      {contentsShowFlag.selectFlavor && <SelectFlavor />}
      {contentsShowFlag.ranking && <RankingArea />}
    </>
  );
};
