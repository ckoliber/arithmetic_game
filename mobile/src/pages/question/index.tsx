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
            const response = await fetch(`${API_SERVER}/game`, {
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

    return (
        <View style={classes.root}>
            {data && (
                <>
                    <Paragraph style={classes.message}>{data.error}</Paragraph>
                    <Title style={classes.expression}>{data.expression}</Title>
                    <View style={classes.form}>
                        <NumberField
                            style={classes.formInput}
                            control={form.control}
                            label="Answer"
                            name="text"
                            dense
                        />

                        <FAB
                            style={classes.formSubmit}
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
