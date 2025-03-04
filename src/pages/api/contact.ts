import { clientSchema } from "@/schemas/client";
import type { APIRoute } from "astro";
import { db, Clients} from "astro:db";
import { getSession } from "auth-astro/server";;

export const POST: APIRoute = async ({ request }) => {
  const session = await getSession(request);

  if (!session) return new Response("Unauthorized", { status: 401 });

  try {
    const formdata = await request.formData();
    const data = clientSchema.safeParse(Object.fromEntries(formdata));

    if (!data.success) {
      return new Response("Invalid data", { status: 400 });
    }

    await db.insert(Clients).values(data.data).run();
  } catch (error) {
    return new Response("Upps, i have a problem :(", { status: 500 });
  }
  return new Response("Hello, world!");
};
