import React, { useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../src/assets/logo.png";
import Signup from "../components/Sigup";
import Signin from "../components/Signin";
import bgImg from "../../src/assets/Hero.png";
import iconbtn from "../../src/assets/iconbtn.png";
import Article from "../components/Article";

export default function Landing() {
    const title = "Home";
    document.title = "Hallo Corona | " + title;

    const [signUpShow, setSignUpShow] = useState(false);
    const [signInShow, setSignInShow] = useState(false);

    const signInHere = (e) => {
        e.preventDefault();
        setSignInShow(false);
        setSignUpShow(true);
    };

    const signUpHere = (e) => {
        e.preventDefault();
        setSignUpShow(false);
        setSignInShow(true);
    };
    return (
        <div>
            <Navbar bg="white" expand="lg" fixed="top" style={{ height: "10vh" }}>
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img src={Logo} alt="" style={{ width: "270px" }} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end" >
                        <button variant="outline-light" className="btnlogin me-2"
                            onClick={() => setSignUpShow(true)} >
                            Sign Up
                        </button>
                        <button className="btnregist" variant="outline-light" onClick={() => setSignInShow(true)}>
                            Sign In
                        </button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div
                style={{ marginTop: "10vh", height: "58vh", width: "auto",  backgroundPosition: "center top", backgroundSize: "100%", backgroundRepeat: "no-repeat", padding:"100px",
                backgroundImage: `url(${bgImg})` }}>
                <button onClick={() => setSignInShow(true)}
                    style={{ margin: "15rem",  padding:"3px", border: "0px", borderRadius:"10px", backgroundColor: "#F5F5F5", height: "60px", width:"500px",  marginTop: "7rem",
                        marginLeft: "4rem", backgroundRepeat: "no-repeat", backgroundSize: "15%", backgroundPositionX: "10px",  backgroundPositionY: "center",
                        backgroundImage: `url(${iconbtn})` }}>
                    <span className="py-5" style={{ fontWeight: "700", color: "#ff6185", fontSize: "20px",  marginLeft: "4rem" }} >
                        Konsultasi Dengan Dokter
                    </span>
                </button>
            </div>
            <Article/>
                <Signup signUpHere={signUpHere} signUpShow={signUpShow} setSignUpShow={setSignUpShow} />
                <Signin signInHere={signInHere} signInShow={signInShow} setSignInShow={setSignInShow} />
        </div>
    );
}
