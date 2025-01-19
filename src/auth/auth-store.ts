import { create } from "zustand";
import RNSecureStorage, {ACCESSIBLE} from "rn-secure-storage";
import axios from "axios";


type AuthState = {
    user: string | null;
    logIn: (username: string, password: string) => Promise<{isLoggedIn: boolean; message: string}>;
    logOut: () => void;
    isAuthenticated: () => boolean;
}

export const useAuth = create<AuthState>((set, get) => ({
    user: null,
    logIn: async (username: string, password: string) => {
        try {
            const response = await axios.post(`${process.env.BASE_URL}`, {
                'username': username, 
                'password': password
            })
            const {accessToken, refreshToken} = await response.data
            RNSecureStorage.multiSet({"access": accessToken, "refresh": refreshToken}, 
                {accessible: ACCESSIBLE.WHEN_UNLOCKED}).then(() => console.log("saved to RN secure storage"))
            set(state => ({user: username}))
            return {isLoggedIn: true, message: "login successful"}

        } catch (error: any) {
            console.error("login error: ", error.message)
            return {isLoggedIn: false, message: error.message}
        }
    },
    logOut: () => {},
    isAuthenticated: () => {
        const {user} = get()
        return !!user
    }
}))