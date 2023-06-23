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
