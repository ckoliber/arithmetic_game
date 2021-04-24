import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { DefaultTheme } from "react-native-paper";

export interface Props extends DrawerContentComponentProps {
    theme: typeof DefaultTheme;
    session: any;
    setSession: (value: any) => void;
}
