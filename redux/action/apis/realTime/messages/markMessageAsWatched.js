import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const MarkMessageAsWatched = ({id}) => {
  const req = "MarkMessageAsWatched"
  for(let [name, value] of data) {
    console.log(`${name} = ${value}`); // key1 = value1, then key2 = value2
  }
  return async dispatch => {
    try {
      const response = await mainApiInstance.patch(`api/message/65d46504d0e034a10a845d4f/chat`, data);
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
    } catch (error) {
        // console.log("error " , JSON.stringify(error.response))
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
    }
  };
};