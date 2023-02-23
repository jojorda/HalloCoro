import React from "react";
import { Outlet } from "react-router-dom";
import NavbarDoctor from "../components/NavbarDoc";

export default function LayoutDoctor() {
    // const role = localStorage.getItem("role");

    return (
        <div>
            <NavbarDoctor />
            <Outlet />
        </div>
    );
}
