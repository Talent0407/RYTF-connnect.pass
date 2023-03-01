import { useAccount, useDisconnect } from "@web3modal/react";
import { environment } from "../config";
import { useUser } from "../context/user.context";

export default function UseAccount() {
  const { setUser } = useUser();
  const { account } = useAccount();
  const disconnect = useDisconnect();

  const handleDisconnect = async () => {
    console.log('here');
    disconnect();
    await fetch(`${environment.BACKEND_DOMAIN}/api/auth/logout/`, {
      method: "POST",
      credentials: "include",
    });
    setUser(undefined);
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 5)}...${address.slice(
      address.length - 4,
      address.length
    )}`;
  }

  return (
    <div className="mt-2 flex items-center justify-between border-2 border-white rounded-lg text-white">
      <div className="truncate">
        <p className="px-3 ml-3">{formatAddress(account.address)}</p>
      </div>
      <div className="mt-5 sm:mt-0 sm:ml-6 flex flex-shrink-0 items-center">
        <button
          type="button"
          onClick={handleDisconnect}
          className="inline-flex uppercase items-center rounded-l-sm px-4 py-2 font-bold font-mont hover:bg-white hover:text-black transition duration-200 ease-in-out"
        >
          Disconnect Wallet
        </button>
      </div>
    </div>
  );
}
