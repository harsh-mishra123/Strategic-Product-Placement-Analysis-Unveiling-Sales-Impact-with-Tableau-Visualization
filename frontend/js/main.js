// ===== ANIMATED COUNTERS =====
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach(counter => {
    if (counter.dataset.animated) return;
    const rect = counter.getBoundingClientRect();
    if (rect.top > window.innerHeight || rect.bottom < 0) return;
    counter.dataset.animated = 'true';
    const target = counter.getAttribute('data-count');
    const suffix = counter.getAttribute('data-suffix') || '';
    const prefix = counter.getAttribute('data-prefix') || '';
    const numericTarget = parseFloat(target.replace(/[^0-9.]/g, ''));
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * numericTarget);
      counter.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

// ===== SCROLL FADE-IN =====
function handleScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.classList.add('visible');
    }
  });
}

// ===== NAVBAR SCROLL =====
function handleNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(15, 17, 23, 0.95)';
    navbar.style.backdropFilter = 'blur(12px)';
  } else {
    navbar.style.background = 'var(--bg-dark)';
    navbar.style.backdropFilter = 'none';
  }
}

// ===== MOBILE MENU =====
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.navbar-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }
}

// ===== DATA TABLE =====
function initDataTable() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('tableSearch');
  const rows = document.querySelectorAll('.data-table tbody tr');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      rows.forEach(row => {
        if (filter === 'all' || row.getAttribute('data-category') === filter) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }
}

// ===== SIMPLE BAR CHARTS =====
function renderBarChart(containerId, data, colors) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const maxVal = Math.max(...data.map(d => d.value));
  container.innerHTML = '';

  data.forEach((item, i) => {
    const heightPct = (item.value / maxVal) * 100;
    const bar = document.createElement('div');
    bar.className = 'chart-bar';
    bar.style.height = heightPct + '%';
    bar.style.background = colors[i % colors.length];

    const label = document.createElement('span');
    label.className = 'chart-bar-label';
    label.textContent = item.label;

    const value = document.createElement('span');
    value.className = 'chart-bar-value';
    value.textContent = item.display || item.value;

    bar.appendChild(label);
    bar.appendChild(value);
    container.appendChild(bar);
  });
}

// ===== DONUT CHART =====
function renderDonutChart(containerId, data, colors) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const total = data.reduce((sum, d) => sum + d.value, 0);
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  let svgHTML = `<svg viewBox="0 0 180 180">`;
  data.forEach((item, i) => {
    const pct = item.value / total;
    const dash = pct * circumference;
    svgHTML += `<circle cx="90" cy="90" r="${radius}" stroke="${colors[i]}" stroke-dasharray="${dash} ${circumference - dash}" stroke-dashoffset="${-offset}" />`;
    offset += dash;
  });
  svgHTML += `</svg>`;

  let legendHTML = '';
  data.forEach((item, i) => {
    const pct = ((item.value / total) * 100).toFixed(0);
    legendHTML += `<div class="legend-item"><span class="legend-dot" style="background:${colors[i]}"></span>${item.label} (${pct}%)</div>`;
  });

  container.innerHTML = `
    <div class="donut-chart">
      ${svgHTML}
      <div class="donut-center">
        <div class="value">${total.toLocaleString()}</div>
        <div class="label">Total Units</div>
      </div>
    </div>
    <div class="donut-legend">${legendHTML}</div>
  `;
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initMobileMenu();
  initDataTable();
  handleScrollAnimations();
  animateCounters();

  // Revenue by Placement Type
  renderBarChart('revenueChart', [
    { label: 'Endcap', value: 142580, display: '$142.6K' },
    { label: 'Eye-Level', value: 118945, display: '$118.9K' },
    { label: 'Checkout', value: 95320, display: '$95.3K' },
    { label: 'Window', value: 62450, display: '$62.5K' },
    { label: 'Online', value: 88760, display: '$88.8K' }
  ], ['#16a34a', '#22c55e', '#4ade80', '#86efac', '#bbf7d0']);

  // Sales by Category (Donut)
  renderDonutChart('categoryChart', [
    { label: 'Electronics', value: 8234 },
    { label: 'Beauty', value: 7456 },
    { label: 'Beverages', value: 9345 },
    { label: 'Snacks', value: 8912 }
  ], ['#3b82f6', '#8b5cf6', '#16a34a', '#f59e0b']);

  // ROI by Placement
  renderBarChart('roiChart', [
    { label: 'Endcap', value: 5.8, display: '5.8x' },
    { label: 'Eye-Level', value: 9.2, display: '9.2x' },
    { label: 'Checkout', value: 18.4, display: '18.4x' },
    { label: 'Window', value: 4.1, display: '4.1x' },
    { label: 'Online', value: 7.6, display: '7.6x' }
  ], ['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe', '#e0e7ff']);

  // Regional Performance
  renderBarChart('regionChart', [
    { label: 'North', value: 178500, display: '$178.5K' },
    { label: 'South', value: 134200, display: '$134.2K' },
    { label: 'East', value: 112800, display: '$112.8K' },
    { label: 'West', value: 98600, display: '$98.6K' }
  ], ['#16a34a', '#059669', '#10b981', '#34d399']);

  window.addEventListener('scroll', () => {
    handleScrollAnimations();
    animateCounters();
    handleNavbarScroll();
  });
});
