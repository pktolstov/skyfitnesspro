import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CourseType } from '@/types/courseType';
import { WorkoutType } from '@/types/courseType';

export type initialStateType = {
  currentCourse: CourseType | null;
  allCourses: CourseType[];
  favoriteCourses: string[];
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
    setFavoriteCourses: (state, action: PayloadAction<string[]>) => {
      state.favoriteCourses = action.payload;
    },
    addFavoriteCourse: (state, action: PayloadAction<string>) => {
      state.favoriteCourses = [...state.favoriteCourses, action.payload];
    },
    removeFavoriteCourse: (state, action: PayloadAction<string>) => {
      state.favoriteCourses = state.favoriteCourses.filter(
        (id) => id !== action.payload,
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
