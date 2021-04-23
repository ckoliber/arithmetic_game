import { DrawerContentComponentProps } from "@react-navigation/drawer";

export interface Props extends DrawerContentComponentProps {
    session: any;
    setSession: (value: any) => void;
}
