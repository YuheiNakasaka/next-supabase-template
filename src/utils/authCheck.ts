import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "./supabaseClient";

export const authGuard = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    return res.status(401).send({ result: "Unauthorized" });
  }
  return user;
};
