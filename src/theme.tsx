import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Colors
const PRIMARY_COLOR = '#556cd6';
const SECONDARY_COLOR = '#19857b';
const ERROR_COLOR = red.A400;
const BG_COLOR = '#000000';

const DEFAULT_BP:any = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920
};

const breakpoints:any = {
  keys: ['xs', 'sm', 'md', 'lg', 'xl'],
  up: (key:string) => `@media (min-width:${DEFAULT_BP[key]}px)`
};

const palette:any = {
  type: 'dark',
  primary: {
    main: PRIMARY_COLOR
  },
  secondary: {
    main: SECONDARY_COLOR
  },
  error: {
    main: ERROR_COLOR
  },
  background: {
    default: BG_COLOR
  }
};

const typography = {
  fontFamily: 'Abel'
};

const theme = createMuiTheme({
  breakpoints,
  palette,
  typography
});

export default theme;
