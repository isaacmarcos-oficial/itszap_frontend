import React, { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";

import { ptBR } from "@material-ui/core/locale";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import ColorModeContext from "./layout/themeContext";
import { SocketContext, SocketManager } from './context/Socket/SocketContext';

import Routes from "./routes";

const queryClient = new QueryClient();

const App = () => {
    const [locale, setLocale] = useState();

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const preferredTheme = window.localStorage.getItem("preferredTheme");
    const [mode, setMode] = useState(preferredTheme ? preferredTheme : prefersDarkMode ? "dark" : "light");

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
            },
        }),
        []
    );

    const theme = createTheme(
        {
            scrollbarStyles: {
                "&::-webkit-scrollbar": {
                    width: '8px',
                    height: '8px',
                },
                "&::-webkit-scrollbar-thumb": {
                    boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
                    backgroundColor: "#367f48",
                },
            },
            scrollbarStylesSoft: {
                "&::-webkit-scrollbar": {
                    width: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: mode === "light" ? "#F3F3F3" : "#0c1317",
                },
            },
            palette: {
                type: mode,
                primary: { main: mode === "light" ? "#367f48" : "#FFFFFF" },
                textPrimary: mode === "light" ? "#367f48" : "#FFFFFF",
                borderPrimary: mode === "light" ? "#367f48" : "#FFFFFF",
                dark: { main: mode === "light" ? "#0c1317" : "#F3F3F3" },
                light: { main: mode === "light" ? "#F3F3F3" : "#0c1317" },
                tabHeaderBackground: mode === "light" ? "#EEE" : "#202c33",
                optionsBackground: mode === "light" ? "#fafafa" : "#111b21",
				options: mode === "light" ? "#fafafa" : "#202c33",
				fontecor: mode === "light" ? "#128c7e" : "#fff",
                fancyBackground: mode === "light" ? "#fafafa" : "#111b21",
				bordabox: mode === "light" ? "#eee" : "#111b21",
				newmessagebox: mode === "light" ? "#eee" : "#111b21",
				inputdigita: mode === "light" ? "#fff" : "#202c33",
				contactdrawer: mode === "light" ? "#fff" : "#202c33",
				announcements: mode === "light" ? "#ededed" : "#111b21",
				login: mode === "light" ? "#fff" : "#1C1C1C",
				announcementspopover: mode === "light" ? "#fff" : "#202c33",
				chatlist: mode === "light" ? "#eee" : "#202c33",
				boxlist: mode === "light" ? "#ededed" : "#202c33",
				boxchatlist: mode === "light" ? "#ededed" : "#111b21",
                total: mode === "light" ? "#fff" : "#222",
                messageIcons: mode === "light" ? "grey" : "#F3F3F3",
                inputBackground: mode === "light" ? "#FFFFFF" : "#111b21",
                barraSuperior: mode === "light" ? "linear-gradient(to right, #367f48, #367f48 , #367f48)" : "#202c33",
				boxticket: mode === "light" ? "#EEE" : "#202c33",
				campaigntab: mode === "light" ? "#ededed" : "#202c33",
				mediainput: mode === "light" ? "#ededed" : "#1c1c1c",
            },
            mode,
        },
        locale
    );

    useEffect(() => {
        const i18nlocale = localStorage.getItem("i18nextLng");
        const browserLocale =
            i18nlocale.substring(0, 2) + i18nlocale.substring(3, 5);

        if (browserLocale === "ptBR") {
            setLocale(ptBR);
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem("preferredTheme", mode);
    }, [mode]);



    return (
        <ColorModeContext.Provider value={{ colorMode }}>
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                  <SocketContext.Provider value={SocketManager}>
                      <Routes />
                  </SocketContext.Provider>
                </QueryClientProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default App;
