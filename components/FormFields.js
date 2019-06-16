import React from "react";
import { Field } from "react-final-form";
import { Box, Color, Text } from "ink";
import { changeExt } from "upath";

export default function FormFields({ fields, form, handleSubmit, validating }) {
  const [activeField, setActiveField] = React.useState(0);

  return (
    <Box flexDirection="column">
      {fields.map(
        (
          {
            name,
            label,
            placeholder,
            format,
            parse,
            validate,
            defaultValue,
            Input,
            inputConfig
          },
          index
        ) => (
          <Field
            name={name}
            key={name}
            format={format}
            parse={parse}
            validate={validate}
          >
            {({ input, meta }) => (
              <Box flexDirection="column">
                <Box>
                  <Text bold={activeField === index}>{label}: </Text>
                  {activeField === index ? (
                    <Input
                      {...input}
                      {...inputConfig}
                      placeholder={placeholder}
                      onSubmit={() => {
                        if (meta.valid && !validating) {
                          if (
                            typeof defaultValue !== "undefined" &&
                            (typeof input.value === "undefined" ||
                              input.value === "")
                          ) {
                            form.change(name, defaultValue);
                          }

                          setActiveField(value => value + 1); // go to next field
                          if (activeField === fields.length - 1) {
                            // last field, so submit
                            handleSubmit();
                          }
                        } else {
                          input.onBlur(); // mark as touched to show error
                        }
                      }}
                    />
                  ) : (
                    (input.value && <Text>{input.value}</Text>) ||
                    (placeholder && <Color gray>{placeholder}</Color>)
                  )}
                  {meta.invalid && meta.touched && (
                    <Box marginLeft={2}>
                      <Color red>
                        ✖{meta.error && meta.touched && ` ${meta.error}`}
                      </Color>
                    </Box>
                  )}
                  {meta.valid && meta.touched && !meta.active && (
                    <Box marginLeft={2}>
                      <Color green>✔</Color>
                    </Box>
                  )}
                </Box>
              </Box>
            )}
          </Field>
        )
      )}
    </Box>
  );
}
