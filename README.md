
# React 의 Redux 를 활용해서 전역적으로 사용하는 Custom Alert 을 생성합니다.

```ts
import React, { useCallback, useRef } from 'react';
import {
    AlertDialog,
    Button,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogCloseButton,
    AlertDialogBody,
    AlertDialogFooter,
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { RootState } from '../store';
import { alertClose } from '../store/slices/alertSlice';

const GlobalAlert = () => {
    const dispatch = useAppDispatch();
    const cancelRef = useRef(null);
    const {
        isShow,
        title,
        items,
        message,
        text1,
        text2,
        sucCallback,
        failCallback,
    } = useAppSelector((state: RootState) => state.alertSlice);

    const failOnClick = useCallback(() => {
        dispatch(alertClose());
        if (failCallback && typeof failCallback === 'function') {
            failCallback();
        }
    }, [dispatch, failCallback]);

    const sucOnClick = useCallback(() => {
        dispatch(alertClose());
        if (sucCallback && typeof sucCallback === 'function') {
            sucCallback();
        }
    }, [dispatch, sucCallback]);

    return (
        <>
            <AlertDialog
                motionPreset="slideInBottom"
                leastDestructiveRef={cancelRef}
                onClose={() => dispatch(alertClose())}
                isOpen={isShow}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>{title}</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>{message}</AlertDialogBody>
                    <AlertDialogFooter>
                        {items === 2 && (
                            <Button
                                ref={cancelRef}
                                onClick={() => failOnClick()}
                            >
                                취소
                            </Button>
                        )}

                        <Button
                            colorScheme="red"
                            ml={3}
                            onClick={() => sucOnClick()}
                        >
                            확인
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default GlobalAlert;


```

alert Css 구성요소는 Chakra UI 로 대체하였습니다.
취소 버튼은 아직 사용하지 않아서 생성하지 않았으나 구성상 필요한 부분이 있어서 냅두었습니다! 리팩토링을 추 후 할 예정입니다
children 을 통해 유동적인 Component 를 삽입하여 처리할 수 있도록! 

Redux
```ts
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

```

sucCallBack, failCallbak 함수를 매개 변수로 포함해서 확인 버튼과 취소 버튼을 클릭했을 때 실행할 함수를 넘겨줄 수 있도록 하였습니다.
