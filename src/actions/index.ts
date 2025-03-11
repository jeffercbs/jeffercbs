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
      await db
        .insert(Clients)
        .values(input)
        .run()
        .catch((err) => {
          console.log(err);
        });
      console.log(input);
    },
  }),
};
