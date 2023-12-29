import Auth from "@/components/auth";
import Chessboard from "@/components/chessboard";

function Page() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full justify-end">
        <Auth />
      </div>
      <Chessboard />
    </div>
  );
}

export default Page;
