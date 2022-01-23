import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import { DetailDialog } from './DetailDialog';
import { MainContext } from '../providers/mainProvider';

type PropsType = {
  rowId: number;
};

const Detail = (props: { rowId: number }) => {
  const { rowId } = props;
  const { rankings } = useContext(MainContext);

  const item = rankings.find((b) => b.id === rowId);
  if (item != undefined) {
    return <>{item.name}</>;
  } else {
    return <></>;
  }
};

export const DetailButton = (props: PropsType) => {
  const { rowId } = props;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button color="primary" onClick={handleOpen}>
        詳細
      </Button>
      <DetailDialog open={open} handleClose={handleClose}>
        <Detail rowId={rowId} />
      </DetailDialog>
    </>
  );
};
