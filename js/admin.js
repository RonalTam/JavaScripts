document.addEventListener("DOMContentLoaded", function () {
    const productForm = document.getElementById("addProductForm");
    const productList = document.getElementById("product-list");
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let editIndex = -1;

    function saveProducts() {
        localStorage.setItem("products", JSON.stringify(products));
    }

    function renderProducts() {
        productList.innerHTML = "";
        products.forEach((product, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${product.name}</td>
                <td>${product.price} VNĐ</td>
                <td>${product.quantity}</td>
                <td><img src="${product.image}" width="50"></td>
                <td style = 'justify-content: space-evenly; display: flex;'>
                    <button class="btn btn-warning btn-sm" onclick="editProduct(${index})">Sửa</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">Xóa</button>
                </td>
            `;
            productList.appendChild(row);
        });
    }

    document.getElementById("openAddProductModal").addEventListener("click", function () {
        editIndex = -1; // Đảm bảo không bị ảnh hưởng bởi chế độ sửa
        productForm.reset(); 
        document.getElementById("productImage").value = ""; // Reset input file
        document.getElementById("previewImage").style.display = "none"; // Ẩn ảnh xem trước
    });

    productForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("productName").value;
        const price = document.getElementById("productPrice").value;
        const quantity = document.getElementById("productQuantity").value;
        const imageInput = document.getElementById("productImage");
        const reader = new FileReader();

        reader.onload = function (e) {
            if (editIndex === -1) {
                products.push({ name, price, quantity, image: e.target.result });
            } else {
                products[editIndex] = { name, price, quantity, image: e.target.result };
                editIndex = -1;
            }
            saveProducts();
            renderProducts();
            productForm.reset();
            bootstrap.Modal.getInstance(document.getElementById('addProductModal')).hide();
        };
        if (imageInput.files.length > 0) {
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            if (editIndex !== -1) {
                products[editIndex].name = name;
                products[editIndex].price = price;
                products[editIndex].quantity = quantity;
                saveProducts();
                renderProducts();
                editIndex = -1;
                bootstrap.Modal.getInstance(document.getElementById('addProductModal')).hide();
            } else {
                alert("Vui lòng chọn ảnh cho sản phẩm mới.");
            }
        }
    });

    window.editProduct = function (index) {
        const product = products[index];
        document.getElementById("productName").value = product.name;
        document.getElementById("productPrice").value = product.price;
        document.getElementById("productQuantity").value = product.quantity;
    
        // Hiển thị ảnh cũ
        const previewImage = document.getElementById("previewImage");
        previewImage.src = product.image;
        previewImage.style.display = "block"; // Hiện ảnh
    
        editIndex = index;
        new bootstrap.Modal(document.getElementById('addProductModal')).show();
    };

    window.deleteProduct = function (index) {
        if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
            products.splice(index, 1);
            saveProducts();
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

    renderProducts();
});
