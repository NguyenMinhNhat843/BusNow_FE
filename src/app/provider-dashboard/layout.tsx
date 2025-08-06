import SideBar from "./components/sideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-between">
      <div className="rounded-md overflow-hidden shadow-2xl bg-black/80 text-white min-h-screen">
        <SideBar />
      </div>
      <div className="grow">{children}</div>
    </div>
  );
}
