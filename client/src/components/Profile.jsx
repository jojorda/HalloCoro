import React, { useContext, useState } from "react";
import patient from "../../src/assets/dropdown/patient.png";
import doctor from "../../src/assets/dropdown/doctor.png";
import name from "../../src/assets/profile/name.png";
import address from "../../src/assets/profile/address.png";
import email from "../../src/assets/profile/email.png";
import gender from "../../src/assets/profile/gender.png";
import phone from "../../src/assets/profile/phone.png";
import status from "../../src/assets/profile/status.png";
import { UserContext } from "../context/userContex";
// import { useNavigate } from "react-router-dom";
import ChangeImageModal from "../components/ChangeImageModal";
import { API } from "../config/api";
import { useQuery } from "react-query";
import jwt from "jwt-decode"

export default function Profile() {
    const title = "Profile";
    document.title = "Hallo Corona | " + title;

    const token = localStorage.getItem("token") 
    const tokn = jwt(token)
    const [state] = useContext(UserContext);
    // let navigate = useNavigate();
    const id = state.user.id;

    let { data: userId } = useQuery("userCache", async () => {
        const response = await API.get("/user/" + tokn.id);
        return response.data.data;
      });
      
    //   console.log(userId)

    const [modalShowImage, setModalShowImage] = React.useState(false);
    
    return (
        <div className="profile-container">
            <div className="profile-card shadow">
                <div className="profile-desc">
                    <div className="profile-data">
                        <h2>Personal Info</h2>
                    </div>
                    <div className="profile-data">
                        <div className="profile-icon">
                            <img src={name} alt="" />
                        </div>
                        <div className="profile-details">
                            <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                                {state?.user?.username}
                            </span>
                            <span>Username</span>
                        </div>
                    </div>
                    <div className="profile-data">
                        <div className="profile-icon">
                            <img src={email} alt="" />
                        </div>
                        <div className="profile-details">
                            <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                                {state?.user?.email}
                            </span>
                            <span>Email</span>
                        </div>
                    </div>
                    <div className="profile-data">
                        <div className="profile-icon">
                            <img src={status} alt="" />
                        </div>
                        <div className="profile-details">
                            <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                                {state?.user?.listAs}
                            </span>
                            <span>Status</span>
                        </div>
                    </div>
                    <div className="profile-data">
                        <div className="profile-icon">
                            <img src={gender} alt="" />
                        </div>
                        <div className="profile-details">
                            <span style={{ fontSize: "18px", fontWeight: "bold" }}>{state?.user?.gender}</span>
                            <span>Gender</span>
                        </div>
                    </div>
                    <div className="profile-data">
                        <div className="profile-icon">
                            <img src={phone} alt="" />
                        </div>
                        <div className="profile-details">
                            <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                                {state?.user?.phone}
                            </span>
                            <span>Mobile Phone</span>
                        </div>
                    </div>
                    <div className="profile-data">
                        <div className="profile-icon">
                            <img src={address} alt="" />
                        </div>
                        <div className="profile-details">
                            <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                                {state?.user?.address}
                            </span>
                            <span>Address</span>
                        </div>
                    </div>
                </div>
                <div className="col profile-img" > 
                    {state.user.listAs === "patient" ? (
                        // <img src={userId?.image !== "" ? "http://localhost:5000/uploads/"+userId?.image : patient} alt="avatar" style={{ width: "310px", height: "430px", objectFit: "cover" }} className="shadow rounded " />
                        <img src={userId?.image !== "" ? userId?.image : patient} alt="avatar" style={{ width: "310px", height: "430px", objectFit: "cover" }} className="shadow rounded " />
                    ) : (
                        // <img src={userId?.image !== "" ? "http://localhost:5000/uploads/"+userId?.image : doctor} alt="avatar" style={{ width: "310px", height: "430px", objectFit: "cover" }} className="shadow rounded " />
                        <img src={userId?.image !== "" ? userId?.image : doctor} alt="avatar" style={{ width: "310px", height: "430px", objectFit: "cover" }} className="shadow rounded " />
                    )}
                    <button className="" style={{ width: "20rem", backgroundColor: "#FF6185", color: "white"}} 
                        onClick={() => setModalShowImage(true)}>
                        Change Image Profile
                    </button>
                    <ChangeImageModal show={modalShowImage} onHide={() => setModalShowImage(false)} />
                </div>
            </div>
        </div>
    );
}
