import * as types from "../constants/search.constants";
import api from "../api";
import { routeActions } from "./route.actions";
import { toast } from "react-toastify";

const getSearch =
  (pageNum = 1, limit = 10, query = null, ownerId = null, sortBy = null) =>
  async (dispatch) => {
    dispatch({ type: types.SEARCH_REQUEST, payload: null });
    try {
      let queryString = "";
      if (query) {
        queryString = `&title[$regex]=${query}&title[$options]=i`;
      }
      if (ownerId) {
        queryString = `${queryString}&author=${ownerId}`;
      }
      let sortByString = "";
      if (sortBy?.key) {
        sortByString = `&sortBy[${sortBy.key}]=${sortBy.ascending}`;
      }
      const res = await api.get(
        `/posts?page=${pageNum}&limit=${limit}${queryString}${sortByString}`
      );
      dispatch({
        type: types.SEARCH_SUCCESS,
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({ type: types.SEARCH_FAILURE, payload: error });
    }
  };

export const searchActions = {
  getSearch,
};
