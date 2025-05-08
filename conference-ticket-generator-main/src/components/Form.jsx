

const Form = () => {
    return (
        <div className="flex flex-col items-center h-full w-full gap-8">
            <div className="gap-5 flex flex-col w-10/12">
                <h1 className="text-2xl font-semibold">Your Journey to Coding Conf 2025 Starts Here!</h1>
                <p>Secure your spot at next year`s biggest coding conference.</p>
            </div>

            <form className="flex flex-col  gap-5 w-10/12">
                <div className="flex flex-col items-start  gap-2 w-full">
                    <label htmlFor="name" className="text-sm font-semibold">Upload Avatar</label>
                    <div className="border rounded-md w-full h-30 justify-center flex flex-col gap-2">
                        <img src="../../public/assets/images/icon-upload.svg" alt="upload" className="h-10 w-10 border  " />
                        <p>Drag and drop your images</p>
                    </div>

                    <label htmlFor="email" className="text-sm font-semibold">Email Address</label>
                    <input type="email" id="email" placeholder="Example@email.con" className="border rounded-md w-full h-12" required />
                    <label htmlFor="phone" className="text-sm font-semibold">GitHub Username</label>
                    <input type="text" id="git" placeholder="@yourusername" className="border border-gray-300 rounded-md p-2 w-full h-12" required />
                </div>
                <div>
                    <button type="submit" className="bg-orange-700 text-lg h-15 w-full rounded-2xl">Generate My Ticket</button>
                </div>
            </form>
        </div>
    );
}

export default Form;
