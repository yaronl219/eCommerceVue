import { httpService } from "./httpService"

export const categoryService = {
    addCategory,
    reOrderCategories,
    removeCategory,
    updateCategory,
    getCategories
}


async function addCategory(category) {
    try {
        const res = await httpService.post('category', category)
        return JSON.parse(res)[0]
    } catch (err) {
        console.log(err)
    }
}

async function removeCategory(categoryId) {
    try {
        const res = await httpService.remove(`category/${categoryId}`)
        return res
    } catch (err) {
        console.log(err)
    }
}

async function updateCategory(categoryId,categoryName,isVisible) {
    try {
        const res = await httpService.put('category', {categoryId,categoryName, isVisible})
        return res
    } catch (err) {
        console.log(err)
    }
}

async function getCategories() {
    try {
        const categories = await httpService.get('category')
        return categories
    } catch (err) {
        console.log(err)
    }
}

async function reOrderCategories(fromIndex, futureIndex) {
    try {
        const res = await httpService.put('category/reorder', { fromIndex, futureIndex })
        return res
    } catch (err) {
        console.log(err)
    }
}
