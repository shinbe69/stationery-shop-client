function Cart() {
    let cartItems = []
    let isLocal = true
    return {
        getItems() {
            return cartItems
        },
        addToCart(item) {
            cartItems = cartItems.concat(item).reduce(mergeCart, [])
        },
        getTotalQuantity() {
            let totalQuantity = 0
            cartItems.forEach(item => {
                totalQuantity += item.quantity
            })
            return totalQuantity
        },
        removeItems(idArr) {
            
        }
    }
    //Side function
    function mergeCart(accumulator, currentValue) {
        let isMerge = false
        accumulator.forEach((cartItem) => {
          if (currentValue.id === cartItem.id) {
                cartItem.quantity += currentValue.quantity
                isMerge = true
                return
          }
        })
        if (!isMerge)
          accumulator.push(currentValue)
        return accumulator
      }
}

let cart = Cart()
console.log(cart.getItems())
cart.addToCart({id: 1, quantity: 1})
cart.addToCart({id: 1, quantity: 1})
console.log(cart.getItems())