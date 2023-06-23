// Use throughout your app instead of plain `useDispatch` and `useSelector`
import { Dispatch } from 'react';
import { AnyAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './index';

export const useAppDispatch = (): Dispatch<AnyAction> => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// type DispatchFunc = () => AppDispatch
// export const useAppDispatch: DispatchFunc = useDispatch
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
