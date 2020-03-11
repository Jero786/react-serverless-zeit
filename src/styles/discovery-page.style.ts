import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const appBarHigh = '140px';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputSearch: {},
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      overflow: 'hidden',
      justifyContent: 'space-around'
    },
    header: {
      position: 'fixed',
      zIndex: theme.zIndex.appBar,
      backgroundColor: 'rgb(0,0,0, 0.5)',
      maxWidth: '950px',
      margin: 'auto',
      top: 0,
      left: 0,
      right: 0,
      paddingLeft: '2vw'
    },
    body: {
      marginTop: appBarHigh,
      paddingTop: ''
    },
    gridList: {
      cursor: 'pointer'
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)'
    }
  })
);

export default useStyles;
