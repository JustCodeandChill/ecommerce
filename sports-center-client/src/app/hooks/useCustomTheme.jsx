import {useState} from "react";
import {createTheme} from "@mui/material";

const useCustomTheme = () => {
    const [darkMode, setDarkMode] = useState(false);
    const paletteType = darkMode ? 'dark' : 'light';
    const theme = createTheme({
        palette: {
            mode: paletteType
        }
    })
    const handleThemeChange = () => {
        setDarkMode(darkMode => !darkMode);
    }

    return {darkMode, paletteType, theme, handleThemeChange}
}

export default useCustomTheme;