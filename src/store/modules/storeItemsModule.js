import { itemService } from "../../services/itemService"


export default {
    state: {
        storeItems: null,
        filterItems: ''
    },
    getters: {
        itemsToDisplay(state) {
            const items = state.storeItems
            return items
            // if (!items) return items
            // return items?.filter((item) => item.title.toLowerCase().includes(state.filterItems.toLowerCase()))
        }
    },
    mutations: {
        setItems(state,{items}) {
            state.storeItems = items
        },
    },
    actions: {
        async addItem(context,item) {
            let items = []
            if (this.state.storeItems) {
                items = [...this.state.storeItems]
            }
            items.push(item.item)
            await itemService.addItem(item.item)
            context.commit({ type: 'setItems', items })
        },
        removeItem(context,itemId) {
            let items = [...this.state.storeItems]
            items = items.filter(item => item._id !== itemId)
            context.commit({ type: 'setItems', items })
        },
        updateItem(context,item) {
            let items = [...this.state.storeItems]
            items = items.map(currItem => {
                if (currItem._id === item._id) return item
                return currItem
            })
            context.commit({ type: 'setItems', items })
        },
        async loadItems(context) {
            const items = await itemService.getItems()
            context.commit({ type: 'setItems', items })
        }
    }
}