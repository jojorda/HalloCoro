import React, { useContext, useState } from "react";
import { Modal, Alert } from "react-bootstrap";
// import { UserContext } from "../context/userContex";
import { useMutation } from "react-query";
import { API } from "../config/api";

export default function Signup({ signUpShow, setSignUpShow, signUpHere, setSignInShow }) {
     const [message, setMessage] = useState(null);

     const [form, setForm] = useState({
         name: "",
         username: "",
         email: "",
         password: "",
         listAs: "",
         gender: "",
         phone: "",
         address: "",
        });
        
    const {
        name,
        username,
        email,
        password,
        listAs,
        gender,
        phone,
        address,
    } = form;

    const ListAsRole = [
        {
            value: "",
            text: "-- Pilih --",
        },
        {
            value: "patient",
            text: "Patient",
        },
        {
            value: "doctor",
            text: "Doctor",
        },
    ];

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

            const response = await API.post("/register", body, config);
            alert("Register succses, Silahkan Sign In ..!");      
            setSignUpShow(false)
           
                // console.log("habis register : ", response); 
                // setSignInShow(true

        } catch (error) {
            alert("gagal")
            console.log(error);
        }
    });

    return (
        <div>
            <Modal size="md" show={signUpShow} onHide={() => setSignUpShow(false)} centered>
                <Modal.Body className="bg-Modal">
                    <div>
                        <div className="mb-2 text-center"
                            style={{ fontSize: "30px", lineHeight: "49px", fontWeight: "700", color: "black", }} > 
                            Sign Up
                        </div>
                        {message && message}
                        <form>
                            <div className="mt-3 form">
                                <label className="label">Full Name</label>
                                <input className="px-3 py-2 mb-2" type="text" name="name" value={name}
                                    onChange={handleChange} 
                                />
                                <label className="label">Username</label>
                                <input className="px-3 py-2 mb-2" type="text"  name="username" value={username}
                                    onChange={handleChange} 
                                />
                                <label className="label">Email</label>
                                <input className="px-3 py-2 mb-2" type="email" name="email" value={email}
                                    onChange={handleChange}  
                                />
                                <label className="label">Password</label>
                                <input className="px-3 py-2 mb-2" type="password" name="password" id="ShowPass"
                                    value={password} onChange={handleChange}    
                                />
                                <label className="label">List As</label>
                                <select className="px-3 py-2 mb-2" name="listAs" value={listAs}
                                    onChange={handleChange}>   
                                    {ListAsRole.map((item) => (
                                        <option key={item.value} value={item.value}>
                                            {item.text}
                                        </option>
                                    ))}
                                  
                                </select>
                                <label className="label">Gender</label>
                                <select className="px-3 py-2 mb-2" name="gender" value={gender}
                                    onChange={handleChange} >
                                  
                                    <option>~ Pilih ~</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                <label className="label">Phone</label>
                                <input className="px-3 py-2 mb-2" type="text" name="phone" value={phone}
                                    onChange={handleChange}
                                />
                                <label className="label">Address</label>
                                <input className="px-3 py-2 mb-2" type="text" name="address" value={address}
                                    onChange={handleChange} />
                            </div>
                    
                            <div className="d-grid gap-2 mt-3">
                                <button type="button" className="btnauth" onClick={(e) => handleSubmit.mutate(e)}>
                                    Sign Up
                                </button>
                                <p className="warning">
                                    Already have an account?
                                    <button onClick={signUpHere} className="btnHere">
                                        Click here
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
