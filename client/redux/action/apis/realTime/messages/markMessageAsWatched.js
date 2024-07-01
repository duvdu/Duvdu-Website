import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const MarkMessageAsWatched = ({id}) => {
  const req = "MarkMessageAsWatched"

  return async dispatch => {
    try {
      const response = await mainApiInstance.patch(`api/message/65d46504d0e034a10a845d4f/chat`, data);
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
    } catch (error) {
       dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
    }
  };
};