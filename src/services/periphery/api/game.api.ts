import { envConfig } from "@/config"
import { GameVersionEntity } from "../types"
import { baseAxios } from "../axios.periphery"

export class GamePeripheryApiService {
    private readonly url: string
    constructor() {
        this.url = `${envConfig().externals.cifarm.periphery.api}/game`
    }

    public async getGameVersion(): Promise<GameVersionEntity> {
        const { data } = await baseAxios.get(`${this.url}/version`)
        return data
    }
}
