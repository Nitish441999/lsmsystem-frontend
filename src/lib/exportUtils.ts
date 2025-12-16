import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Lead } from "@/types/lead";
import { format } from "date-fns";

export const exportToExcel = (leads: Lead[], filename: string) => {
  const data = leads.map((lead) => ({
    Name: lead.name,
    Email: lead.email,
    Phone: lead.contact,
    Source: lead.source.charAt(0).toUpperCase() + lead.source.slice(1),
    Service: lead.service,
    Status: lead.status.charAt(0).toUpperCase() + lead.status.slice(1),
    "Created At": format(new Date(lead.createdAt), "MMM dd, yyyy HH:mm"),
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");

  worksheet["!cols"] = [
    { wch: 20 },
    { wch: 25 },
    { wch: 15 },
    { wch: 20 },
    { wch: 12 },
    { wch: 20 },
    { wch: 12 },
    { wch: 18 },
  ];

  XLSX.writeFile(workbook, `${filename}.xlsx`);
};

export const exportToPDF = (leads: Lead[], filename: string, title: string) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(title, 14, 22);

  doc.setFontSize(10);
  doc.text(`Generated: ${format(new Date(), "MMM dd, yyyy HH:mm")}`, 14, 30);

  const tableData = leads.map((lead) => [
    lead.name,
    lead.email,
    lead.contact,
    lead.source.charAt(0).toUpperCase() + lead.source.slice(1),
    lead.status.charAt(0).toUpperCase() + lead.status.slice(1),
    format(new Date(lead.createdAt), "MMM dd, yyyy"),
  ]);

  autoTable(doc, {
    head: [["Name", "Email", "Phone", "Source", "Status", "Created At"]],
    body: tableData,
    startY: 35,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [59, 130, 246] },
  });

  doc.save(`${filename}.pdf`);
};
