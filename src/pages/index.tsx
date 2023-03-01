import { useEffect, useState } from "react";
import { SiweMessage } from "siwe";
import { DiscordButton } from "../components/DiscordButton";
import { environment } from "../config";
import { useUser } from "../context/user.context";
import UseSignMessage from "../sections/UseSignMessage";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useNetwork } from "wagmi";

export default function HomePage() {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [isLogout, setLogoutStatus] = useState(false);
  const [siweMessage, setSiweMessage] = useState<SiweMessage | null>(null);
  const { address, isDisconnected } = useAccount();
  const { chain } = useNetwork();

  async function fetchNonce() {
    const res = await fetch(`${environment.BACKEND_DOMAIN}/api/auth/nonce/`);
    const data: { nonce: string } = await res.json();
    return data.nonce;
  }

  async function createMessage() {
    const nonce = await fetchNonce();
    const chainId = chain?.id;
    const message = new SiweMessage({
      domain: document.location.host,
      address: address,
      chainId: chainId,
      uri: document.location.origin,
      version: "1",
      statement: "Ryft Pass",
      nonce,
    });
    setSiweMessage(message);
  }

  async function getMe() {
    let result = null;
    let data;
    console.log("---------Get Me Justin-----------");
    await fetch(`${environment.BACKEND_DOMAIN}/api/me/`, {
      credentials: "include",
    })
      .then(async (res) => {
        console.log("---------succeeded to get me Justin-----------");
        result = res;
        data = await result.json();
      })
      .catch((error) => {
        console.log("---------failed to get me Justin-----------");
        console.log(error);
        setLogoutStatus(false);
      });
    if (data) setUser(data);
  }

  async function login(signature: string) {
    setLoading(true);
    const res = await fetch(`${environment.BACKEND_DOMAIN}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        signature,
        message: siweMessage,
      }),
    });
    setLoading(false);
    if (res.status === 200) {
      getMe();
    }
  }

  async function logout() {
    const res = await fetch(
      `${environment.BACKEND_DOMAIN}/api/oauth2/app/discord/unlink/`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    setLoading(false);
    console.log(res, "Justin logout result");
    if (res.status === 200) {
      getMe();
    }
  }

  useEffect(() => {
    if (chain && address) {
      createMessage();
    }
  }, [chain, address]);

  return (
    <>
      {!isDisconnected ? (
        <>
          <div className="flex items-center justify-center w-full">
            <ConnectButton />
          </div>
          {siweMessage && (
            <>
              <UseSignMessage
                message={siweMessage.toMessage()}
                onSign={login}
                loading={loading}
              />
              <div className="mt-3 flex items-center justify-center">
                {user && (
                  <>
                    {user.discord_user ? (
                      <div className="flex flex-row items-center justify-between h-full space-x-2 w-full">
                        <div className="bg-indigo-500 rounded-lg flex items-center space-x-2 text-white px-4 py-2 font-mont font-bold text-center">
                          {user.discord_user.avatar && (<img
                              src={`https://cdn.discordapp.com/avatars/${user.discord_user.id}/${user.discord_user.avatar}.png?size=128`}
                              className="h-6 w-6 rounded-full"
                          />)}
                          <span className="ml-3">
                            {user.discord_user?.username}
                          </span>
                        </div>
                        {!isLogout && (
                          <div className="bg-indigo-500  cursor-pointer rounded-lg flex flex-row  items-center space-x-2 h-10 text-white px-4 py-2 font-mont">
                            <img
                              src="https://cdn.icon-icons.com/icons2/2518/PNG/512/logout_icon_151219.png"
                              alt="logout"
                              className="h-6"
                            />
                            <span onClick={logout}>Log Out</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <DiscordButton />
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center w-full">
          <ConnectButton />
        </div>
      )}
    </>
  );
}
