// import { useSignMessage } from "@web3modal/react";
import { Loader } from "../components/Loader";
import { useUser } from "../context/user.context";
import { useSignMessage } from 'wagmi'

export default function UseSignMessage({
  message,
  onSign,
  loading,
}: {
  message: string;
  onSign: any;
  loading: boolean;
}) {
  const { signMessageAsync } = useSignMessage()
  const { user } = useUser();

  async function handleSignMessage() {
    const signature = await signMessageAsync({
      message: message,
    })
    console.log(signature, "Justin signature")
    if (signature) onSign(signature);
  }

  return (
    <div className="mt-3">
      {user ? (
        <div className="w-full text-center bg-[#897E54] uppercase text-black  font-bold font-mont rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200 ease-in-out">
          Signed in to Ryft
        </div>
      ) : (
        <>
          {/* {error && <div className="py-3">{error.message}</div>} */}
          <button
            type="button"
            onClick={handleSignMessage}
            className="w-full items-center bg-[#DAC470] hover:bg-[#897E54] uppercase text-black font-bold font-mont rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200 ease-in-out"
          >
            {loading && <Loader light={false} />}
            Sign in to Ryft
          </button>
        </>
      )}
    </div>
  );
}
