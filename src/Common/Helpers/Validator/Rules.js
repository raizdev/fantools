import { defineRule  } from "vee-validate";
import store from "../../../Store"


export const usernameAvailable = (value) => {
    if (!value) {
        return true;
    }

    return store.dispatch('auth/userAvailability', {username: value }).then((res) => {
        return res.availability === 0
    });
}
