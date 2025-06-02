import { OAuthConfig } from "next-auth/providers"

export const ZaloAuthProvider = (): OAuthConfig<any> => ({
    id: "zalo",
    name: "Zalo",
    type: "oauth",
    clientId: process.env.ZALO_CLIENT_ID!,
    clientSecret: process.env.ZALO_CLIENT_SECRET!,
    authorization: {
        url: "https://oauth.zaloapp.com/v4/permission",
        params: {
            app_id: process.env.ZALO_CLIENT_ID!,
            redirect_uri: process.env.ZALO_REDIRECT_URI!,
            response_type: "code",
            code_challenge_method: "S256",
        },
    },
    token: {
        url: "https://oauth.zaloapp.com/v4/access_token",
        async request(context) {
            const params = context.params as {
                code: string
                code_verifier: string
            }
            const form = new URLSearchParams()
            form.append("app_id", process.env.ZALO_CLIENT_ID ?? "")
            form.append("code", params.code ?? "")
            form.append("grant_type", "authorization_code")
            form.append("code_verifier", params.code_verifier)

            const res = await fetch("https://oauth.zaloapp.com/v4/access_token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "secret_key": process.env.ZALO_CLIENT_SECRET ?? "",
                },
                body: form.toString(),
            })

            const data = await res.json()
            if (!data.access_token) {
                throw new Error(
                    `Failed to obtain Zalo access token: ${JSON.stringify(data)}`
                )
            }

            return { tokens: data }
        },
    },
    userinfo: {
        async request(context) {
            const { access_token } = context.tokens

            const res = await fetch(
                `https://graph.zalo.me/v2.0/me?fields=id,name,picture`,
                {
                    method: 'GET',
                    headers: {
                        'access_token': access_token ?? '',
                    },
                }
            )

            const profile = await res.json()

            if (!profile.id) {
                throw new Error(`Profile id is missing in Zalo OAuth profile response: ${JSON.stringify(profile)}`)
            }

            return {
                id: profile.id,
                name: profile.name,
                email: `${profile.id}@zalo.com`,
                image: profile.picture?.data?.url || "",
            }
        }
    },

    profile(profile) {
        return {
            id: profile.id,
            name: profile.name,
            email: profile.email,
            image: profile.image,
        }
    },
})
