import Auth from "@/components/auth";
import Chessboard from "@/components/chessboard";
import { createServerClient } from "@/lib/supabase";

async function Page() {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full justify-start">
        <Auth />
      </div>
      <Chessboard userId={user?.id} />
    </div>
  );
}

export default Page;
