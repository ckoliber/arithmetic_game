import React from "react";

/**
 * I18n Provider
 */
import { BackHandler, AppState, LogBox, Alert } from "react-native";

/**
 * Context Provider
 */
import { SessionContextProvider, useSession } from "./context";

/**
 * Splash Provider
 */
import Splash from "react-native-splash-screen";

/**
 * Query Provider
 */
import { QueryClientProvider, QueryClient } from "react-query";
const client = new QueryClient();

/**
 * Paper Provider
 */
import { Provider as PaperProvider } from "react-native-paper";
import theme from "./theme";

/**
 * Router Provider
 */
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./router";

const App = () => {
    const [session] = useSession();

    return (
        <QueryClientProvider client={client}>
            <PaperProvider theme={theme(session.dark)}>
                <SafeAreaProvider>
                    <NavigationContainer theme={theme(session.dark)}>
                        <Router />
                    </NavigationContainer>
                </SafeAreaProvider>
            </PaperProvider>
        </QueryClientProvider>
    );
};

const Component = () => {
    const handleBackButton = () => {
        Alert.alert(
            "Quit",
            "Are your sure you want to quit?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Ok",
                    onPress: () => BackHandler.exitApp(),
                },
            ],
            {
                cancelable: false,
            }
        );

        return true;
    };

    React.useEffect(() => {
        /**
         * Disable timer warning
         */
        LogBox.ignoreLogs(["Setting a timer", "Require cycle"]);

        /**
         * Hide splash screen
         */
        Splash.hide();

        /**
         * Back button handler
         */
        BackHandler.addEventListener("hardwareBackPress", handleBackButton);
        return () => {
            BackHandler.removeEventListener(
                "hardwareBackPress",
                handleBackButton
            );
        };
    }, [React.useRef(AppState.currentState)]);

    return (
        <SessionContextProvider>
            <App />
        </SessionContextProvider>
    );
};

export default Component;
