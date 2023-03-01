export interface User {
    wallet_address: string
    display_name?: string
    custom_thumbnail?: string
    thumbnail?: string
    ens_domain?: string
    discord_user?: {
        id: string
        username: string
        avatar: string
    }
}