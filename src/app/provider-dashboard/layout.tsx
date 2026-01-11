import SideBar from "./components/sideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-between">
      <div className="bg-slate-700 text-white min-h-screen w-56 border-r-slate-400">
        <SideBar />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
