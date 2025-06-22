const FULL_THRESHOLD = 90;
let alreadyAlerted = false;
let totalLitresUsed = 0;

// Chart
const ctx = document.getElementById('tankChart').getContext('2d');
const tankChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Tank Level (%)',
      data: [],
      borderColor: 'blue',
      backgroundColor: 'rgba(0,0,255,0.1)',
      tension: 0.4,
      fill: true
    }]
  },
  options: {
    responsive: true,
    scales: {
      x: { title: { display: true, text: 'Time' }},
      y: { min: 0, max: 100, title: { display: true, text: 'Tank Level (%)' }}
    }
  }
});

// Tips
const tips = [
  "💧 Turn off taps while brushing your teeth.",
  "🪣 Use a bucket instead of a shower.",
  "🌧️ Harvest rainwater from your roof.",
  "🧼 Fix leaking taps immediately.",
  "🛁 Take shorter showers.",
  "🌿 Use drip irrigation for plants.",
  "🚿 Use low-flow water fixtures.",
  "🧺 Run washing machines only when full."
];

function showRandomTip() {
  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  document.getElementById("tip-text").textContent = randomTip;
}

document.getElementById("toggle-mode").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

function speakAlert(text) {
  const msg = new SpeechSynthesisUtterance();
  msg.text = text;
  msg.lang = 'en-US';
  msg.volume = 1;
  msg.rate = 0.9;
  msg.pitch = 1.1;
  window.speechSynthesis.speak(msg);
}

async function fetchData() {
  try {
    const response = await fetch('water_data.json');
    const data = await response.json();

    const now = new Date().toLocaleTimeString();

    document.getElementById('flow').textContent = data.flow_rate;
    document.getElementById('tank').textContent = data.tank_level;
    document.getElementById('moisture').textContent = data.moisture;
    document.getElementById('tank-fill').style.width = `${data.tank_level}%`;

    // Alert
    const alertBox = document.getElementById('alert');
    if (data.tank_level >= FULL_THRESHOLD) {
      alertBox.style.display = "block";
      document.getElementById('tank-card').style.backgroundColor = "#ffe082";
      if (!alreadyAlerted) {
        speakAlert("Alert! The water tank is full. Please turn off the motor.");
        alreadyAlerted = true;
      }
    } else {
      alertBox.style.display = "none";
      document.getElementById('tank-card').style.backgroundColor = "#ffffff";
      alreadyAlerted = false;
    }

    // Chart update
    tankChart.data.labels.push(now);
    tankChart.data.datasets[0].data.push(data.tank_level);
    if (tankChart.data.labels.length > 10) {
      tankChart.data.labels.shift();
      tankChart.data.datasets[0].data.shift();
    }
    tankChart.update();

    // Usage estimate
    totalLitresUsed += data.flow_rate * (2 / 60);
    document.getElementById("usage-estimate").textContent = `${totalLitresUsed.toFixed(2)} Litres`;

    // Table update
    const tableBody = document.querySelector("#monitoring-table tbody");
    const newRow = `<tr><td>${now}</td><td>${data.flow_rate}</td><td>${data.tank_level}</td><td>${data.moisture}</td></tr>`;
    tableBody.insertAdjacentHTML("afterbegin", newRow);
    if (tableBody.rows.length > 10) tableBody.deleteRow(10);

  } catch (err) {
    console.error("Fetch error:", err);
  }
}

setInterval(fetchData, 2000);
fetchData();
