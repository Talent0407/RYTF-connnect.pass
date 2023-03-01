import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { environment } from "../config";
import { useUser } from "../context/user.context";

export default function CallbackPage() {
  const { setUser } = useUser();
  const router = useRouter();

  if (!router.isReady) {
    return "Loading...";
  }

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function getMe() {
    const result = await fetch(`${environment.BACKEND_DOMAIN}/api/me/`, {
      credentials: "include",
    });
    const data = await result.json();
    if (data) setUser(data);
  }

  async function connectDiscord() {
    setLoading(true);

    const { code } = router.query;

    const result = await fetch(
      `${environment.BACKEND_DOMAIN}/api/oauth2/callback/discord/connect/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          code,
        }),
      }
    );
    setSuccess(result.status === 200);
    setLoading(false);
    getMe();
    router.push("/");
  }

  useEffect(() => {
    connectDiscord();
  }, []);

  return (
    <>
      {loading && "Loading..."}
      {!loading && <>{success ? "Successfully connected" : "Failed"}</>}
    </>
  );
}
