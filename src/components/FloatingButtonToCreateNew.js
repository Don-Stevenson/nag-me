import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
// import EditIcon from '@material-ui/icons/Edit';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import NavigationIcon from '@material-ui/icons/Navigation';

// const useStyles = makeStyles(theme => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(3),
//     },
//     position: 'fixed'
//   },
//   extendedIcon: {
//     marginRight: theme.spacing(2),
//   },
//   fabStyle: {
//     left: 20,
//     right: 'auto',
//     position: 'fixed',
//   },
// }));

export default function FloatingActionButtons() {
  // const classes = useStyles();

  return (
    // <div>
      <Fab color="secondary" aria-label="add">
        <AddIcon />
      </Fab>
    //   {/* <Fab color="secondary" aria-label="edit">
    //     <EditIcon />
    //   </Fab>
    //   <Fab variant="extended">
    //     <NavigationIcon className={classes.extendedIcon} />
    //     Navigate
    //   </Fab>
    //   <Fab disabled aria-label="like">
    //     <FavoriteIcon />
    //   </Fab> */}
    // // </div>
  );
}
