import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({ providedIn: 'root' })
export class ExportService {

  // =====================================================
  // 🔹 EXPORTAR EXCEL
  // =====================================================
  exportProducts(products: any[]) {

    const data = products.map(p => ({
      ID: p.id,
      Nombre: p.name,
      SKU: p.sku,
      Precio: p.salePrice,
      Stock: p.stock,
      Sucursal: p.branchName,
      Categoría: p.categoryName
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = {
      Sheets: { Productos: worksheet },
      SheetNames: ['Productos']
    };

    const buffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });

    saveAs(new Blob([buffer]), 'productos.xlsx');
  }

  // =====================================================
  // 🔹 EXPORTAR PDF
  // =====================================================
  exportProductsPdf(products: any[]) {

    const doc = new jsPDF('l', 'mm', 'a4'); // landscape

    // Título
    doc.setFontSize(18);
    doc.text('Reporte de Productos', 14, 15);

    // Fecha
    doc.setFontSize(11);
    doc.text('Fecha: ' + new Date().toLocaleString(), 14, 22);

    // Tabla
    const rows = products.map(p => [
      p.id,
      p.name,
      p.sku,
      p.categoryName,
      p.branchName,
      p.stock,
      p.costPrice,
      p.salePrice
    ]);

    autoTable(doc, {
      head: [[
        'ID', 'Nombre', 'SKU', 'Categoría', 'Sucursal',
        'Stock', 'Costo', 'Precio'
      ]],
      body: rows,
      startY: 28,
      theme: 'striped',
      styles: { fontSize: 10 },
      headStyles: { fillColor: [255, 221, 0] }, // Amarillo patito
    });

    doc.save('productos.pdf');
  }
}
