import React from "react";
import { Props } from "./props";
import { useStyles } from "./styles";

import { ImageBackground, View } from "react-native";
import { Text, Card, Button, Paragraph } from "react-native-paper";

const Component: React.FC<Props> = (props) => {
    const classes = useStyles(props);

    return (
        <ImageBackground
            source={require("../../../assets/images/background.jpg")}
            style={classes.root}
            imageStyle={classes.image}
        >
            <Text style={classes.title}>Arithmetic Game</Text>
            <View>
                <Card style={classes.content}>
                    <Card.Content>
                        <Paragraph>
                            Try to answer the following questions correctly and
                            quickly. Press the button to proceed and to send
                            input from the text field that will appear. You can
                            also press 'Enter' to send input from the text
                            field. You can quit and show your score by typing
                            'quit' into the field.
                        </Paragraph>
                    </Card.Content>
                    <Card.Actions>
                        <Button
                            onPress={() => props.navigation.navigate("home")}
                            mode="contained"
                        >
                            Let's Go
                        </Button>
                    </Card.Actions>
                </Card>
            </View>
            <View />
        </ImageBackground>
    );
};

export default Component;
