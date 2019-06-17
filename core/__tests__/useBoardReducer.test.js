import { renderHook, act } from 'react-hooks-testing-library';
import { DIRECTIONS_MAP } from '../constants';
import useBoardReducer, { defaultInitialState } from '../useBoardReducer';

describe('useBoardReducer', () => {
  it('should initialize to defaultInitialState', () => {
    const {
      result: { current },
    } = renderHook(() => useBoardReducer());
    const [state] = current;
    expect(state).toEqual(defaultInitialState);
  });

  it('should initialize to provided initialState', () => {
    const customInitialState = {
      x: 5,
      y: 5,
      width: 10,
      height: 10,
      direction: DIRECTIONS_MAP.NORTH,
    };

    const {
      result: { current },
    } = renderHook(() => useBoardReducer(customInitialState));

    const [state] = current;
    expect(state).toEqual(customInitialState);
  });

  it('should handle INIT action with valid width and height', () => {
    const { result } = renderHook(() => useBoardReducer());
    const [, dispatch] = result.current;

    act(() => {
      dispatch({ type: 'INIT', payload: { width: 10, height: 10 } });
    });

    expect(result.current[0]).toEqual({
      x: 0,
      y: 0,
      width: 10,
      height: 10,
      direction: DIRECTIONS_MAP.NORTH,
    });
  });

  it('should handle INIT action and clamp x and y to given width and height', () => {
    const customInitialState = {
      x: 5,
      y: 5,
      width: 10,
      height: 10,
      direction: DIRECTIONS_MAP.NORTH,
    };
    const { result } = renderHook(() => useBoardReducer(customInitialState));
    const [, dispatch] = result.current;

    act(() => {
      dispatch({ type: 'INIT', payload: { width: 5, height: 5 } });
    });

    expect(result.current[0]).toEqual({
      x: 4,
      y: 4,
      width: 5,
      height: 5,
      direction: DIRECTIONS_MAP.NORTH,
    });
  });

  it('should handle INIT action with invalid width and height', () => {
    const { result } = renderHook(() => useBoardReducer());
    const [, dispatch] = result.current;

    act(() => {
      dispatch({ type: 'INIT', payload: { width: -1, height: -1 } });
    });

    expect(result.current[0]).toEqual({
      ...defaultInitialState,
      width: 1,
      height: 1,
    });
  });

  it('should handle PLACE action with valid x and y', () => {
    const { result } = renderHook(() => useBoardReducer());
    const [, dispatch] = result.current;

    act(() => {
      dispatch({
        type: 'PLACE',
        payload: { x: 3, y: 3, direction: DIRECTIONS_MAP.EAST },
      });
    });

    expect(result.current[0]).toEqual({
      ...defaultInitialState,
      x: 3,
      y: 3,
      direction: DIRECTIONS_MAP.EAST,
    });
  });

  it('should handle PLACE action with invalid x and y', () => {
    const { result } = renderHook(() => useBoardReducer());
    const [, dispatch] = result.current;

    act(() => {
      dispatch({
        type: 'PLACE',
        payload: { x: 10, y: 10, direction: DIRECTIONS_MAP.WEST },
      });
    });

    expect(result.current[0]).toEqual({
      ...defaultInitialState,
      x: 4,
      y: 4,
      direction: DIRECTIONS_MAP.WEST,
    });
  });

  it('should handle LEFT action', () => {
    const customInitialState = {
      x: 0,
      y: 0,
      width: 1,
      height: 1,
      direction: DIRECTIONS_MAP.NORTH,
    };
    const { result } = renderHook(() => useBoardReducer(customInitialState));
    const [, dispatch] = result.current;

    act(() => {
      dispatch({ type: 'LEFT' });
    });

    expect(result.current[0]).toEqual({
      ...customInitialState,
      direction: DIRECTIONS_MAP.WEST,
    });

    act(() => {
      dispatch({ type: 'LEFT' });
    });

    expect(result.current[0]).toEqual({
      ...customInitialState,
      direction: DIRECTIONS_MAP.SOUTH,
    });
  });

  it('should handle RIGHT action', () => {
    const customInitialState = {
      x: 0,
      y: 0,
      width: 1,
      height: 1,
      direction: DIRECTIONS_MAP.NORTH,
    };

    const { result } = renderHook(() => useBoardReducer(customInitialState));
    const [, dispatch] = result.current;

    act(() => {
      dispatch({ type: 'RIGHT' });
    });

    expect(result.current[0]).toEqual({
      ...customInitialState,
      direction: DIRECTIONS_MAP.EAST,
    });

    act(() => {
      dispatch({ type: 'RIGHT' });
      dispatch({ type: 'RIGHT' });
      dispatch({ type: 'RIGHT' });
    });

    expect(result.current[0]).toEqual({
      ...customInitialState,
      direction: DIRECTIONS_MAP.NORTH,
    });
  });

  it('should handle MOVE action onto EAST direction', () => {
    const customInitialState = {
      x: 0,
      y: 0,
      direction: DIRECTIONS_MAP.EAST,
      width: 2,
      height: 2,
    };

    const { result } = renderHook(() => useBoardReducer(customInitialState));
    const [, dispatch] = result.current;

    act(() => {
      dispatch({ type: 'MOVE' });
    });

    expect(result.current[0]).toEqual({
      ...customInitialState,
      x: 1,
      y: 0,
    });

    act(() => {
      dispatch({ type: 'MOVE' });
    });

    expect(result.current[0]).toEqual({
      ...customInitialState,
      x: 1,
      y: 0,
    });
  });

  it('should handle MOVE action onto SOUTH direction', () => {
    const customInitialState = {
      x: 0,
      y: 1,
      direction: DIRECTIONS_MAP.SOUTH,
      width: 2,
      height: 2,
    };

    const { result } = renderHook(() => useBoardReducer(customInitialState));
    const [, dispatch] = result.current;

    act(() => {
      dispatch({ type: 'MOVE' });
    });

    expect(result.current[0]).toEqual({
      ...customInitialState,
      x: 0,
      y: 0,
    });

    act(() => {
      dispatch({ type: 'MOVE' });
    });

    expect(result.current[0]).toEqual({
      ...customInitialState,
      x: 0,
      y: 0,
    });
  });

  it('should handle MOVE action onto WEST direction', () => {
    const customInitialState = {
      x: 1,
      y: 0,
      direction: DIRECTIONS_MAP.WEST,
      width: 2,
      height: 2,
    };

    const { result } = renderHook(() => useBoardReducer(customInitialState));
    const [, dispatch] = result.current;

    act(() => {
      dispatch({ type: 'MOVE' });
    });

    expect(result.current[0]).toEqual({
      ...customInitialState,
      x: 0,
      y: 0,
    });

    act(() => {
      dispatch({ type: 'MOVE' });
    });

    expect(result.current[0]).toEqual({
      ...customInitialState,
      x: 0,
      y: 0,
    });
  });

  it('should handle MOVE action onto NORTH direction', () => {
    const customInitialState = {
      x: 0,
      y: 0,
      direction: DIRECTIONS_MAP.NORTH,
      width: 2,
      height: 2,
    };

    const { result } = renderHook(() => useBoardReducer(customInitialState));
    const [, dispatch] = result.current;

    act(() => {
      dispatch({ type: 'MOVE' });
    });

    expect(result.current[0]).toEqual({
      ...customInitialState,
      x: 0,
      y: 1,
    });

    act(() => {
      dispatch({ type: 'MOVE' });
    });

    expect(result.current[0]).toEqual({
      ...customInitialState,
      x: 0,
      y: 1,
    });
  });

  it('should throw error given invalid action type', () => {
    const { result } = renderHook(() => useBoardReducer());
    const [, dispatch] = result.current;

    act(() => {
      dispatch({ type: 'SOME_NON_EXISTENT_TYPE' });
    });

    expect(result.error).toBeDefined();
  });
});
