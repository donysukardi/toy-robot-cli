import React from 'react';
import { Form, FormSpy } from 'react-final-form';
import { Box, Text } from 'ink';
import SelectInput from './SelectInput';
import { numberField, DIRECTIONS_ARROW } from './common';
import FormFields from './FormFields';
import Layout, { CellGrid } from './Layout';
import { BlinkingActiveCell, InactiveCell } from './Cell';
import { DIRECTIONS, clampNumber } from '../core';

export default function PlacementScreen(props) {
  const { setAppMode, state, dispatch } = props;
  const [submission, setSubmission] = React.useState();
  const fields = React.useMemo(() => {
    const { x, y, width, height, direction } = state;
    return [
      {
        name: 'x',
        label: 'x',
        placeholder: `${x}`,
        defaultValue: x,
        validate: x =>
          (Number.isInteger(x) && x < 0) || x >= width
            ? `Invalid, 0 to ${width - 1} only`
            : undefined,
        ...numberField,
      },
      {
        name: 'y',
        label: 'y',
        placeholder: `${y}`,
        defaultValue: y,
        validate: y =>
          (Number.isInteger(y) && y < 0) || y >= height
            ? `Invalid, 0 to ${height - 1} only`
            : undefined,
        ...numberField,
      },
      {
        name: 'direction',
        label: 'direction',
        placeholder: DIRECTIONS[direction],
        Input: SelectInput,
        format: x => DIRECTIONS[x],
        inputConfig: {
          initialIndex: direction,
          items: DIRECTIONS.map((x, idx) => ({
            label: x,
            value: idx,
          })),
        },
      },
    ];
  }, [state]);

  React.useEffect(() => {
    if (submission) {
      setTimeout(() => {
        dispatch({ type: 'PLACE', payload: submission });
        setAppMode('PLAY_SELECT');
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
                  ...values,
                };
                const { direction, width, height } = mergedState;
                let { x, y } = mergedState;
                x = clampNumber(0, width - 1, x);
                y = clampNumber(0, height - 1, y);

                return (
                  <CellGrid
                    {...mergedState}
                    x={x}
                    y={y}
                    renderCell={({ active, ...props }) =>
                      active ? (
                        <BlinkingActiveCell {...props}>
                          {DIRECTIONS_ARROW[direction]}
                        </BlinkingActiveCell>
                      ) : (
                        <InactiveCell {...props}>▢</InactiveCell>
                      )
                    }
                  />
                );
              }}
            </FormSpy>
          }
          panel={
            <Box flexDirection="column">
              <Box marginBottom={1}>
                <Text bold>Now, let's place our toy robot</Text>
              </Box>
              <FormFields fields={fields} {...formProps} />
            </Box>
          }
        />
      )}
    </Form>
  );
}
