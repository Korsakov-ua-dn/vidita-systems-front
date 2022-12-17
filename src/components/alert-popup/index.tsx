import React, { useCallback } from "react";
import "./style.css";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type PropsType = {
  dialogTitle?: string;
  dialogContentText?: string;
  onClose: (isAgree: boolean) => void;
};

const AlertPopup: React.FC<PropsType> = (props) => {

  const callbacks = {
    onOk: useCallback(() => props.onClose(true), [props]),
    onCancel: useCallback(() => props.onClose(false), [props]),
  };

  return (
    <div>
      <Dialog
        open
        onClose={callbacks.onCancel}
        aria-labelledby="alert-dialog-title"  
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          { props.dialogTitle }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            { props.dialogContentText }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={callbacks.onCancel}>
            Отклонить
          </Button>
          <Button onClick={callbacks.onOk} autoFocus>
            Применить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default React.memo(AlertPopup);
