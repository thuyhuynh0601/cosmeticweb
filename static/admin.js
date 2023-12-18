document.addEventListener('DOMContentLoaded', function () {
    // Hiển thị danh sách giao dịch
    displayTransactionList();

    // Hiển thị tổng doanh thu
    displayTotalRevenue();
});

// Hàm hiển thị danh sách giao dịch
function displayTransactionList() {
    const transactionListContainer = document.getElementById('transactionList');
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    if (transactions.length > 0) {
        const transactionListHTML = transactions.map(transaction => {
            return `
                <tr>
                    <td>${transaction.name}</td>
                    <td>${transaction.quantity}</td>
                    <td>${transaction.totalPrice}</td>
                    <td>${transaction.timestamp}</td>
                    <td>
                        <button class="btn btn-sm btn-primary mr-2" onclick="editTransaction(${transaction.productId})">Sửa</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteTransaction(${transaction.productId})">Xoá</button>
                    </td>
                </tr>`;
        }).join('');

        transactionListContainer.innerHTML = transactionListHTML;
    } else {
        transactionListContainer.innerHTML = '<tr><td colspan="5">Chưa có giao dịch nào.</td></tr>';
    }
}

// Hàm hiển thị tổng doanh thu
function displayTotalRevenue() {
    const totalRevenueContainer = document.getElementById('totalRevenue');
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    const totalRevenue = transactions.reduce((total, transaction) => total + transaction.totalPrice, 0);

    let totalQuantity = 0;

    transactions.forEach(transaction => {
        totalQuantity += transaction.quantity;
    });

    totalRevenueContainer.innerHTML = `
        <p style="font-size: 18px; color: red">Tổng doanh thu: ${totalRevenue} VNĐ</p>
        <p style="font-size: 18px; color: red">Số lượng sản phẩm được bán: ${totalQuantity}</p>`;
}

// Hàm sửa giao dịch
function editTransaction(transactionId) {
    // Xử lý logic sửa giao dịch
    console.log('Sửa giao dịch với ID: ' + transactionId);
}

function deleteTransaction(transactionId) {
    // Xử lý logic xoá giao dịch
    console.log('Xoá giao dịch với ID: ' + transactionId);

    // Lấy danh sách giao dịch từ Local Storage
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    // Tìm vị trí của giao dịch cần xoá trong danh sách
    const transactionIndex = transactions.findIndex(transaction => transaction.productId === transactionId);

    if (transactionIndex !== -1) {
        // Xoá giao dịch khỏi danh sách
        transactions.splice(transactionIndex, 1);

        // Lưu danh sách giao dịch mới vào Local Storage
        localStorage.setItem('transactions', JSON.stringify(transactions));

        // Hiển thị lại danh sách giao dịch và tổng doanh thu
        displayTransactionList();
        displayTotalRevenue();
    }
}