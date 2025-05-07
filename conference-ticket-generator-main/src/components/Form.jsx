

const Form = () => {
    return (
        <div className="flex flex-col gap-4 relative w-full">
            <div className="flex flex-col">
                <p>Upload Avatar</p>
                <div id="drop" onDrop="dropHandler(e); " className="border-[1px] border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center h-32 gap-5">
                    <div className="flex items-center justify-center w-12 h-12  backdrop-blur-4xl backdrop-brightness-150 backdrop-contrast-70 rounded-lg mb-2 shadow-xs shadow-gray-900">
                        <img src="../../assets/images/icon-upload.svg" alt="drop" />
                    </div>
                    <p className="text-xs">Drag and drop or click to upload</p>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <label>Full Name</label>
                <input type="text" className="border-[1px] rounded-lg h-10" />
            </div>
            <div className="flex flex-col gap-1">
                <label>Email Address</label>
                <input type="email" placeholder="Enter your email address" className="border-[1px] rounded-lg h-10" />
            </div>
            <div className="flex flex-col gap-1">
                <label>GitHub Username</label>
                <input type="text" placeholder="Enter your GitHub username" className="border-[1px] rounded-lg h-10" />
            </div>
            <button type="submit" className="bg-orange-700 rounded-xl h-10 text-black">Generate My Ticket</button>
        </div>
    );
}

export default Form;
