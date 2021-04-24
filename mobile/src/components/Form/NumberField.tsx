import React from "react";

import { View } from "react-native";
import { TextInput, HelperText } from "react-native-paper";
import { Controller } from "react-hook-form";

const Component: React.FC<any> = ({ name, control, ...rest }) => {
    return (
        <Controller
            control={control}
            render={({ field, fieldState }) => (
                <View {...rest}>
                    <TextInput
                        {...field}
                        onChangeText={field.onChange}
                        mode="outlined"
                        keyboardType={"numeric"}
                        error={fieldState.error && fieldState.isTouched}
                        {...rest}
                    />
                    {fieldState.error && fieldState.isTouched && (
                        <HelperText type="error" visible>
                            {fieldState.error}
                        </HelperText>
                    )}
                </View>
            )}
            name={name}
            rules={{ required: true }}
            defaultValue=""
        />
    );
};

export default Component;
