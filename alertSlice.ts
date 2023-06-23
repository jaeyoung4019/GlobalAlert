import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
    isShow?: boolean;
    items: number;
    title: string;
    message: string;
    text1?: string;
    sucCallback?: () => void;
    text2?: string;
    failCallback?: () => void;
}

const initialState: InitialState = {
    isShow: false,
    items: 1,
    title: '',
    message: '',
    text1: '',
    sucCallback: () => {},
    text2: '',
    failCallback: () => {},
};
export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        alertOpen: (state, action: PayloadAction<InitialState>) => {
            return { ...initialState, ...action.payload, isShow: true };
        },
        alertClose: (state) => {
            return { ...initialState, ...state, isShow: false };
        },
    },
});

// Action creators are generated for each case reducer function
export const { alertOpen, alertClose } = alertSlice.actions;

export default alertSlice.reducer;
