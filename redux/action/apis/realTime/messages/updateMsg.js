import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const UpdateMessageInChat = () => {
  const req = "UpdateMessageInChat"
  return async dispatch => {
    try {
        const response = await mainApiInstance.get(`api/message/662ff6502190713387540d0e`,);
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
    } catch (error) {
        // console.log("error " , JSON.stringify(error.response))
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
    }
  };
};

/*
data.append('attachments', fs.createReadStream('/C:/Users/LAPTOP SHOP/Downloads/1714419091635_2d66bfb62f09.pdf'));
data.append('content', 'updated2');
data.append('reactions[0][type]', 'ddddd');
*/