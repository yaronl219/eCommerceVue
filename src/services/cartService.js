import { storageService } from "./storageService"

export const cartService = {
    saveCart,
    getSavedCart,
    forgetSavedCart
}

function saveCart(cartItems) {
    const cart = {
        cartItems,
        createdAt: Date.now()
    }
    storageService.saveToStorage('savedCart',cart)
}

function forgetSavedCart() {
    storageService.saveToStorage('savedCart',null)
}

function getSavedCart() {
    const cart = storageService.loadFromStorage('savedCart')
    return cart
}
