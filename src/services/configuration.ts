import axios from "axios"
import { setConfigError } from "../redux/configuration/config.action"
import { AppDispatch } from "../redux/types"


export const getConfiguration = async (actionFunction: any, dispatch: AppDispatch) => {
    try {
      const response = await axios.get("https://api-test.innoloft.com//configuration/1/")
      if(response) {
          dispatch(actionFunction(response.data))
      }
    } catch(err) {
       dispatch(setConfigError("an error occured"))
    }
}