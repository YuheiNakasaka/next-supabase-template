import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(404).json({ result: "" });
  }
  return supabase.auth.api.setAuthCookie(req, res);
}
