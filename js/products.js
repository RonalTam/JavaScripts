function changeMainImage(thumbnail) {
    // Lấy phần tử ảnh chính
    const mainImg = document.getElementById('mainImg');
    
    // Đặt thuộc tính src của ảnh chính bằng src của ảnh nhỏ được nhấp
    mainImg.src = thumbnail.src;
}

function getSizeAddToCart() {
  // Lấy size người dùng chọn
  const selectedSize = document.querySelector('input[name="size"]:checked');
  if (!selectedSize) {
    alert('Vui lòng chọn size trước khi thêm vào giỏ hàng.');
    return;
  }
  const size = selectedSize.value;

  addToCart(1, 'Áo khoác - 1JK241493', 690000, 'assets/images/2_133.webp', size);
}

function addToCart(id, name, price, image, size) {
    console.log(image);
    const product = { id, name, price, quantity: 1, image , size};
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProductIndex = cart.findIndex(item => item.id === id && item.size === size);

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(name + " Size " + (size) + ' đã được thêm vào giỏ hàng!');
}
