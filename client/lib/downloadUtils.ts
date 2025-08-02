import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const downloadAsImage = async (
  elementId: string,
  filename: string = "student-id-card",
) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error("Element not found");
    }

    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: null,
      useCORS: true,
      allowTaint: true,
    });

    const link = document.createElement("a");
    link.download = `${filename}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  } catch (error) {
    console.error("Error downloading image:", error);
    throw error;
  }
};

export const downloadAsPDF = async (
  elementId: string,
  filename: string = "student-id-card",
) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error("Element not found");
    }

    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: null,
      useCORS: true,
      allowTaint: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Calculate dimensions to fit the card nicely on the page
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // ID card aspect ratio (width:height = 0.6:1 approximately)
    const cardWidth = 85; // mm
    const cardHeight = 140; // mm

    // Center the card on the page
    const x = (pdfWidth - cardWidth) / 2;
    const y = (pdfHeight - cardHeight) / 2;

    pdf.addImage(imgData, "PNG", x, y, cardWidth, cardHeight);
    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error("Error downloading PDF:", error);
    throw error;
  }
};
