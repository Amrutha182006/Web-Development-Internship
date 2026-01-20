document.querySelector('.booking-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Stop page refresh

    // 1. Get Values
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const people = document.getElementById('people').value;
    const sitting = document.querySelector('input[name="sitting"]:checked').value;

    // 2. Fill Receipt
    document.getElementById('r-date').innerText = date;
    document.getElementById('r-time').innerText = time;
    document.getElementById('r-guests').innerText = people;
    document.getElementById('r-sitting').innerText = sitting.toUpperCase();
    
    // 3. Show Modal
    document.getElementById('receiptModal').style.display = 'flex';
});

function closeReceipt() {
    document.getElementById('receiptModal').style.display = 'none';
    location.reload(); // Optional: clears form
}