import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../Firebase";


export const loginUser = createAsyncThunk(
    'auth/loginUser' ,
    async({ email, password }, { rejectWithValue }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken();
            localStorage.setItem('token', token);
            localStorage.setItem('username' , userCredential.user.displayName)
            return userCredential.user; 
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
export const createUser = createAsyncThunk(
    'auth/createUser',
    async({email , password , displayName}, {rejectWithValue}) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth , email , password)
            await updateProfile(userCredential.user , {displayName: displayName})
            return {
                ...userCredential.user,
                displayName: displayName
            }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const authSlice = createSlice({
    name: 'auth' , 
    initialState: {
        user: null,
        loading: false,
        error: null
    },

    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload; // User is now logged in
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Capture login errors
            })
            // .addCase(logoutUser.fulfilled, (state) => {
            //     state.user = null; // Clear user state on logout
            // })
            // Adding cases for createUser
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload; // User is now signed up and logged in
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Capture signup errors
            });
    },
})

export default authSlice.reducer