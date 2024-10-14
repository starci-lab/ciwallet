import { envConfig } from "@/config"
import { baseAxios } from "../axios.periphery"

export class AuthenticatorApiService {
    private readonly url: string
    constructor() 
    {
        this.url = `${envConfig().externals.cifarm.periphery.api}/authenticator`
    }

    public async registerTelegram({ initDataRaw, botType }: RegisterTelegramParams) {
        const url = `${this.url}/register-telegram`
        const { data } = await baseAxios.post(url, undefined, {
            headers: {
                "Authorization": `tma ${initDataRaw}`,
                "Bot-Type": botType
            }
        }) 
        return data
    }
}

export interface RegisterTelegramParams {
    initDataRaw: string,
    botType: BotType
}

export enum BotType {
    Ciwallet = "ciwallet",
    Cifarm = "cifarm"
}
