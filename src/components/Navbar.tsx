import { useEffect } from "react";
import { environment } from "../config";
import { useUser } from "../context/user.context";

export function Navbar() {
  const { user, setUser } = useUser();

  const getMe = async () => {
    console.log(`${environment.BACKEND_DOMAIN}/api/me/`, 'domain api')
    const result = await fetch(`${environment.BACKEND_DOMAIN}/api/me/`, {
      credentials: "include",
    });
    if (result.status === 200) {
      const data = await result.json();
      if (data) setUser(data);
    }
  };

  useEffect(() => {
    if (!user) getMe();
  });

  return (
    <div>
      <img
        className="mx-auto h-12 w-auto"
        src="/img/logo.png"
        alt="Your Company"
      />
      {/* {user ? user.wallet_address : "Login"} */}
    </div>
  );
}
