import Auth from "@/components/auth";
import { createServerClient } from "@/lib/supabase";

async function Page() {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col items-center">
      <Auth userId={user?.id} />
      {/* <div className="flex w-full justify-center mt-4">
        <Chessboard userId={user?.id} />
      </div> */}
    </div>
  );
}

export default Page;
