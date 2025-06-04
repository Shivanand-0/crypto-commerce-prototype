// js/crypto-map.js
// Interactive Crypto Adoption Map using Leaflet and CoinGecko API

// Ensure the map is initialized only after DOM is ready
window.addEventListener('DOMContentLoaded', function() {
  // Check if L (Leaflet) is loaded
  if (typeof L === 'undefined') {
    console.error('Leaflet library not loaded!');
    document.getElementById('crypto-map').innerHTML = '<div style="color:red;text-align:center;padding:2em;">Map library failed to load. Please check your internet connection or Content Security Policy.</div>';
    return;
  }
  // Initialize the map
  const map = L.map('crypto-map', {
    worldCopyJump: true,
    minZoom: 2,
    maxZoom: 5,
    zoomControl: false,
    attributionControl: false
  }).setView([20, 0], 2);

  // Set default cursor for the map
  map.getContainer().style.cursor = 'default';

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 5,
    minZoom: 2,
    attribution: ''
  }).addTo(map);

  // Tooltip
  const tooltip = document.getElementById('crypto-tooltip');

  // Use a more reliable GeoJSON source for country boundaries
  fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
    .then(res => res.json())
    .then(geojson => {
      // Fetch CoinGecko data (top 100 countries by crypto interest)
      axios.get('https://api.coingecko.com/api/v3/exchange_rates')
        .then(response => {
          // We'll use BTC rates as a proxy for crypto interest
          const rates = response.data.rates;
          // Map country code to BTC rate (mock: randomize for demo)
          const countryCrypto = {};
          geojson.features.forEach(f => {
            // Use ISO_A2 or id for country code, fallback to random for demo
            const code = f.id || f.properties.ISO_A2 || f.properties.id;
            countryCrypto[code] = Math.random() * 1000; // Replace with real mapping if available
          });
          // Style and interactivity
          function style(feature) {
            const code = feature.id || feature.properties.ISO_A2 || feature.properties.id;
            const val = countryCrypto[code] || 0;
            return {
              fillColor: val > 800 ? '#7c3aed' : val > 400 ? '#a78bfa' : '#e0e7ff',
              weight: 1,
              opacity: 1,
              color: '#888',
              fillOpacity: 0.7
            };
          }
          function onEachFeature(feature, layer) {
            layer.on({
              mouseover: function(e) {
                const code = feature.id || feature.properties.ISO_A2 || feature.properties.id;
                const val = countryCrypto[code] || 0;
                tooltip.style.display = 'block';
                tooltip.innerHTML = `<strong>${feature.properties.name || feature.properties.ADMIN}</strong><br>Crypto Index: ${val.toFixed(0)}`;
                tooltip.style.left = (e.originalEvent.pageX + 10) + 'px';
                tooltip.style.top = (e.originalEvent.pageY - 30) + 'px';
                layer.setStyle({ weight: 2, color: '#222', fillOpacity: 0.9 });
                map.getContainer().style.cursor = 'default'; // Keep default cursor
              },
              mouseout: function(e) {
                tooltip.style.display = 'none';
                geojsonLayer.resetStyle(layer);
                map.getContainer().style.cursor = 'default';
              },
              mousemove: function(e) {
                tooltip.style.left = (e.originalEvent.pageX + 10) + 'px';
                tooltip.style.top = (e.originalEvent.pageY - 30) + 'px';
              }
            });
          }
          const geojsonLayer = L.geoJson(geojson, {
            style,
            onEachFeature
          }).addTo(map);

          // --- BAR CHART ---
          // Get top 10 countries by crypto index
          const top10 = Object.entries(countryCrypto)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);
          const chartLabels = top10.map(([code]) => code);
          const chartData = top10.map(([, val]) => val);
          const chartCanvas = document.getElementById('crypto-chart');
          if (chartCanvas) {
            // Remove previous chart instance if any
            if (window.cryptoChartInstance) {
              window.cryptoChartInstance.destroy();
            }
            // Chart.js 4+ requires a 2d context
            const ctx = chartCanvas.getContext('2d');
            chartCanvas.style.display = 'block';
            chartCanvas.width = 700;
            chartCanvas.height = 340;
            window.cryptoChartInstance = new Chart(ctx, {
              type: 'bar',
              data: {
                labels: chartLabels,
                datasets: [{
                  label: 'Crypto Index',
                  data: chartData,
                  backgroundColor: '#7c3aed',
                  borderRadius: 8,
                  borderSkipped: false,
                  borderWidth: 0,
                  hoverBackgroundColor: '#a78bfa',
                }]
              },
              options: {
                responsive: false,
                plugins: {
                  legend: { display: false },
                  title: { display: true, text: 'Top 10 Countries by Crypto Index', color: '#7c3aed', font: { size: 18, weight: 'bold' } }
                },
                scales: {
                  x: {
                    ticks: { color: '#222', font: { weight: 'bold' } },
                    grid: { color: '#e0e0e0' }
                  },
                  y: {
                    beginAtZero: true,
                    ticks: { color: '#222', font: { weight: 'bold' } },
                    grid: { color: '#e0e0e0' }
                  }
                }
              }
            });
          }
        })
        .catch(err => {
          document.getElementById('crypto-map').innerHTML = '<div style="color:red;text-align:center;padding:2em;">Failed to fetch crypto data.</div>';
        });
    })
    .catch(err => {
      document.getElementById('crypto-map').innerHTML = '<div style="color:red;text-align:center;padding:2em;">Failed to load country boundaries.</div>';
    });
});
