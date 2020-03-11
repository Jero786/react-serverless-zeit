import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    header: {
      marginTop: '3em'
    },
    root: {
      maxWidth: '950px',
      display: 'flex',
      flexDirection: 'column'
    },
    body: {
      margin: 0,
      maxWidth: '950px'
    },
    poster: {
      maxHeight: '400px'
    },
    breadcrumb: {
      padding: '1em'
    },
    movieBox: {
      display: 'flex'
    },
    overview: {
      paddingLeft: '1em'
    }
  })
);

export default useStyles;
