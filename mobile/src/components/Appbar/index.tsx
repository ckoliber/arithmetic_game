import React from "react";
import { Props } from "./props";
import { useStyles } from "./styles";

import { Appbar } from "react-native-paper";
import { DrawerActions } from "@react-navigation/native";

const Component: React.FC<Props> = (props) => {
    const classes = useStyles(props);

    return (
        <Appbar.Header style={classes.header}>
            {!props.scene.descriptor.options.headerBackTitle && (
                <Appbar.Action
                    icon="menu"
                    onPress={() => {
                        props.navigation.dispatch(DrawerActions.toggleDrawer());
                    }}
                    style={classes.action}
                />
            )}
            <Appbar.Content title={props.scene.descriptor.options.title} />
        </Appbar.Header>
    );
};

export default Component;
