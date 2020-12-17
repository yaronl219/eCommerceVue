export default {
    state: {
        itemsInCart: null
    },
    getters: {

    },
    mutations: {
        setItems(state,{items}) {
            state.items = items
        },
    },
    actions: {
        addItemToCart(context,item) {
            // TODO - add check if there the item already exists add 2 of item
            const items = [...this.itemsInCart]
            items.push(item)
            context.commit({ type: 'setItems', items })
        },
        removeItemFromCart(context,itemId) {
            // TODO - add check if there the item already exists add 2 of item
            let items = [...this.itemsInCart]
            items = items.filter(item => item.id === itemId)
            context.commit({ type: 'setItems', items })
        }
    }
}