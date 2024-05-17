let cartItems = [];

document.getElementById("buy-btn").addEventListener("click", buyItems);

function addToCart(productName, price) {
    cartItems.push({ name: productName, price: price });
    updateCart();
}

function updateCart() {
    let cartList = document.getElementById('cart-items');
    cartList.innerHTML = '';
    let total = 0;
    cartItems.forEach((item, index) => {
        let li = document.createElement('li');
        li.className = 'cart-item';
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        let removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
        removeBtn.onclick = function() {
            cartItems.splice(index, 1);
            updateCart();
        };
        li.appendChild(removeBtn);
        cartList.appendChild(li);
        total += item.price;
    });
    let totalElement = document.getElementById('total');
    totalElement.textContent = total.toFixed(2);
}

function buyItems() {
    var receipt = generateReceipt();
    displayReceipt(receipt);
    cartItems = [];
    updateCart();
    alert('Thank you for your purchase!');
}

function generateReceipt() {
    var receipt = "<ul>";
    cartItems.forEach((item) => {
        receipt += `<li>${item.name} - $${item.price.toFixed(2)}</li>`;
    });
    receipt += `<li style="font-weight: bold;">Total: $${getTotal().toFixed(2)}</li></ul>`;
    return receipt;
}

function closeReceipt() {
    var receiptContainer = document.getElementById('receipt-container');
    receiptContainer.style.display = 'none';
}

function displayReceipt(receipt) {
    var receiptContainer = document.getElementById('receipt-container');
    var receiptItems = document.getElementById('receipt-items');
    receiptItems.innerHTML = '';
    receiptItems.innerHTML = receipt;
    receiptContainer.style.display = 'block';
}

function getTotal() {
    let total = 0;
    cartItems.forEach((item) => {
        total += item.price;
    });
    return total;
}
