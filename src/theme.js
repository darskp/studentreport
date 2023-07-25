import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#00ce95',
            bg: {
                grey: '#E5E5E5',
                white: "white"
            }
        },
        secondary: {
            main: '#eb3e68',
        }
    },
    typography: {
        fontFamily: "sans-serif",
        fontSize: 10,
        h5: {
            color: '#4d4d4d'
        },
        h6: {
            color: '#4d4d4d'
        },
        body1: {
            color: '#4d4d4d',
            fontWeight: 700
        }
    },
});

export default theme;
