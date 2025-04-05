import {AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import {ShoppingCart} from "@mui/icons-material";

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

const navLinks  = [
    {title: "Home", path: '/'},
    {title: "Store", path: '/store'},
    {title: "Contact", path: '/contact'}
]

const accountLinks = [
    {title: "Login", path: '/login'},
    {title: "Logout", path: '/logout'},
    {title: "Register", path: '/register'}
]

const navStyles = {
    color: 'inherit',
    typography: "h6",
    textDecoration: "none",
    '&:hover': {
        color: "secondary.main"
    },
    '&:active': {
        color: "text.secondary"
    }
}
const Header = ({darkMode, handleThemeChange}: Props) => {
    return (
      <AppBar position="sticky" sx={{mb: 2}}>
         <Toolbar variant="dense" sx={{
             display: "flex",
             justifyContent: "space-between",
             alignItems: 'center'
         }}>
             <Box display={'flex'} alignItems={'center'}>
                 <Typography>
                     Sports Center
                 </Typography>
                 <Switch checked={darkMode} onChange={handleThemeChange}></Switch>
             </Box>
             <List sx={{display:'flex'}}>
                 {
                     navLinks.map(({title, path}) => (
                         <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                             {title}
                         </ListItem>
                     ))
                 }
             </List>

             <Box display={'flex'} alignItems={'center'}>
                 <IconButton size="large" edge="start" color={"inherit"} sx={{mr: 2}}>
                     <Badge badgeContent={'4'} color={"secondary"}>
                         <ShoppingCart/>
                     </Badge>
                 </IconButton>
                 <List sx={{display: 'flex'}}>
                     {
                         accountLinks.map(({title, path}) => (
                             <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                                 {title}
                             </ListItem>
                         ))
                     }
                 </List>
             </Box>
         </Toolbar>
      </AppBar>
    );
}

export default Header;