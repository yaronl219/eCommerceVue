import { httpService } from "./httpService"
import { utilService } from "./utilService"

export const chartService = {
    getChartData
}   

async function getChartData(baseQuery,query = []) {
    try {  
        const searchParam = utilService.buildSearchParam(baseQuery,query)
        const data = await httpService.get(`order/query?${searchParam.toString()}`)
        return data
    } catch (err) {
        console.log(err)
        return []
    }
}


