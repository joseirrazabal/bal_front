import { createTheme } from '@material-ui/core/styles'

// para no tener el warning
import { unstable_createMuiStrictModeTheme as createThemeUnstable } from '@material-ui/core'

import copoTheme from '@joseirrazabal/copo/theme/DefaultTheme'

const { NODE_ENV } = process.env

let theme = createTheme({
  ...copoTheme,
  palette: {
    primary: {
      dark: '#b2a300',
      main: '#fff159',
      light: '#ffee33',
    },
    secondary: {
      dark: '#1769aa',
      main: '#1769aa',
      light: '#4dabf5',
    },
  },
})

if (NODE_ENV !== 'production') {
  theme = createThemeUnstable({
    ...copoTheme,
    palette: {
      primary: {
        dark: '#b2a300',
        main: '#fff159',
        light: '#ffee33',
      },
      secondary: {
        dark: '#1769aa',
        // main: '#00b0ff',
        main: '#1769aa',
        light: '#4dabf5',
      },
    },
  })
}

export default theme
