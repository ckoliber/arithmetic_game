import React from "react";
import { Props } from "./props";
import { useStyles } from "./styles";

import { View, Image } from "react-native";
import { Title, Subheading, Button } from "react-native-paper";

const Component: React.FC<Props> = (props) => {
    const classes = useStyles(props);

    return (
        <View style={classes.root}>
            <View></View>
            <View style={classes.image}>
                <Image
                    source={require("../../../assets/images/checked.png")}
                    style={classes.imageView}
                />
                <Title style={classes.imageCaption}>Success!</Title>
            </View>
            <Subheading style={classes.message}>
                {props.route.params?.expression}
            </Subheading>
            <Button
                mode="contained"
                onPress={() => props.navigation.replace("question")}
            >
                Continue
            </Button>
        </View>
    );
};

export default Component;
