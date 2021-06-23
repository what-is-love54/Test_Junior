import { ukraineAPI } from "../api/api";

const SET_STATISTICS = "SET-STATISTICS";
const IS_LOADING = "IS-LOADING";
let initialState = {
  NewConfirmed: 0,
  TotalConfirmed: 0,
  TotalDeaths: 0,
  NewRecovered: 0,
  isLoading: false,
};

const ukraineReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STATISTICS:
      return {
        ...state,
        NewConfirmed: action.NewConfirmed,
        TotalConfirmed: action.TotalConfirmed,
        TotalDeaths: action.TotalDeaths,
        NewRecovered: action.NewRecovered,
      };
    case IS_LOADING: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    default:
      return state;
  }
};

export let setUkraineStatistics = (
  NewConfirmed,
  TotalConfirmed,
  TotalDeaths,
  NewRecovered
) => {
  return {
    type: SET_STATISTICS,
    NewConfirmed,
    TotalConfirmed,
    TotalDeaths,
    NewRecovered,
  };
};

export const setLoading = (isLoading) => {
  return {
    type: IS_LOADING,
    isLoading,
  };
};

export const getUkraineStatistics = () => async (dispatch) => {
  dispatch(setLoading(true));
  let responce = await ukraineAPI.getUkraineStatistics();
  dispatch(
    setUkraineStatistics(
      responce[0].NewConfirmed,
      responce[0].TotalConfirmed,
      responce[0].TotalDeaths,
      responce[0].NewRecovered
    )
  );

  dispatch(setLoading(false));
};

export default ukraineReducer;
