export const setProduct = (product: any)  => ({
    type: "SET_PRODUCT",
    payload: product
})

export const dataLoading =  () => ({
    type: "DATA_LOADING"
})

export const setProductError = (error: string) => ({
    type: "SET_PRODUCT_FAIL",
    payload: error
})