import {AppBar, Switch, Toolbar, Typography} from "@mui/material";

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}
const Header = ({darkMode, handleThemeChange}: Props) => {
    return (
      <AppBar position="sticky" sx={{mb: 2}}>
         <Toolbar variant="dense">
             <Typography>
                 Sports Center
             </Typography>
         <Switch checked={darkMode} onChange={handleThemeChange}></Switch>
         </Toolbar>
      </AppBar>
    );
}

export default Header;