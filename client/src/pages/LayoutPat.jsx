import React from "react";
import { Outlet } from "react-router-dom";
import NavbarPatient from "../components/NavbarPat";

export default function LayoutPatient() {
    // const role = localStorage.getItem("role");

    return (
        <div>
            <NavbarPatient />
            <Outlet />
        </div>
    );
}
