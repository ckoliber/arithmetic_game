import React from "react";
import { Props } from "./props";
import { useStyles } from "./styles";

import { ScrollView, View, Image, Linking } from "react-native";
import { Title, Drawer } from "react-native-paper";
import { DrawerActions } from "@react-navigation/native";

const Component: React.FC<Props> = (props) => {
    const classes = useStyles(props);

    return (
        <ScrollView>
            <View style={classes.header}>
                <Image
                    source={require("../../../assets/images/logo.png")}
                    style={classes.logo}
                />
                <Title style={classes.title}>Arithmetic Game</Title>
            </View>
            <Drawer.Section>
                <Drawer.Item
                    icon={props.session.dark ? "brightness-7" : "brightness-2"}
                    label={props.session.dark ? "Light mode" : "Dark mode"}
                    onPress={() => {
                        props.navigation.dispatch(DrawerActions.closeDrawer());

                        props.setSession({
                            ...props.session,
                            dark: !props.session?.dark,
                        });
                    }}
                />
                <Drawer.Item
                    icon="phone"
                    label="Contact me"
                    onPress={() => {
                        props.navigation.dispatch(DrawerActions.closeDrawer());

                        Linking.openURL("https://koliber.ir")
                            .then(() => {})
                            .catch(() => {});
                    }}
                />
            </Drawer.Section>
        </ScrollView>
    );
};

export default Component;
