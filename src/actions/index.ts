import { formSchema } from "@/components/form/schema";
import { defineAction } from "astro:actions";
import { Clients, db } from "astro:db";
import { z } from "astro:schema";

export const server = {
  contact: defineAction({
    input: formSchema.extend({
      id: z.string(),
    }),
    handler: async (input) => {
      try {
        await db.insert(Clients).values(input);
      } catch (error) {
        console.error(error);
        throw new Error("Upps un error");
      }
    },
  }),
};
