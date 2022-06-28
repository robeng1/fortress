import { SnackbarProvider } from 'notistack';
import { notifications } from 'store/notifications';
import { ThemeProvider as MuiThemeProvider } from "styles/material/theme"
import Notifier from './notifier';

function Notifications() {
  return (
    <MuiThemeProvider>
      <SnackbarProvider maxSnack={notifications.maxSnack}>
        <Notifier />
      </SnackbarProvider>
    </MuiThemeProvider>
   
  );
}

export default Notifications;