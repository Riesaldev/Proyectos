import React from "react";
import Navbar from "@/components/Navbar/Navbar.jsx";
import SliderVideo from "@/components/Home/SliderVideo.jsx";

function HomePage () {
    return (
        <>
            <div className="relative bg-zinc-900">
                <Navbar />
                <SliderVideo />
            </div>
        </>
    );
}

export default HomePage;