import axios from "axios";
import { Auth } from "aws-amplify";
import { Dispatch } from "redux";

const getHeaders = async () => {
    const session = await Auth.currentSession();
    const token = session;
    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    };
};

const rootURL = "hr.abrasoft.com/api/user/profile"

const fetchProfile = () => async (dispatch: Dispatch) => {
    try {
        const response = await axios.get(rootURL);
        dispatch({
            type: "Success",
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: "error",
            payload: error
        })
    }
}

export default fetchProfile