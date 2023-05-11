import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  loading: false,
  error: null,
  pageLoad: 1,
  total_pages: null,
  last_page: false,
  loaded: false,
};

const fetchUsersReducer = createSlice({
  name: 'users',

  initialState,

  reducers: {
    allPages: (state, action) => {
      state.total_pages = action.payload;
    },
    handleUpdatePage: (state) => {
      state.pageLoad = state.pageLoad + 1;
      if (state.pageLoad === state.total_pages) {
        state.last_page = true;
      }
    },
    fetchUsersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = state.users.concat(action.payload);
    },
    fetchUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.users;
    },
  },
});

export const {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  handleUpdatePage,
  allPages,
  setLoaded,
} = fetchUsersReducer.actions;

export const reducer = fetchUsersReducer.reducer;

export const fetchUsers = (currentPage) => async (dispatch, getState) => {
  const url = `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${currentPage}&count=6`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const users = data.users;
    dispatch(fetchUsersSuccess(users));
    dispatch(allPages(data.total_pages));
    getState().loaded = true;
  } catch (error) {
    dispatch(fetchUsersFailure(error.message));
  }
};
