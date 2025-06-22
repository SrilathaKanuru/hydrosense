let motor = false;
const flowElem = document.getElementById("flowRate");
const tankElem = document.getElementById("tankLevel");
const moistElem = document.getElementById("moisture");
const alertBox = document.getElementById("alertBox");
const motorBtn = document.getElementById("toggleMotor");
const themeBtn = document.getElementById("themeToggle");

let history = [];

// Toggle motor ON/OFF
motorBtn.onclick = () => {
  motor = !motor;
  motorBtn.textContent = motor ? "ON" : "OFF";
  motorBtn.style.background = motor ? "#4CAF50" : "#ccc";
};

// Toggle light/dark theme
themeBtn.onclick = () => {
  document.body.classList.toggle("dark-mode");
};

// Setup chart
const ctx = document.getElementById('usageChart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: 'Water Usage (L)',
      data: [],
      backgroundColor: '#0077cc'
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { labels: { color: '#111' } }
    },
    scales: {
      x: { ticks: { color: '#111' } },
      y: { beginAtZero: true, ticks: { color: '#111' } }
    }
  }
});

// Update simulated data
function updateData() {
  const flow = (Math.random() * 5).toFixed(1); // L/min
  const tank = Math.floor(Math.random() * 100); // %
  const moist = Math.floor(Math.random() * 100); // %

  flowElem.textContent = flow;
  tankElem.textContent = tank;
  moistElem.textContent = moist;

  if (tank >= 90) {
    alertBox.style.display = "block";
    alertBox.textContent = "⚠️ Tank Full!";
  } else {
    alertBox.style.display = "none";
  }

  const today = new Date().toLocaleDateString();
  history.unshift({ date: today, flow, tank, moist });
  renderTable();
  updateChart(today, flow);
}

// Update chart with today's flow
function updateChart(label, flow) {
  const labels = chart.data.labels;
  const data = chart.data.datasets[0].data;

  const index = labels.indexOf(label);
  if (index >= 0) {
    data[index] = (+data[index] + +flow).toFixed(1);
  } else {
    labels.push(label);
    data.push(flow);
  }
  chart.update();
}

// Render last 5 entries in table
function renderTable() {
  const table = document.getElementById("historyTable");
  table.innerHTML = "<tr><th>Date</th><th>Flow</th><th>Tank</th><th>Moist</th></tr>";
  history.slice(0, 5).forEach(row => {
    table.innerHTML += `<tr>
      <td>${row.date}</td>
      <td>${row.flow}</td>
      <td>${row.tank}</td>
      <td>${row.moist}</td>
    </tr>`;
  });
}

// Initial call and repeat every 5s
updateData();
setInterval(updateData, 5000);
