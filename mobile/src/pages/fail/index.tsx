import React from "react";
import { Props } from "./props";
import { useStyles } from "./styles";

import { View, Image } from "react-native";
import { Title, Subheading, Paragraph, Button } from "react-native-paper";

const Component: React.FC<Props> = (props) => {
    const classes = useStyles(props);

    return (
        <View style={classes.root}>
            <View style={classes.image}>
                <Image
                    source={require("../../../assets/images/cancel.png")}
                    style={classes.imageView}
                />
                <Title style={classes.imageCaption}>Fail!</Title>
            </View>
            <Subheading style={classes.message}>
                {props.route.params?.expression}
                {"\n"}
                {props.route.params?.error}
            </Subheading>
            <Paragraph style={classes.score}>
                {props.route.params?.score}
            </Paragraph>
            <Button
                mode="contained"
                onPress={() => props.navigation.replace("question")}
            >
                Restart
            </Button>
        </View>
    );
};

export default Component;
