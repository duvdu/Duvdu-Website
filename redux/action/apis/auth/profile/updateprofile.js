import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const updateProfile = ({id}) => {
    return async dispatch => {
      dispatch({ type: Types.FETCH_DATA_REQUEST });
      try {
        const response = await mainApiInstance.patch(`api/users/auth/profile` + id, {
          newpassword: newpassword
        });
        dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data });
      } catch (error) {
        dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response) });
      }
    };
  };
  
  