import { configurationType } from "../types";

export const setConfiguration = (config: configurationType)  => ({
    type: "SET_CONFIGURATION",
    payload: config
})

export const dataLoading =  () => ({
    type: "DATA_LOADING"
})

export const setConfigError = (error: string) => ({
    type: "SET_CONFIGURATION_FAIL",
    payload: error
})