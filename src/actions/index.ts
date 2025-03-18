import { formSchema } from "@/components/form/schema";
import { defineAction } from "astro:actions";
import { Clients, Newsletters, db, eq } from "astro:db";
import { z } from "astro:schema";
import { createHash } from "node:crypto";
import { Resend } from "resend";
import { RESEND_API_KEY } from "astro:env/server";
import { NewsletterTemplate } from "@/templates/newsletter";

const resend = new Resend(RESEND_API_KEY);

const enum Status {
  pending = "pending",
  subscribed = "subscribed",
  unsubscribed = "unsubscribed",
}

export const server = {
  newsletter: defineAction({
    input: z.object({
      sid: z.string(),
    }),
    handler: async ({ sid }) => {
      try {
        const foundEmail = (
          await db.select().from(Newsletters).where(eq(Newsletters.id, sid))
        )[0];

        if (foundEmail.status === Status.pending) {
          const updateStatusNewsletter = await db
            .update(Newsletters)
            .set({ status: Status.subscribed })
            .where(eq(Newsletters.id, sid))
            .returning();

          return updateStatusNewsletter[0];
        }

        return foundEmail;
      } catch (error) {
        console.error(error);
        throw new Error("Upps un error");
      }
    },
  }),
  subscribeNewsletter: defineAction({
    input: z.object({
      email: z.string().email(),
    }),
    handler: async ({ email }) => {
      try {
        const foundEmail = await db
          .select()
          .from(Newsletters)
          .where(eq(Newsletters.email, email));

        console.log(!foundEmail, !!formSchema, foundEmail, email);

        if (!foundEmail.length) {
          const idHash = createHash("sha256").update(email).digest("hex");
          await db.insert(Newsletters).values({ id: idHash, email });

          await resend.emails.send({
            from: "jeffercbs <newsletter@jeffercbs.tech>",
            to: [email],
            subject: "Bienvenido a la newsletter jeffercbs, valida tu correo",
            html: NewsletterTemplate({ idHash }),
          });

          return idHash;
        }

        return foundEmail[0].id;
      } catch (error) {
        console.error(error);
        throw new Error("Upps un error");
      }
    },
  }),
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
