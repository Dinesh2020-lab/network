const tableBody = document.querySelector('#trafficTable tbody');
const refreshBtn = document.getElementById('refreshBtn');

async function fetchTraffic() {
    try {
        const res = await fetch('http://localhost:3000/traffic');
        const data = await res.json();
        tableBody.innerHTML = '';
        data.forEach(item => {
            const row = `<tr>
                <td>${item.time}</td>
                <td>${item.sourceIP}</td>
                <td>${item.destIP}</td>
                <td>${item.protocol}</td>
                <td>${item.size}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    } catch (err) {
        alert('Error fetching traffic: ' + err);
    }
}

refreshBtn.addEventListener('click', fetchTraffic);

// Auto-refresh every 5 seconds
setInterval(fetchTraffic, 5000);
fetchTraffic();
