import { httpService } from "./httpService";

export const itemService = {
    addItem,
    getItems,
    getItem,
    updateItem,
    removeItem,
    uploadImg,
    getCategories,
    reOrderItems
}

async function addItem(item) {
    try {
        const res = await httpService.post('item', item)
        return res
    } catch (err) {
        console.log(err)
    }
}

async function reOrderItems(fromIndex,futureIndex,categoryId) {
    try {
        const res = await httpService.put('item/reorder',{fromIndex,futureIndex,categoryId})
        return res
    } catch (err) {
        console.log(err)
    }
}

async function getItems() {
    try {
        const { items, categories } = await httpService.get('item')
        return {items, categories}
    } catch (err) {
        console.log(err)
    }
}

async function getItem(itemId) {
    try {
        const item = await httpService.get(`item/${itemId}`)
        console.log(item)
        return item[0]
    } catch (err) {
        console.log(err)
    }
}

async function updateItem(item) {
    try {
        const updatedItem = await httpService.put('item', item)
        console.log(updatedItem)
        return updatedItem
    } catch (err) {
        console.log(err)
    }
}

async function removeItem(itemId) {
    try {
        const res = await httpService.remove(`item/${itemId}`)
        return res
    } catch (err) {
        console.log(err)
    }
}

async function uploadImg(image) {
    console.log(image)
    try {
        const res = await httpService.postFormData('img', image)
        return res
    } catch (err) {
        console.log(err)
    }

}

async function getCategories() {
    try {
        const items = await httpService.get('category')
        return items
    } catch (err) {
        console.log(err)
    }
}