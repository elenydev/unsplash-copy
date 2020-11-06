import { configureStore } from "@reduxjs/toolkit";
import photosReducer from "../PhotosReducer/photosSlice";
export default configureStore({
  reducer: {
    photosList: photosReducer,
  },
});
