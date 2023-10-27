import minicoreApi from "../../api/minicoreApi";
import { setSales, setSavingSale } from "./saleSlice";

export const startFetchingSales = (values = {}) => {
  return async (dispatch) => {
    dispatch(setSavingSale());
    const { valueStartDate, valueEndDate } = values;
    console.log({valueStartDate, valueEndDate});
    try {
      const { data: axiosData, status } = await minicoreApi.get(
        `sales?startDate=${valueStartDate}&endDate=${valueEndDate}`
      )
      const { total, data } = axiosData;
      console.log({data})
      dispatch(setSales({
        sales: data,
        total
      }));
    } catch ({ response, request, message, status }) {
      if (response) {
        console.error(response.data);
      } else if (request) {
        dispatch(setSavingSale({
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