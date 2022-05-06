import { configurationType } from "../types";

interface StateType {
  configuration: configurationType;
  isLoading: boolean;
  error: string;
}



const INITIAL_STATE = {
  configuration: {
    id: null,
    hasUserSection: false,
    mainColor: "",
    logo: "",
  },
  isLoading: false,
  error: ''
};

const userReducer = (
  state: StateType = INITIAL_STATE,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "DATA_LOADING":
      return { ...state, isLoading: true, error: '' };
    case "SET_CONFIGURATION":
      return {
        ...state,
        configuration: action.payload,
        isLoading: false,
        error: ''
      };
    case "SET_CONFIGURATION_FAIL":
      return {
        configuration: {
            id: null,
            hasUserSection: false,
            mainColor: "",
            logo: "",
          },
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
