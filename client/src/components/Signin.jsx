import React, { useContext, useState } from "react";
import { UserContext } from "../context/userContex";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import { Modal, Alert } from "react-bootstrap";

export default function Signin({ signInShow, setSignInShow, signInHere }) {
    let navigate = useNavigate();

    const [state, dispatch] = useContext(UserContext);

    const [message, setMessage] = useState(null);
    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const { username, password } = form;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    // mengirimkan query GraphQL pada server
    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const body = JSON.stringify(form);
            const response = await API.post("/login", body, config);

            if (response.status === 200) {
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: response.data.data,
                });
                if (response.data.data.listAs === "doctor") {
                    navigate("/doctor");
                } else {
                    navigate("/patient");
                }

                const alert = (
                    <Alert variant="success" className="py-1">
                        Login success
                    </Alert>
                );
                setMessage(alert);
            }
        } catch (error) {
            console.log(error);

            if (error) {
                const alertPassword = (
                    <Alert variant="danger" className="py-1">
                        Something wrong..
                    </Alert>
                );
                setMessage(alertPassword);
            }
        }
    });

    return (
        <div>
            <Modal size="sm" show={signInShow} onHide={() => setSignInShow(false)} centered >
                <Modal.Body className="bg-Modal">
                    <div>
                        <div className="mb-3 text-center"
                            style={{ fontSize: "30px", lineHeight: "49px", fontWeight: "700", color: "black", }}  
                        > Sign In
                        </div>
                        {message && message}
                        <form onSubmit={(e) => handleSubmit.mutate(e)}>
                            <div className="mt-3 form">
                                <label className="label">Username</label>
                                <input className="px-3 py-2 mb-3" type="text" name="username" 
                                    value={username} onChange={handleChange}  
                                />
                                <label className="label">Password</label>
                                <input className="px-3 py-2 mb-3" type="password" name="password" id="ShowPass"
                                    value={password} onChange={handleChange} />
                            </div>
                           
                            <div className="d-grid gap-2 mt-3">
                                <button type="submit" className="btnauth" variant="outline-light">
                                    Sign In
                                </button>
                                <p className="warning">
                                    Don't have an account? Click 
                                    <button onClick={signInHere} className="btnHere">
                                        here
                                    </button>
                                </p>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
