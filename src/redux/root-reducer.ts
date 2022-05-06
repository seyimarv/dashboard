import { combineReducers } from "redux";
import configReducer from "./configuration/config.reducer";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage' //using localstorage
import productReducer from "./product/product.reducer";


// represent all the state(reducer) for the App

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['configuration', 'product'] //what i want to persist
}

const rootReducer = combineReducers({
    configuration: configReducer,
    product: productReducer
    
})

export default  persistReducer(persistConfig, rootReducer)