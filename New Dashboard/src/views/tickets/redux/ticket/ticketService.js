import axios from "axios";

const createTicket = async (ticketData, userToken) => {
  const URL = "/api/tickets/";
  try {

    console.log('ticket data',ticketData)
    console.log('user token',userToken)

    const res = await axios.post(URL, ticketData, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    // await viewTickets();
    return res.data;
  } catch (error) {
    throw { message: error?.response?.data?.message };
  }
};
const viewTickets = async (userToken) => {
  const URL = "/api/tickets/";
  try {
    const res = await axios.get(URL, {
      headers: { Authorization: `Bearer ${userToken}` },
    });

    console.log('response',res.data)
    
    return res.data;
  } catch (error) {
    throw { message: error?.response?.data?.message };
  }
};

const getTicket = async (ticketId, userToken) => {
  const URL = `/api/tickets/view-tickets/${ticketId}`;

  console.log('view ticket',ticketId)

  try {
    const res = await axios.get(URL, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    
    // await viewTickets();
    return res.data;
  } catch (error) {
    throw { message: error?.response?.data?.message };
  }
};
const closeTicket = async (ticketId, userToken) => {
  const URL = `/api/tickets/view-tickets/${ticketId}`;

  try {
    const res = await axios.put(
      URL,
      { status: "closed" },
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    // await viewTickets();
    return res.data;
  } catch (error) {
    throw { message: error?.response?.data?.message };
  }
};

export const ticketService = {
  createTicket,
  viewTickets,
  getTicket,
  closeTicket,
};
