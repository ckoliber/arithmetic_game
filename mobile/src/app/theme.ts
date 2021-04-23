import {
    DefaultTheme as PaperDefaultTheme,
    DarkTheme as PaperDarkTheme,
} from "react-native-paper";
import {
    DefaultTheme as NavigationDefaultTheme,
    DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";

const theme = (dark: boolean): any => ({
    ...(!dark && PaperDefaultTheme),
    ...(!dark && NavigationDefaultTheme),
    ...(dark && PaperDarkTheme),
    ...(dark && NavigationDarkTheme),
    colors: {
        ...(!dark && PaperDefaultTheme.colors),
        ...(!dark && NavigationDefaultTheme.colors),
        ...(dark && PaperDarkTheme.colors),
        ...(dark && NavigationDarkTheme.colors),
        primary: "#286da8",
        accent: "#cd5360",
    },
});

export default theme;
