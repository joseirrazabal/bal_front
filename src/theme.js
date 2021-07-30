import { createMuiTheme } from '@material-ui/core/styles'
import copoTheme from '@joseirrazabal/copo/theme/DefaultTheme'

const theme = createMuiTheme({
  ...copoTheme,
  palette: {
    primary: {
      dark: '#b2a300',
      main: '#fff159',
      light: '#ffee33'
    },
    secondary: {
      dark: '#1769aa',
      // main: '#00b0ff',
      main: '#1769aa',
      light: '#4dabf5'
    },
  },
})

export default theme
