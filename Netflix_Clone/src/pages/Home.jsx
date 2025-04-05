import React from "react";
import Navbar from "@/components/Navbar/Navbar.jsx";
import SliderVideo from "@/components/Home/SliderVideo.jsx";

export default function PageHome () {
    return (
        <>
            <div className="relative bg-zinc-900">
                <Navbar />
                <SliderVideo />
            </div>
        </>
    );
}