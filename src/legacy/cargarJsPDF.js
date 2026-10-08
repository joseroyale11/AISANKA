import { jsPDF } from "jspdf";

// Los scripts originales usan window.jspdf.jsPDF (antes venía del CDN).
window.jspdf = { jsPDF };
export default jsPDF;
