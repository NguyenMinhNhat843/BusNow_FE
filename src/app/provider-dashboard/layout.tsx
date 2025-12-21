import SideBar from "./components/sideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-between">
      <div className="rounded-md shadow-2xl bg-black/80 text-white min-h-screen w-56">
        <SideBar />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
