import React, { useRef, useState } from "react";

const Form = () => {
    const [ avatar, setAvatar ] = useState( null );
    const [ dragActive, setDragActive ] = useState( false );
    const inputRef = useRef( null );

    const handleDrop = ( e ) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive( false );
        if ( e.dataTransfer.files && e.dataTransfer.files[ 0 ] )
        {
            setAvatar( e.dataTransfer.files[ 0 ] );
        }
    };

    const handleDragOver = ( e ) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive( true );
    };

    const handleDragLeave = ( e ) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive( false );
    };

    const handleClick = () => {
        inputRef.current.click();
    };

    const handleChange = ( e ) => {
        if ( e.target.files && e.target.files[ 0 ] )
        {
            setAvatar( e.target.files[ 0 ] );
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen w-full gap-8 py-8 px-4 pb-16">
            <div className="gap-4 flex flex-col w-full justify-center text-center items-center">
                <div className="flex flex-col gap-2 w-3/4">
                    <h1 className="text-2xl font-bold text-neutral-100">Your Journey to Coding Conf 2025 Starts Here!</h1>
                </div>
                <div className="flex flex-col gap-2 w-3/4">
                    <p className="text-neutral-400 text-base ">Secure your spot at next year&apos;s biggest coding conference.</p>
                </div>
            </div>

            <form className="flex flex-col gap-6 ">

                {/* Avatar Upload */}
                <div className="flex flex-col gap-4 w-full items-start">
                    <label htmlFor="avatar" className="text-base font-medium text-neutral-200">Upload Avatar</label>
                    <div
                        className={`border-2 border-dashed border-purple-400/20 rounded-xl w-full h-28 flex flex-col justify-center items-center gap-2 bg-neutral-700/20 cursor-pointer transition ${ dragActive ? "border-fuchsia-400 bg-neutral-800" : "" }`}
                        onClick={handleClick}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDragEnd={handleDragLeave}
                    >
                        <input
                            type="file"
                            id="avatar"
                            accept="image/png, image/jpeg"
                            className="hidden"
                            ref={inputRef}
                            onChange={handleChange}
                        />
                        <div className="flex justify-center items-center w-12 h-12 bg-[#332d53]/60 rounded-lg border border-[#3c385e]">
                            <img src="../../public/assets/images/icon-upload.svg" alt="upload" className="h-8 w-auto" />
                        </div>
                        <p className="text-slate-400 text-sm">
                            {avatar ? avatar.name : "Drag and drop or click to upload"}
                        </p>
                    </div>
                    <section className="flex flex-row gap-2 items-center text-slate-500">
                        <img src="../../public/assets/images/icon-info.svg" alt="info" className="w-4 h-4" />
                        <p className="text-xs">Upload your photo (JPG or PNG, max size: 500KB).</p>
                    </section>
                </div>

                {/* Full Name */}
                <div className="flex flex-col w-full gap-2 items-start">
                    <label htmlFor="name" className="text-base font-medium text-neutral-200">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        className="border border-neutral-700/80 rounded-lg p-3 w-full h-12 bg-neutral-700/20 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-fuchsia-400 transition placeholder:pl-3"
                        placeholder="Your full name"
                        required
                    />
                </div>

                {/* Email */}
                <div className="flex flex-col w-full gap-2 items-start">
                    <label htmlFor="email" className="text-base font-medium text-neutral-200">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="example@email.com"
                        className="border border-neutral-700/80 rounded-lg p-3 w-full h-12 bg-neutral-700/20 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-fuchsia-400 transition placeholder:pl-3"
                        required
                    />
                </div>

                {/* GitHub Username */}
                <div className="flex flex-col w-full gap-2 items-start">
                    <label htmlFor="git" className="text-base font-medium text-neutral-200">GitHub Username</label>
                    <input
                        type="text"
                        id="git"
                        placeholder="@yourusername"
                        className="border border-neutral-700/80 rounded-lg p-3 w-full h-12 bg-neutral-700/20 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-fuchsia-400 transition placeholder:pl-3"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-lg h-12 w-full rounded-xl text-neutral-900 font-extrabold mt-2 transition z-1"
                >
                    Generate My Ticket
                </button>
            </form>
        </div>
    );
}

export default Form;