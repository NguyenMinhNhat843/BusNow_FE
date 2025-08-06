import ListRefunds from "./components/ListRefunds";

export default function ManagerTicketCancelledPage() {
  return (
    <div className="p-4">
      <p className="text-2xl font-bold text-red-600 pb-4">Yêu cầu hoàn tiền</p>
      <ListRefunds />;
    </div>
  );
}
