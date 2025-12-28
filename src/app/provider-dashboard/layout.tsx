import SideBar from "./components/sideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-between">
      <div className="rounded-md min-h-screen w-56 border-r border-r-slate-400">
        <SideBar />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
