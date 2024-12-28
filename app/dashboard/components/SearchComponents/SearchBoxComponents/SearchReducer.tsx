export const initialState = {
  searchQuery: "",
  isLoading: false,
  error: null,
};

interface State {
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
}

interface Action {
  type: string;
  payload?: any;
}

export const searchReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, searchQuery: action.payload };
    case "START_LOADING":
      return { ...state, isLoading: true };
    case "STOP_LOADING":
      return { ...state, isLoading: false };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
};
