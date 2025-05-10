

const Form = () => {
    return (
        <div className="flex flex-col items-center h-full w-full gap-12 z-10">
            <div className="gap-6 flex flex-col w-10/12 items-center justify-center text-center">
                <h1 className="text-3xl -tracking-wider font-semibold">Your Journey to Coding Conf 2025 Starts Here!</h1>
                <p className="text-neutral-400 text-lg/tight ">Secure your spot at next year`s biggest coding conference.</p>
            </div>

            <form className="flex flex-col  gap-5 w-10/12">

                <div className="flex flex-col items-start  gap-6 w-full">
                    <div className="flex flex-col gap-3 w-full items-start">
                        <label htmlFor="name">Upload Avatar</label>

                        <div className="border-2 border-dashed border-slate-700 rounded-xl w-full h-28 justify-center items-center flex flex-col gap-2 text-slate-400">

                            <div className="flex justify-center items-center w-10 h-10 bg-[#332d53] rounded-lg border border-[#3c385e]  ">

                                <img src="../../public/assets/images/icon-upload.svg" alt="upload" className="h-8 w-auto" />
                            </div>

                            <p>Drag and drop or click to upload</p>
                        </div>

                        <section className="flex flex-row gap-2 items-center text-slate-500">
                            <img src="../../public/assets/images/icon-info.svg" alt="info" />
                            <p className="text-xs">Upload your foto (JPG or PNG, max size: 500KB).</p>
                        </section>
                    </div>

                    <div className="flex flex-col w-full items-start gap-3">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" id="name" className="border rounded-lg border-slate-500 p-2 w-full h-12" required />
                    </div>
                    <div className="flex flex-col gap-3 w-full items-start">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" placeholder="Example@email.con" className="border rounded-lg w-full h-12 border-slate-500 placeholder:pl-4" required />
                    </div>
                    <div className="flex flex-col gap-3 w-full items-start">
                        <label htmlFor="phone">GitHub Username</label>
                        <input type="text" id="git" placeholder="@yourusername" className="border rounded-lg border-slate-500 p-2 w-full h-12 placeholder:pl-4" required />
                    </div>
                </div>
                <div>
                    <button type="submit" className="bg-[#F57463] text-lg h-15 w-full rounded-xl text-neutral-800 font-black">Generate My Ticket</button>
                </div>
            </form>
        </div>
    );
}

export default Form;
