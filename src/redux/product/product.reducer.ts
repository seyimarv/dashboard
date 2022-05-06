interface StateType {
  product: any;
  isLoading: boolean;
  error: string;
}
const INITIAL_STATE = {
  product: null,
  isLoading: false,
  error: ''
};

const productReducer = (
  state: StateType = INITIAL_STATE,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "DATA_LOADING":
      return { ...state, isLoading: true, error: ''};
    case "SET_PRODUCT":
      return {
        ...state,
        product: action.payload,
        isLoading: false,
        error: ''
      };
    case "SET_PRODUCT_FAIL":
      return {
        product: null,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default productReducer;
