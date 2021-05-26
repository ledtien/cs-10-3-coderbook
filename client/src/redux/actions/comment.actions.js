import * as types from "../constants/post.constants";
import api from "../api";
import { routeActions } from "./route.actions";
import { toast } from "react-toastify";

const create = (body, postId) => async (dispatch) => {
  dispatch({ type: types.CREATE_REVIEW_REQUEST, payload: null });
  try {
    const res = await api.post(`/posts/${postId}/comments`, { body });
    dispatch({
      type: types.CREATE_REVIEW_SUCCESS,
      payload: res.data.data.post,
    });
  } catch (error) {
    dispatch({ type: types.CREATE_REVIEW_FAILURE, payload: error });
  }
};

export const commentActions = {
  create,
};
