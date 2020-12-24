
import { httpService } from "./httpService"
import { utilService } from "./utilService"

export const userService = {
    getUsers,
    getUser
}

async function getUsers(page,query = []) {
    console.log(page)
    try {  
        const searchParam = utilService.buildSearchParam('users',query)
        const data = await httpService.get(`order/query?${searchParam.toString()}&page=${page}`)
        return data
    } catch (err) {
        console.log(err)
        return []
    }
}

async function getUser(phoneNumber,page=1,limit=50) {
    try {
        const orders = await httpService.get(`order?phone=${phoneNumber}&page=${page}&limit=${limit}`)
        return orders
    } catch (err) {
        console.log(err)
    }

}

