import { Snackbar, Alert } from "@mui/material";
import { FC } from "react";

interface Props {
  error: boolean;
}

export const ErrorAlert: FC<Props> = ({ error }) => (
  <Snackbar
    open={error}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
  >
    <Alert severity="error">
      Something went wrong, try reloading the page
    </Alert>
  </Snackbar>
);

