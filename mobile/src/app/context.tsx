import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Session {
    dark: boolean;
}

const SessionContext = React.createContext<[Session, (value: Session) => void]>(
    null as any
);

export const SessionContextProvider: React.FC<any> = (props) => {
    const [state, setState] = React.useState<Session | { loading: true }>({
        loading: true,
    });

    React.useEffect(() => {
        setState({ loading: true });

        const load = async () => {
            const session = JSON.parse(
                (await AsyncStorage.getItem("session")) || "{}"
            );

            setState({
                ...session,
            });
        };

        load();
    }, []);

    if ("loading" in state) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator animating={true} size="large" />
            </View>
        );
    }

    return (
        <SessionContext.Provider
            value={[
                state,
                (value) => {
                    AsyncStorage.setItem(
                        "session",
                        JSON.stringify(value)
                    ).then(() => setState(value));
                },
            ]}
        >
            {props.children}
        </SessionContext.Provider>
    );
};

export const useSession = () => {
    return React.useContext(SessionContext);
};
