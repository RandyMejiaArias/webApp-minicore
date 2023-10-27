import minicoreApi from "../../api/minicoreApi";
import { setProducts, setSavedProduct, setSavingProduct } from "./productSlice";

export const startFetchingProducts = (values = {}) => {
  return async (dispatch) => {
    dispatch(setSavingProduct());
    
    try {
      const { data: axiosData, status } = await minicoreApi.get(
        `products`
      )
      const { total, data } = axiosData;

      dispatch(setProducts({
        products: data,
        total
      }));
    } catch ({ response, request, message, status }) {
      if (response) {
        console.error(response.data);
      } else if (request) {
        dispatch(setSavingProduct({
          message: 'Error on connect with server.',
          status: 500
        }));
        console.error(request);
      } else {
        console.log('Error', message);
      }
    }
  }
};

export const startSavingSale = (values = {}) => {
  return async (dispatch) => {
    dispatch(setSavingProduct());

    const dataToUpload = values;
    try {
      const { data, status } = await minicoreApi.post(
        'sales',
        dataToUpload
      )
      data.status = status;
      console.log({data, status})
      dispatch(setSavedProduct(data));
    } catch ({ response, request, message, status }) {
      console.log('has error');
      if (response) {
        console.log('response error');
        console.error(response.data);
      } else if (request) {
        dispatch(setSavedContract({
          message: 'Error on connect with server.',
          status: 500
        }));
        console.error(request);
      } else {
        console.log('Error', message);
      }
    }
  }
}