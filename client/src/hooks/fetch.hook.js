import axios from "axios";
import { useEffect, useState } from "react";
import { getUsername } from "../helper/axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

/** custom hook */
export default function useFetch(query) {
    const [getData, setData] = useState({ isLoading: false, apiData: undefined, status: null, serverError: null });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData((prev) => ({ ...prev, isLoading: true }));

                const { username } = !query ? await getUsername() : "";

                const { data, status } = !query ? await axios.get(`/user/${username}`) : await axios.get(`${query}`);

                if (status === 200) {
                    setData((prev) => ({ ...prev, isLoading: false }));
                    setData((prev) => ({ ...prev, apiData: data, status: status }));
                    
                }

                setData((prev) => ({ ...prev, isLoading: false }));
            } catch (error) {
                setData((prev) => ({ ...prev, isLoading: false, serverError: error }));
            }
        };
        fetchData();
    }, [query]);

    return [getData, setData];
}