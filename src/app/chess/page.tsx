import Chessboard from "@/components/chessboard";
import SignIn from "@/components/sign-in";
import SignOut from "@/components/sign-out";
import { createServerClient } from "@/lib/createSupabaseServerClient";

async function Page() {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col items-center">
      {!user ? (
        <SignIn />
      ) : (
        <>
          <SignOut />
          <Chessboard />
        </>
      )}
    </div>
  );
}

export default Page;
