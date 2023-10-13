import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  signInWithGoogle,
} from "../../firebase/providers";
import { clearNoteLogout } from "../journal";
import { checkingCredentials, login, logout } from "./";

export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

// Thunk para iniciar sesión con Google
export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await signInWithGoogle();
    // console.log(result);
    if (!result.ok) return dispatch(logout(result.errorMessage));
    dispatch(login(result));
  };
};

// Thunk para crear un usuario con email y password
export const startCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const resp = await registerUserWithEmailPassword({
      email,
      password,
      displayName,
    });

    // Desestructurar resp
    const { ok, uid, photoURL, errorMessage } = resp;

    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ uid, photoURL, email, displayName }));
  };
};

// Thunk para iniciar sesión con email y password
export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const resp = await loginWithEmailPassword({ email, password });

    // Desestructurar resp
    const { ok, uid, displayName, photoURL, errorMessage } = resp;

    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ uid, displayName, photoURL, email }));
  };
};

// Thunk para cerrar sesión
export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();

    // Limpiar las notas al cerrar sesión
    dispatch(clearNoteLogout());

    dispatch(logout());
  };
};
