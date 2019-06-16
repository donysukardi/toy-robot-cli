import { renderHook, act } from 'react-hooks-testing-library';
import useBoardReducer, { defaultInitialState } from '../useBoardReducer';

describe('useBoardReducer', () => {
  it('should initialize to initialState', () => {
    const {
      result: { current },
    } = renderHook(() => useBoardReducer());
    const [state] = current;
    expect(state).toEqual(defaultInitialState);
  });
});
