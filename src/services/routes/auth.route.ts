import axios from "axios"

export const getMnemonic = async () : Promise<string> => {
    const url = "/api/auth"
    const { data } = await axios.post(url)
    console.log(data)
    return data.mnemonic
}