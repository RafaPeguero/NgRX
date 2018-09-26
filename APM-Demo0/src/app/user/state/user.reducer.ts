import { User } from '../user';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserActions, UserActionTypes } from './user.actions';




export interface UserState {
    maskUsername: boolean;
    currentUser: User;
}

export interface State extends fromRoot.State {
    User: UserState;
}

const initialState: UserState = {
    maskUsername: true,
    currentUser: null
};

const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getMaskUserName = createSelector(
    getUserFeatureState,
    state =>  state.maskUsername
);

export const getCurrentUser = createSelector(
    getUserFeatureState,
    state =>  state.currentUser
);

export function userReducer(state: UserState = initialState, action: UserActions) {
    switch (action.type) {

        case UserActionTypes.MaskUserName:
        return {
            ...state,
            maskUsername: action.payload
        };
        default:
        return state;
    }
}
