document.addEventListener("DOMContentLoaded", function () {
  let product = JSON.parse(localStorage.getItem("selectedProduct"));
  if (!product || !product.image) {
      console.error("Sản phẩm không tồn tại hoặc dữ liệu không hợp lệ!");
      return;
  }

  document.querySelector(".mainImg").src = product.image;
  document.querySelector(".mainImg-1").src = product.image;
  document.querySelector(".productName").textContent = product.name;
  document.querySelector(".productCode").textContent = `Mã: ${product.id || "N/A"}`;
  document.getElementById("productPrice").innerHTML = `<strong>Giá tiền: ${product.price} VND</strong>`;

  document.querySelectorAll(".productName strong").forEach(p => {
      p.textContent = "Sản phẩm: " + product.name;
  });
});

function changeMainImage(thumbnail) {
  document.querySelector(".mainImg").src = thumbnail.src;
}

function getSizeAddToCart() {
  let selectedSize = document.querySelector('input[name="size"]:checked');
  if (!selectedSize) {
      alert("Vui lòng chọn kích cỡ!");
      return;
  }

  let product = JSON.parse(localStorage.getItem("selectedProduct"));  
  if (!product) {
      alert("Không tìm thấy sản phẩm! Vui lòng thử lại.");
      return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || []; // Nếu null, gán []

  const existingProduct = cart.find(item => item.id === product.id && item.size === selectedSize.value);

  if (existingProduct) {
      existingProduct.quantity += 1;
  } else {
      cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1, size: selectedSize.value, image: product.image });
  }

  localStorage.setItem("cart", JSON.stringify(cart)); // Lưu lại giỏ hàng
  alert(`${product.name} (Size: ${selectedSize.value}) đã được thêm vào giỏ hàng!`);
}
