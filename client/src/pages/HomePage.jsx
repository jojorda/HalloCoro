import React from "react";
import Konsul from "../components/Konsule";
import Article from "../../src/components/Article";

function HomePage() {
    const title = "Home";
    document.title = "Hallo Corona | " + title;
    return (
        <div>
            <Konsul/>
            <Article />
        </div>
    );
}

export default HomePage;
