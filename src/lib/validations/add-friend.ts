import { z } from "zod";

export const addFriendValidatior = z.object({
  email: z.string().email(),
});
