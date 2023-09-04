import axios from "axios";
// import { Promise } from "es6-promise";

const baseURL = "http://localhost:8080/admin";

/** Make API Requests */

/** To get list of usersData */
export async function getUsersList(){
    try {
        const response = await axios.get(`${baseURL}/userlist`);
        return response.data;
    } catch (error) {
        throw new Error("Error fetching user list...!");
    }
}