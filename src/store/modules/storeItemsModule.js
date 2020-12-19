import { itemService } from "../../services/itemService"


export default {
    state: {
        storeItems: null,
        filterItems: ''
    },
    getters: {
        itemsToDisplay(state) {
            const items = state.storeItems
            // return items
            if (!items) return items
            return items.filter((item) => item.title.toLowerCase().includes(state.filterItems.toLowerCase()))
        }
    },
    mutations: {
        setItems(state, { items }) {
            state.storeItems = items
        },
        setFilter(state, { filterBy }) {
            state.filterItems = filterBy
        }
    },
    actions: {
        async addItem(context, action) {
            let items = []
            if (this.getters.itemsToDisplay) {
                items = this.getters.itemsToDisplay
            }
            items.push(action.item)
            await itemService.addItem(action.item)
            context.commit({ type: 'setItems', items })
        },
        async removeItem(context, action) {
            let items = this.getters.itemsToDisplay
            if (!this.getters.itemsToDisplay) items = await itemService.getItems()
            items = items.filter(item => item._id !== action.itemId)
            context.commit({ type: 'setItems', items })
            itemService.removeItem(action.itemId)
        },
        async updateItem(context, action) {
            let items = this.getters.itemsToDisplay
            if (!this.getters.itemsToDisplay) items = await itemService.getItems()
            
            items = items.map(currItem => {
                if (currItem._id === action.item._id) return action.item
                return currItem
            })
            context.commit({ type: 'setItems', items })
            itemService.updateItem(action.item)
        },
        async loadItems(context) {
            const items = await itemService.getItems()
            context.commit({ type: 'setItems', items })
        },
        filterItems(context, { filterBy }) {
            context.commit({ type: 'setFilter', filterBy })
        }
    }
}