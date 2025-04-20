import { z } from "zod";

export const InscriptionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  lastname: z.string().min(1, "Lastname is required"),
  email: z.string().email("Invalid email format"),
});
