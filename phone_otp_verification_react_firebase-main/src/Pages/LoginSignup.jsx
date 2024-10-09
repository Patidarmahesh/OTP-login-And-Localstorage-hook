import React from "react";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast, Toaster } from "react-hot-toast";
import useLocalStorage from "../Hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

const initialState = {
  loading: false,
  showOTP: false,
  user: "",
  error: null,
};

const reducerFun = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_SHOWOTP":
      return { ...state, showOTP: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const LoginSignup = () => {
  const navigate = useNavigate();
  const [ph, setPh] = React.useState("");
  const [otp, setOtp] = React.useState(null);
  const [counter, setCounter] = React.useState(59);
  const [storedValue, setValue] = useLocalStorage("vikash");
  const [store, dispatch] = React.useReducer(reducerFun, initialState);
  const {loading, showOTP, user, error } = store;

  // React.useEffect(() => {
  //   let timer =
  //     counter > 0 &&
  //     setTimeout((value) => {
  //       setCounter(counter - 1);
  //     }, 1000);
  //   return () => clearInterval(timer);
  // }, [counter]);

  React.useEffect(() => {
    if (storedValue) {
      navigate("/");
    }
  }, [storedValue, navigate]);

  const otpLogin = async () => {
    // setError("");
    // if (ph === "" || ph === undefined) return setError("Something is missing");
    // setError("");
    // setLoading(true);
    // setShowOTP(true);
    setValue({ name: "mahesh" });
  };

  function onOTPVerify() {}

  return (
    <section className="bg-black flex items-center justify-center h-screen">
      <div className="bg-blue-800 rounded-md">
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container" />
        {user ? (
          <h2 className="text-center text-white font-medium text-2xl">
            👍Login Success
          </h2>
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
              Welcome to My
              <br /> APP WITH
            </h1>
            {showOTP ? (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-white text-center"
                >
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container text-green-600 text-[24px]"
                ></OtpInput>
                <button
                  onClick={onOTPVerify}
                  className="bg-black w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP My App</span>
                </button>
                <span className="text-[20px] text-white text-center flex flex-col">
                  Resend OTP in 00 : {counter}
                  <span className="underline text-[20px] text-green-500 cursor-pointer text-center">
                    Resend OTP
                  </span>
                </span>
              </>
            ) : (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsTelephoneFill size={30} />
                </div>
                <label
                  htmlFor=""
                  className="font-bold text-xl text-white text-center"
                >
                  Verify your phone number
                </label>
                <PhoneInput country={"in"} value={ph} onChange={setPh} />
                {error && (
                  <div className="text-center text-red-600">{error}</div>
                )}
                <button
                  onClick={otpLogin}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Send code via SMS</span>
                </button>
                <h1 className="text-white">
                  {"storedValue?.name" + " => " + storedValue?.name}
                </h1>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default LoginSignup;
