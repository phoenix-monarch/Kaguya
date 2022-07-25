import { Notification } from "@/types";
import { useSupabaseQuery } from "@/utils/supabase";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";

const useNotifications = () => {
  const { user } = useUser();

  return useSupabaseQuery(
    ["notifications"],
    () => {
      return supabaseClient
        .from<Notification>("kaguya_notifications")
        .select("*, sender:senderId(user_metadata)")
        .eq("senderId", user.id)
        .order("created_at", { ascending: false });
    },
    {
      enabled: !!user,
      refetchOnWindowFocus: true,
    }
  );
};

export default useNotifications;