document.addEventListener('DOMContentLoaded', function() {
    const formLogin = document.getElementById('formLogin');
    const formRegister = document.getElementById('formRegister');

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

            if (checkLogin(username, password)) {
                alert('Đăng nhập thành công!');
                window.location.href = 'home.html'; // Đổi thành trang đích sau khi đăng nhập
            } else {
                alert('Tên đăng nhập hoặc mật khẩu không đúng!');
            }
        });
    }
});