import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { useTheme } from "react-native-paper";
import { useSession } from "~/app/context";

/**
 * Pages
 */
import Intro from "~/pages/intro";
import Question from "~/pages/question";
import Success from "~/pages/success";
import Fail from "~/pages/fail";

import AppbarLayout from "~/components/Appbar";
import DrawerLayout from "~/components/Drawer";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const StackQuestion = createStackNavigator();

const QuestionNavigator = () => {
    return (
        <StackQuestion.Navigator initialRouteName="question">
            <StackQuestion.Screen
                name="question"
                component={Question}
                options={{
                    header: AppbarLayout,
                    title: "Question",
                }}
            />
            <Stack.Screen
                name="success"
                component={Success}
                options={{
                    header: AppbarLayout,
                    title: "Success",
                }}
            />
            <Stack.Screen
                name="fail"
                component={Fail}
                options={{
                    header: AppbarLayout,
                    title: "Fail",
                }}
            />
        </StackQuestion.Navigator>
    );
};

const DrawerNavigator = () => {
    const theme = useTheme();
    const [session, setSession] = useSession();

    return (
        <Drawer.Navigator
            drawerContent={(props) => (
                <DrawerLayout
                    {...props}
                    theme={theme}
                    session={session}
                    setSession={setSession}
                />
            )}
        >
            <Drawer.Screen name="home" component={QuestionNavigator} />
        </Drawer.Navigator>
    );
};

const Component: React.FC<{}> = (props) => {
    return (
        <Stack.Navigator initialRouteName="intro">
            <Stack.Screen
                name="intro"
                component={Intro}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="home"
                component={DrawerNavigator}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
};

export default Component;
