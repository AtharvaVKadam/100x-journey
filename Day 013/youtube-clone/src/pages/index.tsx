import { Appbar } from "@/components/AppBar";
import { Sidebar } from "@/components/Sidebar";
import VideoGrid from "@/components/VideoGrid";

function Home() {
  return (
    <div className="bg-black min-h-screen">
      <Appbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 overflow-x-hidden">
          <VideoGrid />
        </main>
      </div>
    </div>
  );
}

export default Home;