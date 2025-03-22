document.addEventListener('DOMContentLoaded', function() {
    const formLogin = document.getElementById('formLogin');
    const formRegister = document.getElementById('formRegister');
    const dropdownAccount = document.querySelector('.dropdown-account .account-item');
    console.log("Dropdown account element:", dropdownAccount);

    // Hàm lưu tài khoản vào LocalStorage
    function saveAccount(username, email, password) {
        let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
        accounts.push({ username, email, password });
        localStorage.setItem('accounts', JSON.stringify(accounts));
    }

    // Hàm kiểm tra thông tin đăng nhập
    function checkLogin(username, password) {
        let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
        return accounts.some(account => account.username === username && account.password === password);
    }

    // Kiểm tra tài khoản đã tồn tại
    function isAccountExist(username, email) {
        let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
        return accounts.some(account => account.username === username || account.email === email);
    }

    // Đăng ký tài khoản
    if (formRegister) {
        formRegister.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('reg-username').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const confirmPassword = document.getElementById('reg-confirm-password').value;

            if (isAccountExist(username, email)) {
                alert('Tên đăng nhập hoặc email đã tồn tại!');
            } else if (password === confirmPassword) {
                saveAccount(username, email, password);
                alert('Đăng ký thành công!');
                window.location.href = 'login.html'; 
            } else {
                alert('Mật khẩu xác nhận không khớp!');
            }
        });
    }

    // Đăng nhập
    if (formLogin) {
        formLogin.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username === 'admin' && password === 'admin') {
                alert('Đăng nhập thành công trang admin!');
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', username);
                window.location.href = 'admin.html';
            } else if (checkLogin(username, password)) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', username);
                window.location.href = 'home.html'; 
            } else {
                alert('Tên đăng nhập hoặc mật khẩu không đúng!');
            }
        });
    }

    // Xử lý UI "Xin chào + Đăng xuất"
    if (dropdownAccount) {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            const username = localStorage.getItem('username');

            dropdownAccount.innerHTML = `
                <li class="list-group-item p-0">
                    <a class="p-3 w-100 d-flex">Xin chào: ${username}</a>
                </li>
                <li class="list-group-item p-0">
                    <a href="#" id="logout-btn" class="p-3 w-100 d-flex">Đăng xuất</a>
                </li>
            `;

            const logoutBtn = document.getElementById('logout-btn');
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('username');
                window.location.reload();
            });
        } else {
            console.log("Chưa đăng nhập, giữ nguyên Đăng nhập/Tạo tài khoản");
        }
    }
});
