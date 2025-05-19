




const Ticket = () => {
  const name = localStorage.getItem( "name" ) || "Jonatan Kristof";
  const email = localStorage.getItem( "email" ) || "jonatan@email.com";
  const git = localStorage.getItem( "git" ) || "@jonatanKristof0101";
  const avatar = localStorage.getItem( "avatar" ) || "";
  const date = localStorage.getItem( "date" ) || "Jan 31, 2025";
  const localization = localStorage.getItem( "localization" ) || "Austin, TX";
  const Ticketcode = localStorage.getItem( "Ticketcode" ) || "#01609";

  return (
    <div className="flex flex-col items-center min-h-screen w-full gap-8 py-8 px-4 pb-16">

      <div className="flex flex-col w-full h-2/3 gap-24 items-center">
        {/* TicketPage Title */}
        <div className="flex flex-col items-center w-full gap-6">
          <div className="">
            <h1 className="text-3xl font-bold text-neutral-100">Congrats, <span className="text-orange-500">{name}</span>! Your ticket is ready.</h1>
          </div>
          {/* TicketPage Details */}
          <div className=" flex flex-col gap-2 w-3/4">
            <p className="text-neutral-400 text-xl ">We've emailed your ticket to <span className="text-orange-400 font-light ">{email}</span> and will send updates in the run up to the event.</p>
          </div>
        </div>
        {/* TicketPage Image */}
        <div className="flex flex-col items-center  w-full">
          <div className="relative w-full">
            {/* Ticket Image */}
            <img src="../../public/assets/images/pattern-ticket.svg" alt="ticket" className="w-full h-auto" />

            {/* Ticket content */}
            <div className="absolute top-0 left-4 w-full h-full flex items-center justify-between gap-4 ">

              {/*event information*/}
              <div className="flex flex-col h-3/4 w-3/5 justify-around ">
                <div className="flex flex-col h-14 ">
                  <img src="../../public/assets/images/logo-full.svg" alt="logo" className="w-44" />
                  <p className="text-neutral-400 text-xs">{date} / {localization}</p>
                </div>
                {/*User information*/}
                <div className="flex flex-row w-full gap-2">
                  {/*avatar */}
                  <img src="../../public/assets/images/image-avatar.jpg" alt="avatar" className="w-10 h-10 rounded-lg" />
                  {/*user name */}
                  <div className="flex flex-col items-start">
                    <h3 className="text-neutral-100 text-md font-light">{name}</h3>
                    {/*GitHub username */}
                    <div className="flex flex-row items-center">{avatar}
                      <img src="../../public/assets/images/icon-github.svg" alt="confirmation code" className="w-4 h-3" />
                      <p className="text-neutral-400 text-xs">{git}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/*Ticket code */}
              <div className="flex flex-col items-center rotate-90 ">

                <p className="text-neutral-500 text-3xl">{Ticketcode}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


export default Ticket;