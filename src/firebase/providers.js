import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { firebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(firebaseAuth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult(result);

    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,
      // User info
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;

    return {
      ok: false,
      errorCode,
      errorMessage,
    };
  }
};

// Registrar con email y password
export const registerUserWithEmailPassword = async ({
  email,
  password,
  displayName,
}) => {
  try {
    // console.log({ email, displayName, password });
    // Función de firebase para crear usuario
    const resp = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const { uid, photoURL } = resp.user;

    // TODO: actualizar el displayName en Firebase
    await updateProfile(firebaseAuth.currentUser, {
      displayName,
    });

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};

// Iniciar sesión con email y password
export const loginWithEmailPassword = async ({ email, password }) => {
  try {
    // console.log({ email, password });
    // Función de firebase signInWithEmailAndPassword
    const resp = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );

    const { uid, displayName, photoURL } = resp.user;

    return {
      ok: true,
      uid,
      email,
      displayName,
      photoURL,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};

// Cerrar sesión
export const logoutFirebase = async () => {
  return await firebaseAuth.signOut();
};
