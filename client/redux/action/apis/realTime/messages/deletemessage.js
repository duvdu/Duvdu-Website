import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const DeleteMessageInChat = () => {
  const req = "DeleteMessageInChat"
  return async dispatch => {
    try {
        const response = await mainApiInstance.delete(`api/message/6630d3f4096ed4e2cb6be493`,);
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
    } catch (error) {
        // 
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
    }
  };
};