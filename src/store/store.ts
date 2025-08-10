import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { authSliceReducer } from '@/store/features/authSlice';
import { courseSliceReducer } from './features/courseSlice';
import {authModalSliceReducer} from './features/modalSlice'

export const makeStore = () => {
  return configureStore({
    reducer: combineReducers({
      courses: courseSliceReducer,
      auth: authSliceReducer,
      modal: authModalSliceReducer,
    }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
