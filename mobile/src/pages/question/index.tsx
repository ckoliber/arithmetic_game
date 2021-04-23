import React from "react";
import { Props } from "./props";
import { useStyles } from "./styles";

import { ScrollView, RefreshControl, View, Alert } from "react-native";
import { Button, Title, List, Text } from "react-native-paper";
import { useQueryClient, useQuery } from "react-query";

import { API_SERVER } from "@env";

const Component: React.FC<Props> = (props) => {
    const classes = useStyles(props);

    const client = useQueryClient();
    const { isIdle, isLoading, isFetching, error, data } = useQuery(
        "game",
        () => fetch(`${API_SERVER}/game`, {}),
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
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={isIdle || isLoading || isFetching}
                    onRefresh={() => client.invalidateQueries("game")}
                />
            }
        >
            {data && <Text>{JSON.stringify(data)}</Text>}
        </ScrollView>
    );
};

export default Component;
