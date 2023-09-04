import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/index";
import { generateOTP, verifyOTP } from "../helper/axios";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Username.module.css";

export default function Recovery() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const username = useSelector((state) => state.userReducer.username);
    const OTP = useSelector((state) => state.setOtpReducer.OTP);
    const { setOTP } = bindActionCreators(actionCreators, dispatch);

    useEffect(() => {
        generateOTP(username).then((OTP) => {
            console.log(OTP);
            if (OTP) return toast.success("OTP has been sent to your email!");
            return toast.error("Problem while generating OTP");
        });
    }, [username]);

    async function onSubmit(e) {
        e.preventDefault();
        try {
            let { status } = await verifyOTP({ username, code: OTP });
            if (status === 201) {
                toast.success("Verified Successfully!");
                return navigate("/reset");
            }
        } catch (error) {
            return toast.error("Wrong OTP! Check email again!");
        }
    }

    // Handler of resend OTP
    async function resendOTP(e) {
        e.preventDefault();
        let sendPromise = generateOTP(username);
        toast.promise(sendPromise, {
            loading: "Sending...",
            success: <b>OTP has been sent to your mail!</b>,
            error: <b>Could not sent it!</b>,
        });

        sendPromise.then((OTP) => {
            console.log(OTP);
        });
    }

    return (
        <div className="container mx-auto">
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <div className="flex justify-center items-center h-screen">
                <div className={styles.glass}>
                    <div className="title flex-col flex items-center">
                        <h4 className="text-5xl font-bold ">Recovery</h4>
                        <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                            Enter the OTP send to recover password
                        </span>
                    </div>
                    <form className="pt-20" onSubmit={onSubmit}>
                        <div className="textbox flex flex-col items-center gap-6">
                            <div className="input text-center">
                                <span className="py-4 text-sm text-left text-gray-500">
                                    Enter the 6 digit otp sent to your email address.
                                </span>
                                <input
                                    onChange={(e) => setOTP(e.target.value)}
                                    type="text"
                                    className={styles.textbox}
                                    placeholder="OTP"
                                />
                            </div>

                            <button type="submit" className={styles.btn}>
                                Recover
                            </button>
                        </div>
                        <div className="text-center py-4">
                            <span className="text-gray-500">
                                Can't get OTP?{" "}
                                <button className="text-red-500" onClick={resendOTP}>
                                    Resend
                                </button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
