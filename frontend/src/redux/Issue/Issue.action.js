import * as actionTypes from "./ActionTypes";
import api from "@/Api/api";

// 🔹 FETCH ALL ISSUES
export const fetchIssues = (id) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_ISSUES_REQUEST });

    try {
      const response = await api.get(`/api/issues/project/${id}`);

      dispatch({
        type: actionTypes.FETCH_ISSUES_SUCCESS,
        issues: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_ISSUES_FAILURE,
        error: error.message,
      });
    }
  };
};

// 🔹 FETCH ISSUE BY ID (🔥 REQUIRED FIX)
export const fetchIssueById = (id) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_ISSUES_BY_ID_REQUEST });

    try {
      const response = await api.get(`/api/issues/${id}`);

      dispatch({
        type: actionTypes.FETCH_ISSUES_BY_ID_SUCCESS,
        issue: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_ISSUES_BY_ID_FAILURE,
        error: error.message,
      });
    }
  };
};

// 🔹 CREATE ISSUE (OPTIMISTIC)
export const createIssue = (issueData) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_ISSUE_REQUEST });

    try {
      const response = await api.post("/api/issues", issueData);

      dispatch({
        type: actionTypes.CREATE_ISSUE_SUCCESS,
        issue: response.data,
      });

    } catch (error) {
      dispatch({
        type: actionTypes.CREATE_ISSUE_FAILURE,
        error: error.message,
      });
    }
  };
};

// 🔹 UPDATE ISSUE STATUS (🔥 INSTANT UI)
export const updateIssueStatus = ({ id, status }) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_ISSUE_STATUS_REQUEST });

    try {
      const formattedStatus = status.toLowerCase();

      await api.put(`/api/issues/${id}/status/${formattedStatus}`);

      dispatch({
        type: actionTypes.UPDATE_ISSUE_STATUS_SUCCESS,
        payload: { id, status: formattedStatus },
      });

    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_ISSUE_STATUS_FAILURE,
        error: error.message,
      });
    }
  };
};

// 🔹 DELETE ISSUE (OPTIMISTIC)
export const deleteIssue = (issueId) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_ISSUE_REQUEST });

    try {
      await api.delete(`/api/issues/${issueId}`);

      dispatch({
        type: actionTypes.DELETE_ISSUE_SUCCESS,
        issueId,
      });

    } catch (error) {
      dispatch({
        type: actionTypes.DELETE_ISSUE_FAILURE,
        error: error.message,
      });
    }
  };
};

// 🔹 UPDATE ISSUE
export const updateIssue = (issueId, updatedData) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_ISSUE_REQUEST });

    try {
      const response = await api.put(`/api/issues/${issueId}`, updatedData);

      dispatch({
        type: actionTypes.UPDATE_ISSUE_SUCCESS,
        issue: response.data,
      });

    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_ISSUE_FAILURE,
        error: error.message,
      });
    }
  };
};

// 🔹 ASSIGN USER
export const assignedUserToIssue = ({ issueId, userId }) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.ASSIGNED_ISSUE_TO_USER_REQUEST });

    try {
      const response = await api.put(
        `/api/issues/${issueId}/assignee/${userId}`
      );

      dispatch({
        type: actionTypes.ASSIGNED_ISSUE_TO_USER_SUCCESS,
        issue: response.data,
      });

    } catch (error) {
      dispatch({
        type: actionTypes.ASSIGNED_ISSUE_TO_USER_FAILURE,
        error: error.message,
      });
    }
  };
};