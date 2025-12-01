import * as XLSX from "xlsx";

export function readExcel(file: File): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const rows: any[] = XLSX.utils.sheet_to_json(sheet, { defval: "" });

      console.log("RAW EXCEL →", rows);

      const mapped = rows.map(r => ({
        name: r["Nombre"] || "",
        sku: r["SKU"] || "",
        stock: Number(r["Stock"] || 0),
        cost: Number(r["Costo"] || 0),
        price: Number(r["Precio"] || 0),
        category: r["Categoría"] || "",
        branch: r["Sucursal"] || ""
      }));

      console.log("MAPPED JSON →", mapped);

      resolve(mapped);
    };

    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}
