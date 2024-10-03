import React from 'react';
import { Link } from "react-router-dom";


const TicketItems = ({ ticket }) => {
  
  
  return (
    <div>

      {/* <Link to="/admin/tickets/">View</Link> */}
      <Link
        to={`/admin/tickets/${ticket._id}`}
        className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline inline-block mt-2"
      >
        View
      </Link>

    </div>
  );
};

export default TicketItems;
