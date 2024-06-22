/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import axios from "axios";

export const AuthContext = createContext({
    user: null,
    setUser: () => { },
    authTokens: null,
    setAuthTokens: () => { },
    registerUser: () => { },
    loginUser: () => { },
    logoutUser: () => { },
    createProfile: () => { },
    createBldRequest: () => { },
    sendFeedback: () => { },
    contact: () => { },
    newsletter: () => { },
});

const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        JSON.parse(localStorage.getItem('authTokens')) || null
    );

    const [user, setUser] = useState(() => {
        const storedTokens = localStorage.getItem('authTokens');
        return storedTokens ? jwtDecode(storedTokens) : null;
    });

    const baseURL = "https://donorconnect.pythonanywhere.com";

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const registerUser = async (email, username, password, password2) => {
        try {
            const response = await axios.post(`${baseURL}/api/auth/register/`, { email, username, password, password2 }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.status === 201) {
                swal.fire({
                    title: "Registration Successful, Login Now",
                    icon: "success",
                    toast: true,
                    timer: 2000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
                return { success: true };
            }
        } catch (error) {
            return { success: false, errors: error.response.data };
        }
    };

    const loginUser = async (username, password) => {
        try {
            const response = await axios.post(`${baseURL}/api/auth/gettoken/`, { username, password }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = response.data;
            if (response.status === 200) {
                setAuthTokens(data);
                setUser(jwtDecode(data.access));
                localStorage.setItem("authTokens", JSON.stringify(data));
                checkProfile(jwtDecode(data.access).user_id);
            }
        } catch (error) {
            swal.fire({
                title: "Wrong Credentials",
                icon: "error",
                toast: true,
                timer: 2000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    };

    const checkProfile = async (userId) => {
        try {
            const response = await axios.get(`${baseURL}/api/profiles/profile/`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                const profiles = response.data;
                const userProfile = profiles.find(profile => profile.user === userId);
                if (userProfile) {
                    navigate('/');
                } else {
                    navigate('/profile-form');
                }
            }
        } catch (error) {
            console.error("error checking profile:", error);
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        navigate('/login');
        swal.fire({
            title: "You have been logged out...",
            icon: "success",
            toast: true,
            timer: 2000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
        });
    };

    const refreshToken = async () => {
        try {
            const response = await axios.post(`${baseURL}/api/auth/refreshtoken/`, {
                refresh: authTokens.refresh
            });
            if (response.status === 200) {
                setAuthTokens(response.data);
                setUser(jwtDecode(response.data.access));
                localStorage.setItem("authTokens", JSON.stringify(response.data));
            } else {
                logoutUser();
            }
        } catch (error) {
            console.log("Error refreshing token:", error);
            logoutUser();
        }
    };

    useEffect(() => {
        const tenDays = 1000 * 60 * 60 * 24 * 10;
        const interval = setInterval(() => {
            if (authTokens) {
                refreshToken();
            }
        }, tenDays);
        return () => clearInterval(interval);
    }, [authTokens]);

    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode(authTokens.access));
        }
        setLoading(false);
    }, [authTokens, loading]);

    const createProfile = async (user, fullname, age, gender, bldGrp, address, contact, profile) => {
        try {
            let response;
            if (profile) {
                response = await axios.put(`${baseURL}/api/profiles/profile/${profile.id}/`, { user, fullname, age, gender, bldGrp, address, contact }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            } else {
                response = await axios.post(`${baseURL}/api/profiles/profile/`, { user, fullname, age, gender, bldGrp, address, contact }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            }
            if (response.status === 201 || response.status === 200) {
                navigate('/my-profile')
                swal.fire({
                    title: 'Profile Saved Successfully',
                    icon: 'success',
                    toast: true,
                    timer: 2000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }
        } catch (error) {
            swal.fire({
                title: 'An Error Occurred while Creating Profile',
                icon: 'error',
                toast: true,
                timer: 2000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    };

    const createBldRequest = async (user, recipientName, recipientAge, bldGrp, bldRequiredBeforeDate, bldDonationLocation, contact, req) => {
        try {
            let response;
            if (req) {
                response = await axios.put(`${baseURL}/api/requests/request/${req.id}/`, { user, recipientName, recipientAge, bldGrp, bldRequiredBeforeDate, bldDonationLocation, contact }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            } else {
                response = await axios.post(`${baseURL}/api/requests/request/`, { user, recipientName, recipientAge, bldGrp, bldRequiredBeforeDate, bldDonationLocation, contact }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            }
            if (response.status === 201 || response.status === 200) {
                navigate('/request-added');
                swal.fire({
                    title: "Blood Request Added Successfully",
                    icon: "success",
                    toast: true,
                    timer: 2000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }

        } catch (error) {
            console.error("Error sending data:", error);
            swal.fire({
                title: "An Error Occurred while Creating Blood Request",
                icon: "error",
                toast: true,
                timer: 2000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    };

    const sendFeedback = async (recipient, donor, thanksmsg) => {
        try {
            const response = await axios.post(`${baseURL}/api/feedbacks/feedback/`, { recipient, donor, thanksmsg }, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (response.status === 201) {
                navigate('/')
                swal.fire({
                    title: "Feedback Sent Successfully",
                    icon: "success",
                    toast: true,
                    timer: 2000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }
        } catch (error) {
            console.error("Error sending feedback:", error);
            swal.fire({
                title: "An Error Occurred while Sending Feedback",
                icon: "error",
                toast: true,
                timer: 2000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    };

    const contact = async (user, fullname, email, msg) => {
        try {
            const response = await axios.post(`${baseURL}/contact/contactmail/`, { user, fullname, email, msg }, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${authTokens.access}`
                }
            });
            if (response.status === 200) {
                navigate('/');
                swal.fire({
                    title: "Message Sent Successfully",
                    icon: "success",
                    toast: true,
                    timer: 2000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }
        } catch (error) {
            console.error("Error sending message:", error);
            swal.fire({
                title: "An Error Occurred while Sending Message",
                icon: "error",
                toast: true,
                timer: 2000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    };

    const newsletter = async (user, email) => {
        try {
            const response = await axios.post(`${baseURL}/newsletter/`, { user, email }, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (response.status === 201) {
                navigate('/')
                swal.fire({
                    title: "Newsletter Subscribed Successfully",
                    icon: "success",
                    toast: true,
                    timer: 2000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }
        } catch (error) {
            console.error("Error subscribing newsletter:", error);
            swal.fire({
                title: "An Error Occurred while Subscribing Newsletter",
                icon: "error",
                toast: true,
                timer: 2000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    };

    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser,
        createProfile,
        createBldRequest,
        sendFeedback,
        contact,
        newsletter
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;