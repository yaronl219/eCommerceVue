import { httpService } from "./httpService"

export const orderService = {
    getOrders
}

async function getOrders(page,query,itemsPerPage =10) {
    
    const searchParam = new URLSearchParams()
    searchParam.append('page',page)
    searchParam.append('limit',itemsPerPage)
    query.forEach(param => {
        if (Object.values(param)[0]) {
            const key = Object.keys(param)[0]
            const value = Object.values(param)[0]
            searchParam.append(key,value)
        }
    });
    try {
        const orders = await httpService.get(`order?${searchParam.toString()}`)
        return orders
    } catch (err) {
        console.log(err)
    }

}

