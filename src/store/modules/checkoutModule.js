import { checkoutService } from "../../services/checkoutService";

export default {
    state: {
        orderId: null,
        shippingDetails: null,
        contactDetails: null,
        paymentDetails: null
    },
    getters: {
        orderId(state) {
            return state.orderId
        },
        shippingDetails(state) {
            return state.shippingDetails
        },
        contactDetails(state) {
            return state.contactDetails
        },
        paymentDetails(state) {
            return state.paymentDetails
        }
    },
    mutations: {
        setOrderId(state, {orderId}) {
            state.orderId = orderId
        },
        setShippingDetails(state, {shippingDetails}) {
            state.shippingDetails = shippingDetails
        },
        setContactDetails(state, {contactDetails}) {
            state.contactDetails = contactDetails
        },
        setPaymentDetails(state, {paymentDetails}) {
            state.paymentDetails = paymentDetails
        }
    },
    actions: {
        async sendOrder(context,{order}) {
            const orderId = await checkoutService.sendOrder(order)
            context.commit({type: 'setOrderId', orderId})
        },
        setShippingDetails(context,{shippingDetails}) {
            console.log('ggg')
            context.commit({type: 'setShippingDetails', shippingDetails})
        },
        setContactDetails(context,{contactDetails}) {
            context.commit({type:'setContactDetails', contactDetails})
        },
        setPaymentDetails(context, {paymentDetails}) {
            context.commit({type:'setPaymentDetails', paymentDetails})
        }
    }
}