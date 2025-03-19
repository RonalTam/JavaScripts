let products = JSON.parse(localStorage.getItem('productsAo')) || [];
function renderProducts() {
    let productsContainer = document.getElementById('product-list');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        let productHTML = `
                <div class="col-6 col-sm-6 col-md-4 mb-4">
                    <div class="card" style="width: 100%">
                        <a href="ao_so_mi.html">
                        <img src="${product.image}" class="card-img-top" style="border-radius: 3%" alt="${product.name}" />
                        </a>
                        <div class="card-body">
                            <a href="ao_so_mi.html" class="btn btn-secondary">MUA NGAY</a>
                            <p class="card-text text-secondary">${product.name}</p>
                            <span>${product.price} ₫</span>
                        </div>
                    </div>
                </div>
            `;
        productsContainer.innerHTML += productHTML;
    });
}


let currentPage = 1;
const productsPerPage = 12;
const totalProducts = 24; // Tổng số sản phẩm

function displayProducts(page) {
    const productList = document.getElementById('product-list');
    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;
    const allProducts = Array.from(productList.children);

    allProducts.forEach((product, index) => {
        if (index >= start && index < end) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

function changePage(page) {
    currentPage = page;
    displayProducts(currentPage);
}

function nextPage() {
    if (currentPage < totalProducts / productsPerPage) {
        currentPage++;
        displayProducts(currentPage);
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayProducts(currentPage);
    }
}

// Khởi tạo lần đầu
renderProducts();
displayProducts(currentPage);




