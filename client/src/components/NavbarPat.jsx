import React, { useContext } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../src/assets/logo.png";
import Patient from "../../src/assets/dropdown/patient.png";
import Profile from "../../src/assets/dropdown/profile.png";
import Consult from "../../src/assets/dropdown/consult.png";
import LogoutIcon from "../../src/assets/dropdown/logout.png";
import { UserContext } from "../context/userContex";
import { useQuery } from "react-query";
import { API } from "../config/api";
import jwt from "jwt-decode"

export default function NavbarPatient() {
    const [state, dispatch] = useContext(UserContext);
    
    let navigate = useNavigate();

    const token = localStorage.getItem("token") 
    const tokn = jwt(token)

    const logout = () => {
        dispatch({
            type: "LOGOUT",
        });
        navigate("/");
    };

    const id = state.user.id;
    
    let { data: userId } = useQuery("userCache", async () => {
        const response = await API.get("/user/" + tokn.id);
        return response.data.data;
    }); 
    // console.log("ini userid", userId)
    return (
        <div>
            <Navbar bg="white" expand="lg" fixed="top" style={{ height: "10vh" }}>
                <Container>
                    <Navbar.Brand as={Link} to="/patient">
                        <img src={Logo} alt="" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end" >
                        <div className="d-flex justify-content-end">
                        <p className=" me-3 mt-4 fs-4 fw-bold " >
                            Selamat Datang{" "} 
                            <span className="text-warning">{state?.user.username}</span>
                        </p></div>
                        <Nav>
                            <NavDropdown id="nav-dropdown"
                                title={
                                    <img className="rounded-circle" alt="Patient"
                                        style={{ width: "50px", height:"50px", objectFit:"cover"}}
                                        // src={userId?.image != "" ? "http://localhost:5000/uploads/"+userId?.image : Patient}
                                        src={userId?.image != "" ? userId?.image : Patient}
                                    />
                                }>
                                <NavDropdown.Item bg="dark" variant="dark" as={Link}
                                    to="/patient/profile" >
                                    <img alt="icon" src={Profile} style={{ width: "25px", marginRight: "5px" }} />
                                    Profile
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/patient/inbox">
                                    <img alt="icon"  src={Consult} style={{ width: "25px", marginRight: "5px" }} />
                                    Consultation
                                </NavDropdown.Item>
                                <NavDropdown.Divider style={{ backgroundColor: "grey", color: "white" }} />
                                <NavDropdown.Item onClick={logout}>
                                    <img alt="icon" src={LogoutIcon} style={{ width: "25px", marginRight: "5px" }} />
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}
