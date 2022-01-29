import React, { ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';

type PropsType = {
  children: ReactNode;
  open: boolean;
  handleClose: () => void;
  title?: string;
};

export const DetailDialog: React.FC<PropsType> = (props: PropsType) => {
  const { children, open, handleClose, title } = props;

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{ width: '600px' }}
      >
        <DialogTitle sx={{ m: 0, p: 2, display: 'flex' }}>
          <Box sx={{ textAlign: 'center' }}>{title}</Box>
          <div style={{ flexGrow: 1 }}></div>
          {handleClose ? (
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                padding: 0,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
      </Dialog>
    </>
  );
};
