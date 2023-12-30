import Chessboard from "@/components/chessboard";
import SignIn from "@/components/sign-in";
import SignOut from "@/components/sign-out";
import createServerClient from "../../../supabase/createServerClient";

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
          <Chessboard userId={user.id} />
        </>
      )}
    </div>
  );
}

export default Page;
