import * as actionTypes from "./ActionTypes";
import api from "@/Api/api";

// ---------------- FETCH PROJECTS ----------------

export const fetchProjects = ({ category, tag } = {}) => {
  const params = {};
  if (category) params.category = category;
  if (tag) params.tag = tag;

  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_PROJECTS_REQUEST });
    try {
      const response = await api.get("/api/projects", { params });
      console.log("fetch Projects ", response.data);

      dispatch({
        type: actionTypes.FETCH_PROJECTS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_PROJECTS_FAILURE,
        error: error.message,
      });
    }
  };
};

// ---------------- SEARCH PROJECTS ----------------

export const searchProjects = (keyword) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.SEARCH_PROJECT_REQUEST });
    try {
      const response = await api.get(
        `/api/projects/search?keyword=${keyword}`
      );

      dispatch({
        type: actionTypes.SEARCH_PROJECT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.SEARCH_PROJECT_FAILURE,
        error: error.message,
      });
    }
  };
};

// ---------------- CREATE PROJECT ----------------

export const createProject = (projectData) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_PROJECT_REQUEST });
    try {
      const response = await api.post("/api/projects", projectData); // ✅ FIXED - removed API_BASE_URL

      dispatch({
        type: actionTypes.CREATE_PROJECT_SUCCESS,
        payload: response.data,
      });

      dispatch(fetchProjects({}));

    } catch (error) {
      console.log("catch error ", error);
      dispatch({
        type: actionTypes.CREATE_PROJECT_FAILURE,
        error: error.message,
      });
    }
  };
};

// ---------------- UPDATE PROJECT ----------------

export const updateProject = ({ projectId, updatedData }) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_PROJECT_REQUEST });
    try {
      const response = await api.put(
        `/api/projects/${projectId}`,  // ✅ FIXED - removed API_BASE_URL
        updatedData
      );

      dispatch({
        type: actionTypes.UPDATE_PROJECT_SUCCESS,
        payload: response.data,
      });

      dispatch(fetchProjects({}));

    } catch (error) {
      console.log("catch error ", error);
      dispatch({
        type: actionTypes.UPDATE_PROJECT_FAILURE,
        error: error.message,
      });
    }
  };
};

// ---------------- FETCH PROJECT BY ID ----------------

export const fetchProjectById = (id) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_PROJECT_BY_Id_REQUEST });
    try {
      const response = await api.get(`/api/projects/${id}`);

      dispatch({
        type: actionTypes.FETCH_PROJECT_BY_Id_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_PROJECT_BY_Id_FAILURE,
        error: error.message,
      });
    }
  };
};

// ---------------- DELETE PROJECT ----------------

export const deleteProject = ({ projectId }) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_PROJECT_REQUEST });
    try {
      await api.delete(`/api/projects/${projectId}`);

      dispatch({
        type: actionTypes.DELETE_PROJECT_SUCCESS,
        payload: projectId,
      });

      dispatch(fetchProjects({}));

    } catch (error) {
      console.log("error - ", error);
      dispatch({
        type: actionTypes.DELETE_PROJECT_FAILURE,
        error: error.message,
      });
    }
  };
};

// ---------------- INVITE ----------------

export const inviteToProject = ({ email, projectId }) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.INVITE_TO_PROJECT_REQUEST });
    try {
      const { data } = await api.post("/api/projects/invite", {
        email,
        projectId,
      });

      dispatch({ type: actionTypes.INVITE_TO_PROJECT_SUCCESS });
      console.log("invite to project ", data);
    } catch (error) {
      dispatch({
        type: actionTypes.INVITE_TO_PROJECT_FAILURE,
        error: error.message,
      });
    }
  };
};

// ---------------- ACCEPT INVITATION ----------------

export const acceptInvitation = ({ invitationToken, navigate, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.ACCEPT_INVITATION_REQUEST });
    try {
      const { data } = await api.get(
        "/api/projects/accept_invitation",
        {
          params: { token: invitationToken },
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      navigate(`/project/${data.projectId}`);
      dispatch({ type: actionTypes.ACCEPT_INVITATION_SUCCESS, payload: data });
    } catch (error) {
      console.log("error ", error);
      dispatch({ type: actionTypes.ACCEPT_INVITATION_FAILURE, error: error.message });
    }
  };
};