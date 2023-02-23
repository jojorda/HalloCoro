import React, { useContext } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../src/assets/logo.png";
import Doctor from "../../src/assets/dropdown/doctor.png";
import Profile from "../../src/assets/dropdown/profile.png";
import Article from "../../src/assets/dropdown/article.png";
import LogoutIcon from "../../src/assets/dropdown/logout.png";
import { UserContext } from "../context/userContex";
import ListArticle from "../../src/assets/article.png";
import { useQuery } from "react-query";
import { API } from "../config/api";
import jwt from "jwt-decode"

export default function NavbarDoctor() {
    const [state, dispatch] = useContext(UserContext);
    // console.log("aaaaa",state);

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

    return (
        <div>
            <Navbar bg="white" expand="lg" fixed="top" style={{ height: "10vh" }}>
                <Container>
                    <Navbar.Brand as={Link} to="/doctor">
                        <img src={Logo} alt=""/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end" >
                    <div className="d-flex justify-content-end">
                        <p className=" me-3 mt-4 fs-4 fw-bold " >
                            Selamat Datang {" "} 
                            <span className="text-warning"> Dr. {state?.user.username}</span>
                        </p></div>
                        <Nav style={{ marginRight: "5%" }}>
                            <NavDropdown id="nav-dropdown"
                                title={
                                    <img className="rounded-circle" alt="User"
                                        style={{ width: "50px", height:"50px", objectFit:"cover" }}
                                        // src={userId?.image != "" ? "http://localhost:5000/uploads/"+userId?.image : Doctor}
                                        src={userId?.image != "" ? userId?.image : Doctor}
                                    />
                                } >
                                <NavDropdown.Item bg="dark" variant="dark" as={Link}
                                    to="/doctor/profile">
                                    <img alt="icon" src={Profile} style={{ width: "25px", marginRight: "5px" }} />
                                    Profile
                                </NavDropdown.Item>
                                <NavDropdown.Item bg="dark" variant="dark"
                                    as={Link} to="/doctor/list-article" >
                                    <img alt="icon" src={ListArticle}  style={{ width: "25px", marginRight: "5px" }} />
                                    List Article
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/doctor/add-article">
                                    <img alt="icon" src={Article} style={{ width: "25px", marginRight: "5px" }}/>
                                    Add Article
                                </NavDropdown.Item>
                                <NavDropdown.Divider style={{ backgroundColor: "grey", color: "white" }} />
                                <NavDropdown.Item onClick={logout}>
                                    <img alt="icon" style={{ width: "25px", marginRight: "5px" }}
                                        src={LogoutIcon} />
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
