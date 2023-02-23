import React from "react";
import Nottfound from "../assets/notfound.jpg";

export default function Notfound() {
  return (
    <div style={{ height: "100vh", width: "100%", backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${Nottfound})`,}}>
    </div>
  );
}
