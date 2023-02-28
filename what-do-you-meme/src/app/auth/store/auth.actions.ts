import { createAction, props } from '@ngrx/store';
import { AuthData } from 'src/app/shared/model/authData';

export const login = createAction(
  '[Auth] login',
  props<{ username: string; password: string }>()
);
export const loginSuccess = createAction(
  '[Auth] login success',
  props<AuthData>()
);
export const loginFailed = createAction(
  '[Auth] login failed',
  props<{ serverError: string }>()
);
export const initAuth = createAction('[Auth] initAuth');
export const extractLoginData = createAction('[Auth] extractLoginData');
export const logoutSuccess = createAction('[Auth] logout');
createAction('[Auth] logout');
