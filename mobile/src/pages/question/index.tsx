import React from "react";
import { Props } from "./props";
import { useStyles } from "./styles";

import { View, Alert } from "react-native";
import {
    ActivityIndicator,
    Button,
    Paragraph,
    Title,
    FAB,
} from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { useQueryClient, useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { stringify } from "query-string";

import { API_SERVER } from "@env";

import NumberField from "~/components/Form/NumberField";

const Component: React.FC<Props> = (props) => {
    const classes = useStyles(props);

    const form = useForm();

    const client = useQueryClient();
    const [queryFilter, setQueryFilter] = React.useState({});
    const { isIdle, isLoading, isFetching, error, data } = useQuery(
        ["game", queryFilter],
        async () => {
            console.log("REQUESTING");

            const response = await fetch(`http://e3a7d3f9481d.ngrok.io/game`, {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded; charset=UTF-8",
                },
                body: stringify(queryFilter),
            });

            const result = await response.json();

            if (result.instruction === "End of game.") {
                props.navigation.replace("fail", result);
            }
            if (result.instruction === "Correct!") {
                props.navigation.replace("success", result);
            }

            return result;
        },
        {
            onError: (error: any) => {
                Alert.alert("Error", error.message, [
                    {
                        text: "Ok",
                    },
                ]);
            },
        }
    );

    useFocusEffect(() => {
        // client.invalidateQueries("game");
    });

    if (isIdle || isLoading || isFetching) {
        return (
            <View style={classes.loading}>
                <ActivityIndicator size="large" animating />
            </View>
        );
    }

    if (error) {
        return (
            <View style={classes.error}>
                <Button onPress={() => client.invalidateQueries("game")}>
                    Try again
                </Button>
            </View>
        );
    }

    console.log(JSON.stringify(data, undefined, 4));

    return (
        <View
            style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            {data && (
                <>
                    <View>
                        <Paragraph
                            style={{
                                fontWeight: "bold",
                            }}
                        >
                            {data.error}
                        </Paragraph>
                    </View>
                    <View>
                        <Title style={{ fontSize: 30 }}>
                            {data.expression}
                        </Title>
                    </View>
                    <View
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 8,
                        }}
                    >
                        <NumberField
                            style={{
                                flexGrow: 1,
                            }}
                            control={form.control}
                            name="text"
                            label="Answer"
                            dense
                        />

                        <FAB
                            style={{
                                flexGrow: 0,
                                marginLeft: 8,
                            }}
                            icon="send"
                            onPress={form.handleSubmit((data) =>
                                setQueryFilter(data)
                            )}
                        />
                    </View>
                </>
            )}
        </View>
    );
};

export default Component;
