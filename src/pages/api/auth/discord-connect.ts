import { NextApiRequest, NextApiResponse } from "next";
import { environment } from "../../../config"

const OAuthScope = ["identify", "guilds", "guilds.members.read"].join(" ");
const OAuthData = new URLSearchParams({
  response_type: "code",
  client_id: environment.CLIENT_ID,
  redirect_uri: `${environment.DOMAIN}/callback`,
  scope: OAuthScope,
});

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  res.redirect(`https://discordapp.com/oauth2/authorize?${OAuthData}`);
};

export default handler;
