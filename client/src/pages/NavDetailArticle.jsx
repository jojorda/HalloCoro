import React, { useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../src/assets/logo.png";
import Signup from "../components/Sigup";
import Signin from "../components/Signin";
import DetailArticle from "../components/DetailArticle";

export default function DetailArticleAuth() {
    const title = "Detail Article";
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
                        <img src={Logo} alt="" />
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
            <DetailArticle />
            <Signup signUpHere={signUpHere} signUpShow={signUpShow} setSignUpShow={setSignUpShow} />

            <Signin signInHere={signInHere} signInShow={signInShow} setSignInShow={setSignInShow} />
        </div>
    );
}
