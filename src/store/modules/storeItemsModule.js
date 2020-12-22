
import { categoryService } from "../../services/categoryService"
import { itemService } from "../../services/itemService"


export default {
    state: {
        storeItems: null,
        storeCategories: null,
        filterItems: '',
        
    },
    getters: {
        itemsToDisplay(state) {
            const items = state.storeItems
            // return items
            if (!items) return items
            return items.filter((item) => item.title.toLowerCase().includes(state.filterItems.toLowerCase()))
        },
        storeCategories(state) {
            const categories = state.storeCategories
            if (!categories) return categories
            return categories.sort((a,b) => a.index-b.index)
        },
        itemsByCategory: (state) => (categoryId) => {
            return state.storeItems.filter(item => item.parentCategory === categoryId).sort((a,b) => a.index-b.index)
        },
    },
    mutations: {
        setItems(state, { items, categories }) {
            state.storeItems = items
            state.storeCategories = categories
        },
        setFilter(state, { filterBy }) {
            state.filterItems = filterBy
        },
        changeItemOrder(state, { fromIndex, futureIndex, categoryId }) {
            const items = [...state.storeItems].filter(item => item.parentCategory === categoryId)
            if (fromIndex < futureIndex) {
                for (let i = fromIndex; i <= futureIndex; i++) {
                    items[i].index = items[i].index - 1
                }
            } else {
                for (let i = futureIndex; i <= fromIndex; i++) {
                    items[i].index = items[i].index + 1
                }
            }
            items[fromIndex].index = futureIndex
            state.storeItems = items.sort((a, b) => a.index - b.index)

        },
        changeCategoryOrder(state, { fromIndex, futureIndex }) {
            const categories = [...state.storeCategories]
            if (fromIndex < futureIndex) {
                for (let i = fromIndex; i <= futureIndex; i++) {
                    categories[i].index = categories[i].index - 1
                }
            } else {
                for (let i = futureIndex; i <= fromIndex; i++) {
                    categories[i].index = categories[i].index + 1
                }
            }
            categories[fromIndex].index = futureIndex
            state.storeCategories = categories.sort((a, b) => a.index - b.index)

        },
        addCategory(state, { category }) {
            const categories = state.storeCategories
            categories.push(category)
            state.storeCategories = categories
        },
        renameCategory(state, {categoryId,categoryName}) {
            const categories = [...state.storeCategories]
            const category = categories.find(category => category._id === categoryId)
            category.title = categoryName
            state.storeCategories = categories
        },
        removeCategory(state,{categoryId}) {
            const categories = [...state.storeCategories]
            state.storeCategories = categories.filter(category => category._id !== categoryId)
        },
        async updateItem(state,{item}) {
            let items = state.storeItems
            if (!items) items = await itemService.getItems()

            items = items.map(currItem => {
                if (currItem._id === item._id) return item
                return currItem
            })
        },
        async toggleVisibilty(state,{categoryId}) {
            const categories = [...state.storeCategories]
            const category = categories.find(category => category._id === categoryId)
            category.isVisible = !category.isVisible
            state.storeCategories = categories
            categoryService.updateCategory(category._id,category.title,category.isVisible)
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

            context.commit({ type: 'updateItem', item:action.item })
            itemService.updateItem(action.item)
        },
        async loadItems(context) {
            const { items, categories } = await itemService.getItems()
            context.commit({ type: 'setItems', items, categories })
        },
        filterItems(context, { filterBy }) {
            context.commit({ type: 'setFilter', filterBy })
        },
        async changeItemOrder(context, { fromIndex, futureIndex, categoryId }) {
            context.commit({ type: 'changeItemOrder', fromIndex, futureIndex, categoryId })
            itemService.reOrderItems(fromIndex, futureIndex, categoryId)
        },
        async changeCategoryOrder(context, { fromIndex, futureIndex }) {
            context.commit({ type: 'changeCategoryOrder', fromIndex, futureIndex })
            await categoryService.reOrderCategories(fromIndex,futureIndex)
        },
        async addCategory(context, { categoryTitle }) {
            const categoryObj = { title: categoryTitle, isVisible: true }
            const category  = await categoryService.addCategory(categoryObj)
            console.log(category)
            context.commit({ type: 'addCategory', category })
        },
        async renameCategory(context, {categoryId,categoryName}) {
            context.commit({type: 'renameCategory',categoryId,categoryName})
            await categoryService.updateCategory(categoryId,categoryName)
        },
        async removeCategory(context, {categoryId}) {
            context.commit({type: 'removeCategory', categoryId})
            await categoryService.removeCategory(categoryId)
        },
        async toggleVisibilty(context, {categoryId}) {
            context.commit({type: 'toggleVisibilty', categoryId})
        }


    }
}