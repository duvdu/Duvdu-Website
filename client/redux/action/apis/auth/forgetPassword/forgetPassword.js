import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const forgetpassword = ({ login }) => {
    return async dispatch => {
      dispatch({ type: Types.FETCH_DATA_REQUEST, req: 'forgetpassword' });
      try {
        const response = await mainApiInstance.patch(`api/users/auth/reset-password`, {
          login,
        });
        localStorage.setItem("OTP" , JSON.stringify(response.data?.code))
        dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data , req: 'forgetpassword'});
      } catch (error) {
        dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response) , req: 'forgetpassword'});
      }
    };
  };