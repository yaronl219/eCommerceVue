export default {
    state: {
        storeCategoriesDomPos: []
    },
    getters: {
        categoryPosById: (state) => (categoryId) => {
            const category = state.storeCategoriesDomPos.find(category => category.categoryId === categoryId)
            return category.yPos
        },
        renderedCategoriesLength(state) {
            return state.storeCategoriesDomPos.length
        }
    },
    mutations: {
        setPosition(state,{categoryId,yPos}) {
            const categoriesPos = [...state.storeCategoriesDomPos]
            const category = categoriesPos.find(category => category.categoryId === categoryId)
            if (category) {
                category.yPos = yPos
            } else {
                categoriesPos.push({categoryId,yPos})
            }
            state.storeCategoriesDomPos = categoriesPos
        }
    },
    actions: {
        setPosition(context,{categoryId,yPos}) {
            context.commit({type:'setPosition',categoryId,yPos} )
        }
    }
}