import Chart from "chart.js/auto";

// Los scripts originales usan Chart como variable global (antes venía del CDN).
window.Chart = Chart;
export default Chart;
