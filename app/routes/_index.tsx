import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

interface Env {
  DB: D1Database;
}

type User = {
  id: number;
  username: string;
};

export async function loader({ context }: LoaderFunctionArgs) {
  const env = context.cloudflare.env as Env;
  console.log(context.cloudflare.env.DB)
  const { results } = await env.DB.prepare("SELECT * FROM users").all<User>();

  return json({
    users: results ?? [],
  });
}

export default function Index() {
  const { users } = useLoaderData<typeof loader>()

  return (
    <>
      {users.map((user) => (
        <li key={user.id}>{user.username}</li>
      ))}
    </>
  );
}
