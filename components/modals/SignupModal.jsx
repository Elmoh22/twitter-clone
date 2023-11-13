import { closeSignupModal, openSignupModal } from "@/redux/modalSlice";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/firebase";
import { useEffect, useState } from "react";
import { setUser } from "@/redux/userSlice";
import { useRouter } from "next/router";

export default function SignupModal() {
  const isOpen = useSelector((state) => state.modals.signupModalOpen);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  async function handleSignUp() {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: `/assets/profilePictures/pfp${Math.ceil(
          Math.random() * 6
        )}.png`,
      });

      router.reload();
    } catch (error) {
      if (error.code === 'auth/weak-password') {
        setErrorMessage('Password should be at least 6 characters.');
      } 
      else if (error.code === 'auth/invalid-email') {
        setErrorMessage('Please enter a valid email.');
      } 
      else if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('The email is already in use, please enter a valid email.');
      } 
      else {
        setErrorMessage (error.message);
      }
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;
      //handle redux actions
      dispatch(
        setUser({
          username: currentUser.email.split("@")[0],
          name: currentUser.displayName,
          email: currentUser.email,
          uid: currentUser.uid,
          photoUrl: currentUser.photoURL,
        })
      );
    });

    return unsubscribe;
  }, []);

  async function handleGuestSignIn() {
    await signInWithEmailAndPassword(auth, "guest77845@gmail.com", "123456789");
  }

  return (
    <>
      <button
        className="font-bold bg-white text-black 
        w-[160px] rounded-full h-[40px] hover:bg-[#cbd2d7]"
        onClick={() => dispatch(openSignupModal())}
      >
        Sign Up
      </button>

      <Modal
        open={isOpen}
        onClose={() => dispatch(closeSignupModal())}
        className="flex justify-center items-center"
      >
        <div
          className="w-[90%] h-[600px] bg-black text-white md:w-[560px] md:h-[600px]
        border border-gray-700 rounded-lg flex justify-center"
        >
          <div className="w-[90%] mt-8 flex flex-col">
            <button
              className="bg-white w-full p-2 rounded-md font-bold text-black text-lg"
              onClick={handleGuestSignIn}
            >
              Sign In as a Guest
            </button>
            <span className="text-center mt-4 font-bold text-xl">or</span>
            <span className="mt-4 font-bold text-4xl">Create your Account</span>
            <input
              placeholder="Full Name"
              className="h-10 mt-8 rounded-md bg-transparent border border-gray-700 p-6"
              type={"text"}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Email"
              className="h-10 mt-8 rounded-md bg-transparent border border-gray-700 p-6"
              type={"email"}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              className="h-10 mt-8 rounded-md bg-transparent border border-gray-700 p-6"
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSignUp();
                }
              }}
            />
            {errorMessage && (
              <div className="text-red-500 my-1">{errorMessage}</div>
            )}
            <button
              className="mt-8 bg-white w-full p-2 rounded-md font-bold text-black text-lg"
              onClick={handleSignUp}
            >
              Create account
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
