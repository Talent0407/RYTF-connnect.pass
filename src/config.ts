const CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_APP_CLIENT_ID as string
const DOMAIN =  process.env.NEXT_PUBLIC_DOMAIN as string;

const livehost = "https://api.ryftpass.io"

export const environment = {
  BACKEND_DOMAIN: livehost,
  DOMAIN,
  CLIENT_ID
}