import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CourseType } from '@/types/courseType';
import { WorkoutType } from '@/types/courseType';

export type initialStateType = {
  currentCourse: CourseType | null;
  allCourses: CourseType[];
  favoriteCourses: CourseType[];
  fetchError: string | null;
  fetchIsLoading: boolean;
  currentWorkout: WorkoutType | null;
};

const initialState: initialStateType = {
  currentCourse: null,
  allCourses: [],
  favoriteCourses: [],
  fetchError: null,
  fetchIsLoading: true,
  currentWorkout: null,
};

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setAllCourses: (state, action: PayloadAction<CourseType[]>) => {
      state.allCourses = action.payload;
    },
    setFavoriteCourses: (state, action: PayloadAction<CourseType[]>) => {
      state.favoriteCourses = action.payload;
    },
    addFavoriteCourse: (state, action: PayloadAction<CourseType>) => {
      state.favoriteCourses = [...state.favoriteCourses, action.payload];
    },
    removeFavoriteCourse: (state, action: PayloadAction<CourseType>) => {
      state.favoriteCourses = state.favoriteCourses.filter(
        (course) => course._id !== action.payload._id,
      );
    },
    setCurrentWorkout(state, action: PayloadAction<WorkoutType>) {
      state.currentWorkout = action.payload;
    },
    setCurrentCourse(state, action: PayloadAction<CourseType>) {
      state.currentCourse = action.payload;
    },
    clearCurrentWorkout(state) {
      state.currentWorkout = null;
    },
    setFetchError: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
    },
    setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsLoading = action.payload;
    },
  },
});

export const {
  setAllCourses,
  setFavoriteCourses,
  addFavoriteCourse,
  removeFavoriteCourse,
  setFetchError,
  setFetchIsLoading,
  setCurrentWorkout,
  clearCurrentWorkout,
  setCurrentCourse,
} = courseSlice.actions;
export const courseSliceReducer = courseSlice.reducer;
