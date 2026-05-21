import * as actionTypes from "./ActionTypes";

const initialState = {
  issues: [],
  loading: false,
  error: null,
  issueDetails: null,
};

const issueReducer = (state = initialState, action) => {
  switch (action.type) {

    // 🔹 REQUESTS
    case actionTypes.FETCH_ISSUES_REQUEST:
    case actionTypes.CREATE_ISSUE_REQUEST:
    case actionTypes.UPDATE_ISSUE_REQUEST:
    case actionTypes.DELETE_ISSUE_REQUEST:
    case actionTypes.FETCH_ISSUES_BY_ID_REQUEST:
    case actionTypes.ASSIGNED_ISSUE_TO_USER_REQUEST:
    case actionTypes.UPDATE_ISSUE_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // 🔹 FETCH ALL
    case actionTypes.FETCH_ISSUES_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: action.issues || [],
      };

    // 🔹 FETCH BY ID
    case actionTypes.FETCH_ISSUES_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        issueDetails: action.issue,
      };

    // 🔹 CREATE ISSUE (🔥 ADD TO LIST INSTANTLY)
    case actionTypes.CREATE_ISSUE_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: [action.issue, ...state.issues], // ✅ FIX
      };

    // 🔹 UPDATE ISSUE
    case actionTypes.UPDATE_ISSUE_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: state.issues.map((item) =>
          item.id === action.issue.id ? action.issue : item
        ),
      };

    // 🔹 UPDATE STATUS (🔥 MAIN FIX)
    case actionTypes.UPDATE_ISSUE_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: state.issues.map((item) =>
          item.id === action.payload.id
            ? { ...item, status: action.payload.status }
            : item
        ),
      };

    // 🔹 ASSIGN USER
    case actionTypes.ASSIGNED_ISSUE_TO_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: state.issues.map((item) =>
          item.id === action.issue.id ? action.issue : item
        ),
      };

    // 🔹 DELETE ISSUE (🔥 REMOVE FROM UI INSTANTLY)
    case actionTypes.DELETE_ISSUE_SUCCESS:
      return {
        ...state,
        loading: false,
        issues: state.issues.filter(
          (item) => item.id !== action.issueId
        ),
      };

    // 🔹 FAILURES
    case actionTypes.FETCH_ISSUES_FAILURE:
    case actionTypes.CREATE_ISSUE_FAILURE:
    case actionTypes.UPDATE_ISSUE_FAILURE:
    case actionTypes.DELETE_ISSUE_FAILURE:
    case actionTypes.ASSIGNED_ISSUE_TO_USER_FAILURE:
    case actionTypes.UPDATE_ISSUE_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default issueReducer;