import { httpService } from "./httpService"

export const orderService = {
    getOrders
}

async function getOrders(page) {
    const itemsPerPage = 10
    try {
        const orders = await httpService.get(`order?page=${page}&limit=${itemsPerPage}`)
        return orders
    } catch (err) {
        console.log(err)
    }

}