import React from "react";
import { Props } from "./props";
import { useStyles } from "./styles";

import { View, Image } from "react-native";
import { Title, Subheading, Button } from "react-native-paper";

const Component: React.FC<Props> = (props) => {
    const classes = useStyles(props);

    return (
        <View
            style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 8,
            }}
        >
            <View></View>
            <View
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Image
                    source={require("../../../assets/images/checked.png")}
                    style={{
                        width: 200,
                        height: 200,
                        margin: 16,
                    }}
                />
                <Title style={{ fontSize: 30 }}>Success!</Title>
            </View>
            <Subheading style={{ fontWeight: "bold", textAlign: "center" }}>
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
