import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'

export const BookProducer = (id,data) => {
  
  const req = "BookProducer"
  return async dispatch => {
    if(!id) {
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: null, req: req });
      return 
    }
    // for(let [name, value] of data) {
    //   console.log(`${name} = ${value}`); 
    // }
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
    try {
      const response = await mainApiInstance.post(`api/producers/book`, data);
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
    } catch (error) {
        // console.log("error " , JSON.stringify(error.response))
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
    }
  };
};