import * as actionTypes from "./ActionTypes";

const initialState = {
  projects: [],
  searchProjects: [],
  projectDetails: null,
  loading: false,
  error: null,
};

const ProjectReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.FETCH_PROJECTS_REQUEST:
    case actionTypes.CREATE_PROJECT_REQUEST:
    case actionTypes.UPDATE_PROJECT_REQUEST:
    case actionTypes.DELETE_PROJECT_REQUEST:
    case actionTypes.FETCH_PROJECT_BY_Id_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // ✅ FIXED
    case actionTypes.FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: action.payload || [], // 🔥 FIX
      };

    // ✅ FIXED
    case actionTypes.SEARCH_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        searchProjects: action.payload || [], // 🔥 FIX
      };

    // ✅ FIXED
    case actionTypes.CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: [action.payload, ...state.projects], // 🔥 FIX
      };

    case actionTypes.FETCH_PROJECT_BY_Id_SUCCESS:
      return {
        ...state,
        loading: false,
        projectDetails: action.payload,
      };

    // ✅ FIXED
    case actionTypes.UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: state.projects.map((project) =>
          project.id === action.payload.id ? action.payload : project
        ),
      };

    // ✅ FIXED
    case actionTypes.DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: state.projects.filter(
          (project) => project.id !== action.payload
        ),
      };

    case actionTypes.FETCH_PROJECTS_FAILURE:
    case actionTypes.CREATE_PROJECT_FAILURE:
    case actionTypes.UPDATE_PROJECT_FAILURE:
    case actionTypes.DELETE_PROJECT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default ProjectReducer;