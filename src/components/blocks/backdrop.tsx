import { ThemeProvider as MuiThemeProvider } from "styles/material/theme"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"
import React from "react"

export const Loading = ({ open }) => {
  return (
    <MuiThemeProvider>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </MuiThemeProvider>
  )
}
