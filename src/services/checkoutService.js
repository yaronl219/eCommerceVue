import { httpService } from "./httpService"

export const checkoutService = {
    sendOrder
}

async function sendOrder(order) {
    if (order.paymentDetails.type === 'CC') {
        order.paymentDetails = _hideCCDetails(order.paymentDetails)
    }
    const res = await httpService.post('order',order)
    const {orderId} = JSON.parse(res)
    return orderId
}

function _hideCCDetails(ccDetails) {
    const ccLength = ccDetails.ccNumber.length
    const ccNumArr = ccDetails.ccNumber.split('')
    const last4Digits = ccNumArr.map((num, idx) => {
        if (idx < ccLength-4) return '*'
        return num
    })
    
    return {
        last4Digits: last4Digits.join(''),
        expDate: `${ccDetails.expMonth}/${ccDetails.expYear}`,
        type: 'CC'
    }
}