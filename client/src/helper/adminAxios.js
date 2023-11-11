import axios from "axios";
import { Promise } from "es6-promise";

const baseURL = "http://localhost:8080/api/admin";

/** Make API Requests */

/** To get list of usersData */
export async function getUsersList() {
    try {
        const response = await axios.get(`${baseURL}/userlist`);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching user list...!");
    }
}

export async function searchUser(search) {
    try {
        const response = await axios.post(`${baseURL}/search`, { search: search });
        return response.data;
    } catch (error) {
        throw new Error("No result found!");
    }
}

export async function updateUser(userDetails, userId) {
    try {
        const response = await axios.post(`${baseURL}/update-userdetails/${userId}`, userDetails);
        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function deleteUser(userId) {
    try {
        const response = await axios.delete(`${baseURL}/delete-user/${userId}`);
        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error);
    }
}
export async function enableUser(userId) {
    try {
        const response = await axios.patch(`${baseURL}/enable-user/${userId}`);
        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function verifyAdmin({ adminName, password }) {
    try {
        if (adminName) {
            const { data } = await axios.post(`${baseURL}/admin-login`, { adminName, password });
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error: "Password doesn't match...!" });
    }
}
