import React from "react";
import { Form, FormSpy } from "react-final-form";
import { numberField } from "./common";
import FormFields from "./FormFields";
import Layout, { CellGrid } from "./Layout";
import { InactiveCell } from "./Cell";
import { Box, Text } from "ink";
import { clampNumber } from "../core";

const MAX_WIDTH = 10;
const MAX_HEIGHT = 10;

export default function SizeScreen(props) {
  const { setAppMode, state, dispatch } = props;
  const [submission, setSubmission] = React.useState();
  const fields = React.useMemo(() => {
    const { width, height } = state;
    return [
      {
        name: "width",
        label: "width",
        placeholder: `${width}`,
        defaultValue: width,
        validate: x =>
          (Number.isInteger(x) && x < 1) || x > MAX_WIDTH
            ? `Invalid, 1 to 10 only`
            : undefined,
        ...numberField
      },
      {
        name: "height",
        label: "height",
        placeholder: `${height}`,
        defaultValue: height,
        validate: y =>
          (Number.isInteger(y) && y < 1) || y > MAX_HEIGHT
            ? `Invalid, 0 to 10 only`
            : undefined,
        ...numberField
      }
    ];
  }, [state]);

  React.useEffect(() => {
    if (submission) {
      setTimeout(() => {
        dispatch({ type: "INIT", payload: submission });
        setAppMode("PLACEMENT");
      });
    }
  }, [submission]);

  return (
    <Form onSubmit={values => setSubmission(values)}>
      {formProps => (
        <Layout
          grid={
            <FormSpy>
              {({ values }) => {
                const mergedState = {
                  ...state,
                  ...values
                };
                let { width, height } = mergedState;
                width = clampNumber(1, MAX_WIDTH, width);
                height = clampNumber(1, MAX_HEIGHT, height);

                return (
                  <CellGrid
                    {...mergedState}
                    width={width}
                    height={height}
                    renderCell={() => <InactiveCell>▢</InactiveCell>}
                  />
                );
              }}
            </FormSpy>
          }
          panel={
            <Box flexDirection="column">
              <Box marginBottom={1}>
                <Text bold>First, let's set the size of the table</Text>
              </Box>
              <FormFields fields={fields} {...formProps} />
            </Box>
          }
        />
      )}
    </Form>
  );
}
