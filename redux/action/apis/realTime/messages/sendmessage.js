import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const SendMessages = (data) => {
  const req = "SendMessages"
  for(let [name, value] of data) {
    console.log(`${name} = ${value}`); // key1 = value1, then key2 = value2
  }
  return async dispatch => {
    try {
  
      const response = await mainApiInstance.post(`api/message`, data);
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
    } catch (error) {
        // console.log("error " , JSON.stringify(error.response))
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
    }
  };
};

/*
let data = new FormData();
data.append('attachments', fs.createReadStream('/C:/Users/LAPTOP SHOP/Desktop/images.jpg'));
data.append('content', 'hello');
data.append('receiver', 'userId');
*/