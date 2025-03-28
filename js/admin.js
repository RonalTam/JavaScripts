document.addEventListener("DOMContentLoaded", function () {
    const productForm = document.getElementById("addProductForm");

    // 2 mảng sản phẩm cho 2 trang
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let productsAo = JSON.parse(localStorage.getItem("productsAo")) || [];

    let currentPage = ''; // xác định đang thêm ở trang nào
    let editIndex = -1;
    let editPage = ''; // để biết đang sửa ở trang nào (home hay ao)

    // Reset dữ liệu trong modal khi modal bị đóng
    const addProductModal = document.getElementById("addProductModal");
    addProductModal.addEventListener("hidden.bs.modal", function () {
        // Reset form
        productForm.reset();

        // Ẩn ảnh xem trước
        previewImage.src = "";
        document.getElementById("previewImage").style.display = "none";
    });

    function saveProducts() {
        localStorage.setItem("products", JSON.stringify(products));
        localStorage.setItem("productsAo", JSON.stringify(productsAo));
    }

    function renderProducts() {
        // render trang chủ
        const listHome = document.getElementById("product-list");
        listHome.innerHTML = "";
        products.forEach((product, index) => {
            listHome.innerHTML += generateRow(product, index, 'home');
        });

        // render trang áo
        const listAo = document.getElementById("product-list-ao");
        listAo.innerHTML = "";
        productsAo.forEach((product, index) => {
            listAo.innerHTML += generateRow(product, index, 'ao');
        });
    }

    function generateRow(product, index, page) {
        return `
            <tr>
                <td>${index + 1}</td>
                <td>${product.name}</td>
                <td>${product.price} VNĐ</td>
                <td>${product.quantity}</td>
                <td><img src="${product.image}" width="50"></td>
                <td class="d-flex" style="justify-content: space-evenly;">
                    <button class="btn btn-warning btn-sm" onclick="editProduct(${index}, '${page}')">Sửa</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteProduct(${index}, '${page}')">Xóa</button>
                </td>
            </tr>
        `;
    }

    function updateProductHrefs() {
        products.forEach((product, index) => {
            product.href = `ao_so_mi_${index + 1}.html`;
        });
        saveProducts();
    }
    

    // Bắt sự kiện nút Thêm của từng trang
    document.querySelectorAll("#openAddProductModal").forEach(btn => {
        btn.addEventListener("click", function (e) {
            // Xác định đang click từ trang nào
            if (e.target.closest("#content-1")) {
                currentPage = 'home';
            } else if (e.target.closest("#content-2")) {
                currentPage = 'ao';
            }

            editIndex = -1;
            productForm.reset();
            document.getElementById("productImage").value = "";
            document.getElementById("previewImage").style.display = "none";
        });
    });

    productForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("productName").value;
        const price = document.getElementById("productPrice").value;
        const quantity = document.getElementById("productQuantity").value;
        const imageInput = document.getElementById("productImage");
        const reader = new FileReader();

        reader.onload = function (e) {
            let href = "";
            if (currentPage === 'home') {
                href = `ao_so_mi_${products.index + 1}.html`;
            }

            const newProduct = { name, price, quantity, image: e.target.result, href };

            if (editIndex === -1) {
                if (currentPage === 'home') {
                    products.push(newProduct);
                } else if (currentPage === 'ao') {
                    productsAo.push(newProduct);
                }
            } else {
                if (editPage === 'home') {
                    href = `ao_so_mi_${editIndex + 1}.html`;
                    products[editIndex] = newProduct;
                } else if (editPage === 'ao') {
                    productsAo[editIndex] = newProduct;
                }
                editIndex = -1;
            }
            saveProducts();
            updateProductHrefs();
            renderProducts();
            bootstrap.Modal.getInstance(document.getElementById('addProductModal')).hide();
        };

        if (imageInput.files.length > 0) {
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            if (editIndex !== -1) {
                let p;
                if (editPage === 'home') {
                    p = products[editIndex];
                    p.href = `ao_so_mi_${editIndex + 1}.html`;
                } else if (editPage === 'ao') {
                    p = productsAo[editIndex];
                }
                p.name = name;
                p.price = price;
                p.quantity = quantity;

                saveProducts();
                updateProductHrefs();
                renderProducts();
                editIndex = -1;
                bootstrap.Modal.getInstance(document.getElementById('addProductModal')).hide();
            } else {
                alert("Vui lòng chọn ảnh cho sản phẩm mới.");
            }
        }
    });

    // Global edit và delete để dùng inline trong onclick
    window.editProduct = function (index, page) {
        const product = page === 'home' ? products[index] : productsAo[index];
        document.getElementById("productName").value = product.name;
        document.getElementById("productPrice").value = product.price;
        document.getElementById("productQuantity").value = product.quantity;

        const previewImage = document.getElementById("previewImage");
        previewImage.src = product.image;
        previewImage.style.display = "block";

        editIndex = index;
        editPage = page;
        new bootstrap.Modal(document.getElementById('addProductModal')).show();
    };

    window.deleteProduct = function (index, page) {
        if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
            if (page === 'home') {
                products.splice(index, 1);
            } else if (page === 'ao') {
                productsAo.splice(index, 1);
            }
            saveProducts();
            updateProductHrefs();
            renderProducts();
        }
    };

    document.getElementById("productImage").addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("previewImage").src = e.target.result;
                document.getElementById("previewImage").style.display = "block";
            };
            reader.readAsDataURL(file);
        }
    });
    loadAccounts();
    renderProducts();
});

// Chuyen tab
const links = document.querySelectorAll('.nav-link');

links.forEach(link => {
    if (link.dataset.target) {
        link.addEventListener('click', e => {
            e.preventDefault(); // chặn reload trang
            const targetId = link.dataset.target;
            showContent(targetId);
        });
    }
});

function showContent(id) {
    const contents = document.querySelectorAll('.container-fluid.p-4');
    contents.forEach(content => content.classList.add('d-none'));
    document.getElementById(id).classList.remove('d-none');
}

// trang tai khoan
function loadAccounts() {
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const table = document.getElementById('account-list');
    table.innerHTML = '';
    accounts.forEach((account, index) => {
        table.innerHTML += `
            <tr>
                <td>${account.username}</td>
                <td>${account.email}</td>
                <td>${account.password}</td>
                <td class="d-flex" style="justify-content: space-evenly;">
                    <button class="btn btn-danger btn-sm" onclick="deleteAccount(${index})">Xóa</button>
                </td>
            </tr>
        `;
    });
}

function deleteAccount(index) {
    if (confirm('Bạn có chắc muốn xóa tài khoản này?')) {
        const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
        accounts.splice(index, 1);
        localStorage.setItem('accounts', JSON.stringify(accounts));
        loadAccounts();
    }
}