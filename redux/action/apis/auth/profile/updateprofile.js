import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const updateProfile = ({ id, data }) => {
  return async dispatch => {
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: 'updateProfile' });
    try {
      let formData = new FormData();
        formData.append('name', data.name);
        formData.append('about', data.about);
        // formData.append('category', data.category);
        // formData.append('coverImage', data.coverImage);
        // formData.append('profileImage', data.profileImage);


        for(let [name, value] of formData) {
          console.log(`${name} = ${value}`); // key1 = value1, then key2 = value2
        }
      
      const response = await mainApiInstance.patch(`api/users/auth/profile`, formData,);
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: 'updateProfile' });
    } catch (error) {
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: 'updateProfile' });
    }
  };
};

