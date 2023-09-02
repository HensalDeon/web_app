import axios from "axios";
import { Promise } from "mongoose";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

/** Make API Requests */

/** AUthenticate function  */
export async function authenticate(username) {
    try {
        return await axios.post("/authenticate", { username });
    } catch (error) {
        return { error: "Username doesn't exist...!" };
    }
}

/** get User details */
export async function getUser({ username }) {
    try {
        const { data } = await axios.get(`/user/${username}`);
        return { data };
    } catch (error) {
        return { error: "Password doesn't match...!" };
    }
}

/** register User function */
export async function registerUser(credentials) {
    try {
        const {
            data: { msg },
            status,
        } = await axios.post(`/register`, credentials);

        let { username, email } = credentials;

        /** send email */
        if (status === 201) {
            await axios.post("/register-mail", { username, userEmail: email, text: msg });
        }

        return Promise.resolve(msg);
    } catch (error) {
        Promise.reject({ error });
    }
}

/** login function */
export async function verifyPassword({ username, password }) {
    try {
        if (username) {
            const { data } = await axios.post("/login", { username, password });
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error: "Password doesn't match...!" });
    }
}

/** update user profile function */
export async function updatedUser(response) {
    try {
        const token = await localStorage.getItem("token");
        const data = await axios.put("/update-user", response, { headers: { Authorization: `Bearer ${token}` } });
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: "Couldn't update Profile...!" });
    }
}

/** generate OTP */
export async function generateOTP(username) {
    try {
        const {
            data: { code },
            status,
        } = await axios.get("/generateOTP", { params: username });

        /** send mail with the OTP */
        if (status === 201) {
            let {
                data: { email },
            } = await getUser({ username });
            let text = `Your password recovery OTP is ${code}. Verify and recover your password.`;
            await axios.post("/register-mail", { username, userEmail: email, text, subject: "Password recover OTP" });
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error });
    }
}

/** verify OTP */
export async function verifyOTP({ username, code }) {
    try {
        const { data, status } = await axios.get("/verifyOTP", { params: { username, code } });
        return { data, status };
    } catch (error) {
        return Promise.reject({ error });
    }
}

/** reset password */
export async function resetPassword({ username, password }) {
    try {
        const { data, status } = await axios.put("/reset-password", { username, password });
        return Promise.resolve({ data, status });
    } catch (error) {
        return Promise.reject({ error });
    }
}
