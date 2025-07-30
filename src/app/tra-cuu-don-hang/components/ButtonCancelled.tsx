export const ButtonCancelled = ({}) => {
  return (
    <button
      // onClick={() => handleCancelTicket(ticket.ticketId)}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Hủy vé
    </button>
  );
};
