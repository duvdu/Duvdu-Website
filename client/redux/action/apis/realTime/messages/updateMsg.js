import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const UpdateMessageInChat = () => {
  const req = "UpdateMessageInChat"
  return async dispatch => {
    try {
        const response = await mainApiInstance.get(`api/message/662ff6502190713387540d0e`,);
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
    } catch (error) {
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
    }
  };
};
