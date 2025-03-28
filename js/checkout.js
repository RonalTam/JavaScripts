document.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderTableBody = document.querySelector("tbody");
    const totalQuantityElement = document.querySelector(".d-flex p:nth-child(1)"); // Tổng sản phẩm
    const totalPriceElement = document.querySelector(".productPrice strong"); // Tổng tiền
    const checkoutPriceElement = document.getElementById("priceCheckout"); // Thành tiền
    const shippingFee = 30000; // Phí vận chuyển cố định

    function renderCheckout() {
        orderTableBody.innerHTML = ""; // Xóa nội dung cũ trước khi render
        let totalQuantity = 0;
        let totalPrice = 0;

        cart.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><img src="${item.image}" width="70" alt="${item.name}"></td>
                <td>${item.name}</td>
                <td>${item.size}</td>
                <td>${item.price.toLocaleString()} ₫</td>
                <td>${item.quantity}</td>
            `;
            orderTableBody.appendChild(row);
            totalQuantity += item.quantity;
            totalPrice += item.price * item.quantity;
        });

        totalQuantityElement.innerText = `Tổng sản phẩm: ${totalQuantity}`;
        totalPriceElement.innerHTML = `<strong>Tổng tiền:</strong> ${totalPrice.toLocaleString()} ₫`;
        checkoutPriceElement.innerText = `${(totalPrice + shippingFee).toLocaleString()} ₫`;
    }

    renderCheckout();
});

document.getElementById('btn-order').addEventListener('click', function () {
    localStorage.removeItem('cart');
    alert('Đặt hàng thành công. Đơn hàng của bạn đang được xử lý.');
    window.location.href = 'home.html';
});