import { auth } from "@/firebase";
import { closeLoginModal, openLoginModal } from "@/redux/modalSlice";
import Modal from "@mui/material/Modal";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function LoginModal() {
  const isOpen = useSelector((state) => state.modals.loginModalOpen);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSignIn() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        setErrorMessage('Please enter a valid email.');
      } 
      else if (error.code === 'auth/invalid-login-credentials') {
        setErrorMessage('Invalid email or password. Please check your credentials and try again.');
      } 
      else {
        setErrorMessage (error.message);
      }
    }
  }
  async function handleGuestSignIn() {
    await signInWithEmailAndPassword(auth, "guest77845@gmail.com", "123456789");
  }

  return (
    <>
      <button
        className="font-bold bg-transparent border border-white text-white 
        w-[160px] rounded-full h-[40px] hover:bg-[#cbd2d7]"
        onClick={() => dispatch(openLoginModal())}
      >
        Log In
      </button>

      <Modal
        open={isOpen}
        onClose={() => dispatch(closeLoginModal())}
        className="flex justify-center items-center"
      >
        <div
          className="w-[90%] h-[600px] bg-black text-white md:w-[560px] md:h-[600px]
        border border-gray-700 rounded-lg flex justify-center"
        >
          <div className="w-[90%] mt-8 flex flex-col">
            <span className="mt-4 font-bold text-4xl">
              Sign In to your Account
            </span>
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
                  handleSignIn();
                }
              }}
            />
            {errorMessage && <div className="text-red-500 my-3 flex items-center">{errorMessage}</div>}
            <button
              className="mt-8 bg-white w-full p-2 rounded-md font-bold text-black text-lg"
              onClick={handleSignIn}
            >
              Sign In
            </button>
            <span className="text-center mt-4 font-bold text-xl">or</span>
            <button
              className="bg-white w-full p-2 rounded-md font-bold text-black text-lg mt-4"
              onClick={handleGuestSignIn}
            >
              Sign In as a Guest
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
