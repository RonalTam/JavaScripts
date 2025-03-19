function changeMainImage(thumbnail) {
    // Lấy phần tử ảnh chính
    const mainImg = document.getElementById('mainImg');
    
    // Đặt thuộc tính src của ảnh chính bằng src của ảnh nhỏ được nhấp
    mainImg.src = thumbnail.src;
}

function addToCart(id, name, price, image) {
    console.log(image);
    const product = { id, name, price, quantity: 1, image };
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProductIndex = cart.findIndex(item => item.id === id);

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(name + ' đã được thêm vào giỏ hàng!');
}
