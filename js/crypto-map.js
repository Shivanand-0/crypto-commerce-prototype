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
          // --- SEEDED RANDOM FOR CONSISTENT DEMO DATA ---
          function seededRandom(seed) {
            let x = Math.sin(seed++) * 10000;
            return x - Math.floor(x);
          }
          let demoSeed = sessionStorage.getItem('cryptoDemoSeed');
          if (!demoSeed) {
            demoSeed = Date.now();
            sessionStorage.setItem('cryptoDemoSeed', demoSeed);
          }
          demoSeed = Number(demoSeed);
          let demoIndex = 0;
          // Replace random assignment with seeded random
          geojson.features.forEach(f => {
            const code = f.id || f.properties.ISO_A2 || f.properties.id;
            countryCrypto[code] = seededRandom(demoSeed + (++demoIndex)) * 1000;
          });
          // --- COLORFUL RAINBOW SCALE FOR MAP & CHART ---
          function getColor(val) {
            if (val > 900) return '#e31a1c';      // red
            if (val > 800) return '#fd8d3c';      // orange
            if (val > 700) return '#feb24c';      // yellow-orange
            if (val > 600) return '#fed976';      // yellow
            if (val > 400) return '#31a354';      // green
            if (val > 200) return '#3182bd';      // blue
            if (val > 100) return '#756bb1';      // purple
            return '#bcbddc';                     // light purple/gray
          }
          // Style and interactivity
          function style(feature) {
            const code = feature.id || feature.properties.ISO_A2 || feature.properties.id;
            const val = typeof countryCrypto[code] === 'number' ? countryCrypto[code] : 0;
            return {
              fillColor: getColor(val),
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
                const countryName = feature.properties.name || feature.properties.ADMIN || code;
                tooltip.style.display = 'block';
                tooltip.innerHTML = `<strong>${countryName}</strong>`;
                // Use viewport coordinates for tooltip to avoid clipping
                const mapRect = map.getContainer().getBoundingClientRect();
                const x = e.originalEvent.clientX - mapRect.left + 10;
                const y = e.originalEvent.clientY - mapRect.top - 30;
                tooltip.style.left = x + 'px';
                tooltip.style.top = y + 'px';
                tooltip.style.zIndex = 9999;
                tooltip.style.pointerEvents = 'none';
                layer.setStyle({ weight: 2, color: '#222', fillOpacity: 0.9, fillColor: getColor(typeof countryCrypto[code] === 'number' ? countryCrypto[code] : 0) });
                map.getContainer().style.cursor = 'default';
              },
              mouseout: function(e) {
                tooltip.style.display = 'none';
                geojsonLayer.resetStyle(layer);
                map.getContainer().style.cursor = 'default';
              },
              mousemove: function(e) {
                const mapRect = map.getContainer().getBoundingClientRect();
                const x = e.originalEvent.clientX - mapRect.left + 10;
                const y = e.originalEvent.clientY - mapRect.top - 30;
                tooltip.style.left = x + 'px';
                tooltip.style.top = y + 'px';
              }
            });
          }
          const geojsonLayer = L.geoJson(geojson, {
            style,
            onEachFeature
          }).addTo(map);
          // --- BAR CHART: TOP 10 COUNTRIES BY CRYPTO INDEX ---
          // Find top 10 countries by value
          const sortedCountries = Object.entries(countryCrypto)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);
          const chartLabels = sortedCountries.map(([code]) => {
            // Try to get country name from geojson
            const feature = geojson.features.find(f => (f.id || f.properties.ISO_A2 || f.properties.id) === code);
            const name = feature ? (feature.properties.name || feature.properties.ADMIN) : code;
            return name + ' (' + code + ')';
          });
          const chartData = sortedCountries.map(([, val]) => Number(val));
          const chartColors = sortedCountries.map(([, val]) => getColor(Number(val)));
          const chartCanvas = document.getElementById('crypto-chart');
          if (chartCanvas) {
            if (window.cryptoChartInstance) {
              window.cryptoChartInstance.destroy();
            }
            const ctx = chartCanvas.getContext('2d');
            chartCanvas.width = 700;
            chartCanvas.height = 340;
            ctx.clearRect(0, 0, chartCanvas.width, chartCanvas.height);
            if (window.Chart) {
              window.cryptoChartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                  labels: chartLabels,
                  datasets: [{
                    label: 'Crypto Index',
                    data: chartData,
                    backgroundColor: chartColors,
                    borderRadius: 8,
                    borderSkipped: false,
                    borderWidth: 2,
                    hoverBackgroundColor: chartColors
                  }]
                },
                options: {
                  responsive: false,
                  animation: true,
                  plugins: {
                    legend: { display: false },
                    title: { display: true, text: 'Crypto Index of Top 10 Countries', color: '#7c3aed', font: { size: 18, weight: 'bold' } }
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
            } else {
              chartCanvas.parentNode.insertAdjacentHTML('beforeend', '<div style="color:red;text-align:center;margin-top:1em;">Chart.js library not loaded.</div>');
            }
          }
        })
        .catch(err => {
          // Fallback: generate seeded demo data for all countries
          let demoIndex = 0;
          geojson.features.forEach(f => {
            const code = f.id || f.properties.ISO_A2 || f.properties.id;
            countryCrypto[code] = seededRandom(demoSeed + (++demoIndex)) * 1000;
          });
          // --- COLORFUL RAINBOW SCALE FOR MAP & CHART ---
          function getColor(val) {
            if (val > 900) return '#e31a1c';
            if (val > 800) return '#fd8d3c';
            if (val > 700) return '#feb24c';
            if (val > 600) return '#fed976';
            if (val > 400) return '#31a354';
            if (val > 200) return '#3182bd';
            if (val > 100) return '#756bb1';
            return '#bcbddc';
          }
          // Style and interactivity
          function style(feature) {
            const code = feature.id || feature.properties.ISO_A2 || feature.properties.id;
            const val = typeof countryCrypto[code] === 'number' ? countryCrypto[code] : 0;
            return {
              fillColor: getColor(val),
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
                const countryName = feature.properties.name || feature.properties.ADMIN || code;
                tooltip.style.display = 'block';
                tooltip.innerHTML = `<strong>${countryName}</strong>`;
                // Use viewport coordinates for tooltip to avoid clipping
                const mapRect = map.getContainer().getBoundingClientRect();
                const x = e.originalEvent.clientX - mapRect.left + 10;
                const y = e.originalEvent.clientY - mapRect.top - 30;
                tooltip.style.left = x + 'px';
                tooltip.style.top = y + 'px';
                tooltip.style.zIndex = 9999;
                tooltip.style.pointerEvents = 'none';
                layer.setStyle({ weight: 2, color: '#222', fillOpacity: 0.9, fillColor: getColor(typeof countryCrypto[code] === 'number' ? countryCrypto[code] : 0) });
                map.getContainer().style.cursor = 'default';
              },
              mouseout: function(e) {
                tooltip.style.display = 'none';
                geojsonLayer.resetStyle(layer);
                map.getContainer().style.cursor = 'default';
              },
              mousemove: function(e) {
                const mapRect = map.getContainer().getBoundingClientRect();
                const x = e.originalEvent.clientX - mapRect.left + 10;
                const y = e.originalEvent.clientY - mapRect.top - 30;
                tooltip.style.left = x + 'px';
                tooltip.style.top = y + 'px';
              }
            });
          }
          const geojsonLayer = L.geoJson(geojson, {
            style,
            onEachFeature
          }).addTo(map);
          // --- BAR CHART: TOP 10 COUNTRIES BY CRYPTO INDEX ---
          const sortedCountries = Object.entries(countryCrypto)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);
          const chartLabels = sortedCountries.map(([code]) => {
            const feature = geojson.features.find(f => (f.id || f.properties.ISO_A2 || f.properties.id) === code);
            const name = feature ? (feature.properties.name || feature.properties.ADMIN) : code;
            return name + ' (' + code + ')';
          });
          const chartData = sortedCountries.map(([, val]) => Number(val));
          const chartColors = sortedCountries.map(([, val]) => getColor(Number(val)));
          const chartCanvas = document.getElementById('crypto-chart');
          if (chartCanvas) {
            if (window.cryptoChartInstance) {
              window.cryptoChartInstance.destroy();
            }
            const ctx = chartCanvas.getContext('2d');
            chartCanvas.width = 700;
            chartCanvas.height = 340;
            ctx.clearRect(0, 0, chartCanvas.width, chartCanvas.height);
            if (window.Chart) {
              window.cryptoChartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                  labels: chartLabels,
                  datasets: [{
                    label: 'Crypto Index',
                    data: chartData,
                    backgroundColor: chartColors,
                    borderRadius: 8,
                    borderSkipped: false,
                    borderWidth: 2,
                    hoverBackgroundColor: chartColors
                  }]
                },
                options: {
                  responsive: false,
                  animation: true,
                  plugins: {
                    legend: { display: false },
                    title: { display: true, text: 'Crypto Index of Top 10 Countries', color: '#7c3aed', font: { size: 18, weight: 'bold' } }
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
            } else {
              chartCanvas.parentNode.insertAdjacentHTML('beforeend', '<div style="color:red;text-align:center;margin-top:1em;">Chart.js library not loaded.</div>');
            }
          }
        });
    })
    .catch(err => {
      document.getElementById('crypto-map').innerHTML = '<div style="color:red;text-align:center;padding:2em;">Failed to load country boundaries.</div>';
    });
});
