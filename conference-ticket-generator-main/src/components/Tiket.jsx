




const Ticket = () => {
  const userName = localStorage.getItem( "userName" );
  const userEmail = localStorage.getItem( "userEmail" );
  return (
    <div className="flex flex-col items-center min-h-screen w-full gap-8 py-8 px-4 pb-16">

      <div className="gap-4 flex flex-col w-full justify-center text-center items-center">
        {/* TicketPage Title */}
        <div className="Title flex flex-col gap-2 w-3/4">
          <h1 className="text-3xl font-bold text-neutral-100">Congrats, <span>{userName}</span>! Your ticket is ready.</h1>
        </div>
        {/* TicketPage Details */}
        <div className=" flex flex-col gap-2 w-3/4">
          <p className="text-neutral-400 text-xl ">We've emailed your ticket to <span>{userEmail}</span> and will send updates in the run up to the event.</p>
        </div>
        {/* TicketPage Image */}
        <div className="flex flex-col items-center w-full">
          <div className="relative w-full">
            {/* Ticket Image */}
            <img src="../../public/assets/images/pattern-ticket.svg" alt="ticket" className="w-full h-auto" />
            {/* Ticket content */}
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
              {/*event information*/}
              <div className="flex flex-col items-center gap-2">
                <h2 className="text-2xl font-bold text-neutral-100">Logo</h2>
                <p className="text-neutral-400 text-lg">date</p>
              </div>
              {/*User information*/}
              <div className="flex flex-col items-center gap-2">
                {/*avatar */}
                <img src="../../public/assets/images/avatar.png" alt="avatar" className="w-16 h-16 rounded-full" />
                {/*user name */}
                <h3 className="text-neutral-100 text-lg">{userName}</h3>
                {/*confirmation code */}
                <p className="text-neutral-400 text-sm">Confirmation code</p>
                <p className="text-neutral-100 text-lg">123456789</p>
                {/*Ticket code */}
                <p className="text-neutral-400 text-sm">Ticket code</p>
                <p className="text-neutral-100 text-lg">123456789</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


export default Ticket;