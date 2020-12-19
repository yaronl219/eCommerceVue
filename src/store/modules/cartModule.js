import { checkoutService } from "../../services/checkoutService";

export default {
    state: {
        itemsInCart: [],
        isCartOpen: false,
        orderId: null
    },
    getters: {
        itemsInCart(state) {
            return state.itemsInCart
        },
        isCartOpen(state) {
            return state.isCartOpen
        },
        cartItem: (state) => (cartId) => {
            return state.itemsInCart.find(item => item.cartId === cartId)
        },
        totalSum(state) {
            let totalSum = 0;
            state.itemsInCart.forEach((item) => {
              let sum = item.price * item.amount;
              totalSum += sum;
            });
            return totalSum;
          },
    },
    mutations: {
        addItemToCart(state, action) {
            let items = [...state.itemsInCart]
            let item = items.find(item => item.cartId === action.item.cartId)
            if (!item) {
                items.push(action.item)
            } else {
                item = action.item
            }
            state.itemsInCart = items
            state.isCartOpen = true
        },
        removeItemFromCart(state, { itemId }) {
            let items = [...state.itemsInCart]
            items = items.filter(item => item.cartId !== itemId)
            state.itemsInCart = items
        },
        toggleCartOpen(state) {
            state.isCartOpen = !state.isCartOpen
        },
        openCart(state) {
            state.isCartOpen = true
        },
        changeItemAmount(state, { itemId, amount }) {
            // const { itemId, amount } = action.action
            let items = [...state.itemsInCart]
            const item = items.find(currItem => currItem.cartId === itemId)
            item.amount = amount
            state.itemsInCart = items
        },
        setOrderId(state, {orderId}) {
            state.orderId = orderId
        }

    },
    actions: {
        addItemToCart(context, { item }) {
            context.commit({ type: 'addItemToCart', item })
        },
        removeItemFromCart(context, { itemId }) {
            console.log(itemId)
            context.commit({ type: 'removeItemFromCart', itemId })
        },
        toggleCartOpen(context) {
            context.commit({ type: 'toggleCartOpen' })
        },
        changeItemAmount(context, action) {
            const { amount, itemId } = action
            if (amount > 0) {
                context.commit({ type: 'changeItemAmount', amount, itemId })
            } else {
                context.commit({ type: 'removeItemFromCart', itemId })
            }
        },
        async sendOrder(context,{order}) {
            const orderId = await checkoutService.sendOrder(order)
            context.commit({type: 'setOrderId', orderId})
        }

    }
}