let products = JSON.parse(localStorage.getItem('productsAo')) || [];
let currentPage = 1;
const productsPerPage = 12;

function renderProducts() {
    let productsContainer = document.getElementById('product-list');
    if (!productsContainer) return;

    productsContainer.innerHTML = products
        .map((product, index) => `
            <div class="col-6 col-sm-6 col-md-4 mb-4 product-item" data-index="${index}">
                <div class="card" style="width: 100%">
                    <a href="chi_tiet_san_pham.html" class="product-link" data-index="${index}">
                        <img src="${product.image}" class="card-img-top" style="border-radius: 3%" alt="${product.name}" />
                    </a>
                    <div class="card-body">
                        <a href="chi_tiet_san_pham.html" class="btn btn-secondary product-link" data-index="${index}">MUA NGAY</a>
                        <p class="card-text text-secondary">${product.name}</p>
                        <span>${product.price} ₫</span>
                    </div>
                </div>
            </div>
        `).join("");

    displayProducts(currentPage);
}

// Lắng nghe sự kiện click trên container (Event Delegation)
document.getElementById("product-list").addEventListener("click", function (e) {
    let link = e.target.closest(".product-link");
    if (!link) return;

    e.preventDefault();
    const productIndex = link.getAttribute("data-index");
    localStorage.setItem("selectedProduct", JSON.stringify(products[productIndex]));
    window.location.href = "chi_tiet_san_pham.html";
});

function displayProducts(page) {
    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;
    
    document.querySelectorAll(".product-item").forEach((product, index) => {
        product.style.display = (index >= start && index < end) ? "block" : "none";
    });
}

function changePage(page) {
    if (page < 1 || page > Math.ceil(products.length / productsPerPage)) return;
    currentPage = page;
    displayProducts(currentPage);
}

function nextPage() {
    changePage(currentPage + 1);
}

function prevPage() {
    changePage(currentPage - 1);
}

// Khởi tạo trang
renderProducts();
