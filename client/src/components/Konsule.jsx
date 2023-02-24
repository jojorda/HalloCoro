import React from "react";
import hero from "../../src/assets/Hero.png";
import iconbtn from "../../src/assets/iconbtn.png";
import { Link } from "react-router-dom";

export default function Hero() {
    return (
        <div>
            <div
                style={{  marginTop: "10vh", height: "58vh", width: "auto", backgroundPosition: "center top",
                    backgroundSize: "100%", backgroundRepeat: "no-repeat",
                    backgroundImage: `url(${hero})`,
                    padding:"100px"
                }}
            >
                <Link to="/patient/consultation">
                    <button
                        style={{ margin: "15rem",  padding:"3px", border: "0px",  backgroundColor: "#F5F5F5",  height: "70px",
                            width:"400px", marginTop: "12rem", marginLeft: "8rem",
                            backgroundRepeat: "no-repeat",  backgroundSize: "15%",
                            backgroundPosition: "left center ",
                            backgroundPositionX: "10px",  backgroundPositionY: "center",
                            backgroundImage: `url(${iconbtn})` }}
                    >
                        <span className="py-5"
                            style={{ fontWeight: "700",  color: "#ff6185", fontSize: "20px", marginLeft: "4rem", }} >
                            Konsultasi dengan Dokter
                        </span>
                    </button>
                </Link>
            </div>
        </div>
    );
}
