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
});

const baseURL = "http://127.0.0.1:8000/api";

const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        JSON.parse(localStorage.getItem('authTokens')) || null
    );

    const [user, setUser] = useState(() => {
        const storedTokens = localStorage.getItem('authTokens');
        return storedTokens ? jwtDecode(storedTokens) : null;
    });

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const registerUser = async (email, username, password, password2) => {
        try {
            const response = await axios.post(`${baseURL}/auth/register/`, {
                email,
                username,
                password,
                password2
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.status === 201) {
                navigate('/login');
                swal.fire({
                    title: "Registration Successful, Login Now",
                    icon: "success",
                    toast: true,
                    timer: 2000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }
        } catch (error) {
            console.error("Error registering user:", error);
            swal.fire({
                title: "An Error Occurred during Registration",
                text: error.message || "Internal Server Error",
                icon: "error",
                toast: true,
                timer: 2000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    };

    const loginUser = async (username, password) => {
        try {
            const response = await axios.post(`${baseURL}/auth/gettoken/`, {
                username,
                password
            }, {
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
                title: "Username or password does not exist",
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
            const response = await axios.get(`${baseURL}/profiles/profile/`, {
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
            console.error('Error checking profile:', error);
            swal.fire({
                title: 'An Error Occurred while Checking Profile',
                text: error.message || 'Internal Server Error',
                icon: 'error',
                toast: true,
                timer: 2000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
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
            const response = await axios.post(`${baseURL}/auth/refreshtoken/`, {
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
        const fourMinutes = 1000 * 60 * 4;
        const interval = setInterval(() => {
            if (authTokens) {
                refreshToken();
            }
        }, fourMinutes);
        return () => clearInterval(interval);
    }, [authTokens]);

    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode(authTokens.access));
        }
        setLoading(false);
    }, [authTokens, loading]);

    const createProfile = async (user, fullname, age, gender, bldGrp, address, contact) => {
        try {
            const response = await axios.post(`${baseURL}/profiles/profile/`, { user, fullname, age, gender, bldGrp, address, contact }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.status === 201) {
                navigate('/');
                swal.fire({
                    title: "Profile Created Successfully",
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
                title: "An Error Occurred while Creating Profile",
                text: "Internal Server Error",
                icon: "error",
                toast: true,
                timer: 2000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    };

    const createBldRequest = async (
        user,
        recipientName,
        bldDonationLocation,
        bldRequiredBeforeDate,
        bldRequiredBeforeTime,
        bldGrp,
        unitsNeeded,
        contact,
        reason,
        req
    ) => {
        try {
            let response;
            if (req) {
                response = await axios.put(`${baseURL}/requests/request/${req.id}/`, {
                    user,
                    recipientName,
                    bldDonationLocation,
                    bldRequiredBeforeDate,
                    bldRequiredBeforeTime,
                    bldGrp,
                    unitsNeeded,
                    contact,
                    reason
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            } else {
                response = await axios.post(`${baseURL}/requests/request/`, {
                    user,
                    recipientName,
                    bldDonationLocation,
                    bldRequiredBeforeDate,
                    bldRequiredBeforeTime,
                    bldGrp,
                    unitsNeeded,
                    contact,
                    reason
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            }
    
            if (response.status === 201 || response.status === 200) {
                navigate('/');
                swal.fire({
                    title: "Blood Request Created Successfully",
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
                text: "Internal Server Error",
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
            const response = await axios.post(`${baseURL}/feedbacks/feedback/`, {
                recipient,
                donor,
                thanksmsg
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authTokens.access}`
                }
            });
            if (response.status === 201) {
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
                text: error.message || "Internal Server Error",
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
        sendFeedback
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
