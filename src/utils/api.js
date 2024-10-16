import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { addDoc, collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { auth, db } from "../config/firebase";

export const loginUser = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return { success: true, message: 'Login Successfully' };
    } catch (e) {
        let message = e.message.split('Firebase:')[1];
        if (message?.includes('invalid-email')) message = 'Invalid Email';
        if (message?.includes('invalid-credential')) message = 'Invalid Email or Password';
        return { success: false, message }
    }
}

export const registerUser = async (name, email, password) => {
    try {
        // Register the user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update the user's profile with the name
        await updateProfile(user, { displayName: name });

        await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: email,
        });

        return {
            success: true,
            message: 'Registered Successfully'
        }

    } catch (error) {
        error.message = error.message.split('Firebase:')[1];
        return {
            success: false,
            message: error?.message || 'Internal Server Error'
        }
    }
}

export const emailDupliCheck = async (email) => {
    try {
        const emailQuery = query(collection(db, 'users'), where("email", "==", email));

        const data = await getDocs(emailQuery); // Use the query here
        const userslength = data.docs.length;

        if (userslength > 0) {
            return {
                success: false,
                message: 'Email already exist'
            }
        } else {
            return {
                success: true,
                message: 'Email is available'
            }
        }
    } catch (error) {
        error.message = error.message.split('Firebase:')[1];
        return {
            success: false,
            message: error?.message || 'Internal Server Error'
        }
    }
}

export const getUserByEmail = async (email) => {
    try {
        const emailQuery = query(
            collection(db, 'users'),
            where("email", ">=", email),
            where("email", "<=", email + '\uf8ff') // Adding a high-unicode character to support prefix matching
        );

        const usersSnapshot = await getDocs(emailQuery); // Use the query here

        const data = usersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return {
            success: true,
            data: data
        }
    } catch (error) {
        error.message = error.message.split('Firebase:')[1];
        return {
            success: false,
            message: error?.message || 'Internal Server Error'
        }
    }
}

export const sendMail = async (data) => {

    try {
        await addDoc(collection(db, 'emails'), data);

        return {
            success: true,
            message: 'Email Sent'
        }

    } catch (error) {

        error.message = error.message.split('Firebase:')[1];
        return {
            success: false,
            message: error?.message || 'Internal Server Error'
        }
    }
}

export const logout = async () => {
    try {
        await signOut(auth);
        return { success: true, message: 'Logout Successfully' };
    } catch (error) {
        error.message = error.message.split('Firebase:')[1];
        return {
            success: false,
            message: error?.message || 'Internal Server Error'
        }
    }
}