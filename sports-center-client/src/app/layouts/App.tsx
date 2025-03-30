import '../styles/App.css'
import {AppBar, Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import Header from "./Header.tsx";
import useCustomTheme from "../hooks/useCustomTheme.jsx";
import {Outlet} from "react-router-dom";

// import {Product} from "./app/models/product.ts";

function App() {
    const {darkMode, handleThemeChange, theme} = useCustomTheme();
  return (
    <>
        <ThemeProvider theme={theme}>
            <CssBaseline></CssBaseline>
            <Header darkMode= {darkMode} handleThemeChange= {handleThemeChange}></Header>
            <Container>
                <Outlet />
            </Container>
        </ThemeProvider>

    </>
  )
}

export default App
