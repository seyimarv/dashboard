import axios from "axios"
import { setProductError } from "../redux/product/product.action"
import { AppDispatch } from "../redux/types"


export const getProducts = async (actionFunction: any, dispatch: AppDispatch) => {
    try {
      const response = await axios.get("https://api-test.innoloft.com///product/6781/")
      if(response) {
          dispatch(actionFunction(response.data))
      }
    } catch(err) {
        dispatch(setProductError("an error occured"))
    }
}

export const getTrl = async() => {
    try {
        const response = await axios.get("https://api-test.innoloft.com///trl/")
        return response
      } catch(err) {
         alert("an error occured, please check your network connection")
      }
}

export const editData = async(actionFunction: any, dispatch: AppDispatch, data: any) => {
    try {
        const response = await axios.put("https://api-test.innoloft.com///product/6781/", data)
        if(response) {
            dispatch(actionFunction(data))
        }
      } catch(err) {
         alert("an error occured, please check your network")
      }

}