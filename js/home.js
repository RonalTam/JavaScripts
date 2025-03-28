document.addEventListener('DOMContentLoaded', function () {
  let products = JSON.parse(localStorage.getItem('products')) || [];

  function renderProducts() {
    let productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';

    products.forEach((product, index) => {
      let productHTML = `
              <div class="col-lg-3 col-6 mb-4">
                  <div class="card" style="width: 100%">
                      <a href="chi_tiet_san_pham.html" class="product-link" data-index="${index}">
                          <img src="${product.image}" class="card-img-top" style="border-radius: 5%" alt="${product.name}" />
                      </a>
                      <div class="card-body">
                          <a href="chi_tiet_san_pham.html" class="btn btn-secondary mb-2 product-link" data-index="${index}">MUA NGAY</a>
                          <p class="card-text text-secondary" style="white-space: nowrap">${product.name}</p>
                          <span>${product.price} ₫</span>
                      </div>
                  </div>
              </div>
          `;
      productsContainer.innerHTML += productHTML;
    });

    // Thêm sự kiện click để lưu sản phẩm vào localStorage trước khi chuyển trang
    document.querySelectorAll(".product-link").forEach(item => {
      item.addEventListener("click", function (e) {
        e.preventDefault(); // Chặn mặc định
        const productIndex = this.getAttribute("data-index");
        localStorage.setItem("selectedProduct", JSON.stringify(products[productIndex]));
        window.location.href = "chi_tiet_san_pham.html";
      });
    });
  }

  renderProducts();
  $(document).ready(function () {
    $('.products-slider').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          }
        }
      ]
    });
  });
});



