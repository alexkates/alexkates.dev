import Chessboard from "@/components/chessboard";
import SignInWithGithub from "@/components/sign-in-with-github";

function Page() {
  return (
    <div className="flex flex-col items-center">
      <SignInWithGithub />
      <Chessboard />
    </div>
  );
}

export default Page;
