




const Ticket = () => {
  const userName = localStorage.getItem( "userName" );
  const userEmail = localStorage.getItem( "userEmail" );
  return (
    <div className="flex flex-col items-center min-h-screen w-full gap-8 py-8 px-4 pb-16">
      <div className="gap-4 flex flex-col w-full justify-center text-center items-center">
        <div className="flex flex-col gap-2 w-3/4">
          <h1 className="text-2xl font-bold text-neutral-100">Congrats, <span>{userName}</span>! Your ticket is ready.</h1>
        </div>
        <div className="flex flex-col gap-2 w-3/4">
          <p className="text-neutral-400 text-base ">We've emailed your ticket to <span>{userEmail}</span> and will send updates in the run up to the event.</p>
          
        </div>

      </div>
    </div>
  );
}


export default Ticket;