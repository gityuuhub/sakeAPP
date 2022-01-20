import React, { useState, useEffect, useContext,ReactNode } from 'react';
import Button from '@mui/material/Button';

type PropsType = {
  rowId: number
}
export const DetailButton = (props: PropsType) => {
  const {rowId} = props
  return <Button color="primary">詳細</Button>
}
