import { store } from "./store";

export interface configurationType {
    id: number | null;
    hasUserSection: boolean;
    logo: string;
    mainColor: string;
}

export interface setConfigError {
    type: "SET_CONFIGURATION_FAIL";
}

export interface setConfiguration {
    type: "SET_CONFIGURATION";
    payload: configurationType;
}

export interface dataLoading {
    type: "DATA_LOADING";
}

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch