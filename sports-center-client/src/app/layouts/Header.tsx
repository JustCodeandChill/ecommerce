import {AppBar, Toolbar, Typography} from "@mui/material";

const Header = () => {
    return (
      <AppBar position="static">
         <Toolbar variant="dense">
             <Typography>
                 Sports Center
             </Typography>
         </Toolbar>
      </AppBar>
    );
}

export default Header;