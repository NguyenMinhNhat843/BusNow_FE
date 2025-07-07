import SideBar from "./components/sideBar";

interface typeOfProp {
  children: React.ReactNode;
}

export default function AdminDashBoardLayout({ children }: typeOfProp) {
  return (
    <div className="flex justify-center p-8">
      <div className="w-[1000px] flex gap-6">
        <div className="shadow-2xl min-h-screen">
          <SideBar />
        </div>
        <div className="grow shadow-2xl p-6">{children}</div>
      </div>
    </div>
  );
}
