let motor = false;
const flowElem = document.getElementById("flowRate");
const tankElem = document.getElementById("tankLevel");
const moistElem = document.getElementById("moisture");
const alertBox = document.getElementById("alertBox");

document.getElementById("toggleMotor").onclick = () => {
  motor = !motor;
  document.getElementById("toggleMotor").textContent = motor ? "ON" : "OFF";
};

document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark-mode");
};

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
    scales: {
      y: { beginAtZero: true }
    }
  }
});

let history = [];

function updateData() {
  const flow = (Math.random() * 5).toFixed(1);
  const tank = Math.floor(Math.random() * 100);
  const moist = Math.floor(Math.random() * 100);

  flowElem.textContent = flow;
  tankElem.textContent = tank;
  moistElem.textContent = moist;

  if (tank >= 90) {
    alertBox.style.display = "block";
  } else {
    alertBox.style.display = "none";
  }

  const today = new Date().toLocaleDateString();
  history.unshift({ date: today, flow, tank, moist });
  renderTable();
  updateChart(today, flow);
}

function renderTable() {
  const table = document.getElementById("historyTable");
  table.innerHTML = "";
  history.slice(0, 5).forEach(row => {
    table.innerHTML += `<tr>
      <td>${row.date}</td>
      <td>${row.flow}</td>
      <td>${row.tank}</td>
      <td>${row.moist}</td>
    </tr>`;
  });
}

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

updateData();
setInterval(updateData, 5000);
