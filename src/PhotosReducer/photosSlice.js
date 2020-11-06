import { createSlice } from "@reduxjs/toolkit";

export const photosSlice = createSlice({
  name: "photos",
  initialState: {
    photos: [],
    queryParam: "",
    shouldShowDataList: false,
  },
  reducers: {
    setPhotos: (state, action) => {
      state.photos = action.payload;
    },
    setQueryParam: (state, action) => {
      state.queryParam = action.payload;
    },
    setShouldShowDataList: (state, action) => {
      state.shouldShowDataList = action.payload;
    },
  },
});

export const {
  setPhotos,
  setQueryParam,
  setShouldShowDataList,
} = photosSlice.actions;

export const selectPhotos = (state) => state.photosList.photos;
export const selectQueryParam = (state) => state.photosList.queryParam;
export const selectShouldShowDataList = (state) =>
  state.photosList.shouldShowDataList;

export default photosSlice.reducer;
