import * as Types from "../../../../constants/actionTypes";
import { mainApiInstance } from '../../axiosInstances'


export const CreateProducer = (data) => {
  const req = "CreateProducer"
  return async dispatch => {
    dispatch({ type: Types.FETCH_DATA_REQUEST, req: req });
    try {
      const response = await mainApiInstance.post(`api/producers/producer`,data);
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: response.data, req: req });
    } catch (error) {
      dispatch({ type: Types.FETCH_DATA_FAILURE, payload: JSON.stringify(error.response), req: req });
    }
  };
};

/*

{
    "category":"666eda1a835997d3e0caae18",
    "subcategory":[{"subcategory":"666eda1a835997d3e0caae1c" , "tags":["666eda1a835997d3e0caae1d"]}],
    "maxBudget":1000,
    "minBudget":500,
    "searchKeywords":["metoo"]
}

*/