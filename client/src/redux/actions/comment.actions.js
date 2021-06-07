import * as types from "../constants/post.constants";
import api from "../api";
import { routeActions } from "./route.actions";
import { toast } from "react-toastify";

const create = (body, postId) => async (dispatch) => {
  dispatch({ type: types.CREATE_COMMENT_REQUEST, payload: null });
  try {
    const res = await api.post(`/posts/${postId}/comments`, { body });
    dispatch({
      type: types.CREATE_COMMENT_SUCCESS,
      payload: res.data.data.post,
    });
  } catch (error) {
    dispatch({ type: types.CREATE_COMMENT_FAILURE, payload: error });
  }
};

const update = (commentId, postId, newComment) => async (dispatch) => {
  dispatch({ type: types.UPDATE_COMMENT_REQUEST, payload: null });
  try {
    // let formData = new FormData();
    // formData.set("title", title);
    // formData.set("content", content);
    const res = await api.put(`/posts/${postId}/comment/${commentId}`, {
      body: newComment,
    });

    console.log({ res });
    dispatch({
      payload: res.data.data,
      type: types.UPDATE_COMMENT_SUCCESS,
    });
    dispatch(routeActions.redirect("__GO_BACK__"));
    toast.success("Post updated.");
  } catch (error) {
    dispatch({ type: types.UPDATE_COMMENT_FAILURE, payload: error });
  }
};

const destroy = (post) => async (dispatch) => {
  dispatch({ type: types.DELETE_COMMENT_REQUEST, payload: null });
  try {
    const res = await api.delete(`/posts/${post._id}`);
    dispatch({
      payload: res.data,
      type: types.DELETE_COMMENT_SUCCESS,
    });
    dispatch(routeActions.redirect("__GO_BACK__"));
    toast.success("Post deleted.");
  } catch (error) {
    dispatch({ type: types.DELETE_COMMENT_FAILURE, payload: error });
  }
};

export const commentActions = {
  create,
  update,
  destroy,
};
