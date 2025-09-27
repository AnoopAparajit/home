// Utility: CSV-escape a cell
function toCsvCell(value) {
  const v = String(value ?? "");
  const needsQuotes = /[",\n]/.test(v);
  const escaped = v.replace(/"/g, '""');
  return needsQuotes ? `"${escaped}"` : escaped;
}

// Build a CSV string with one header row and one data row
function buildCsv(headers, row) {
  const headerLine = headers.map(toCsvCell).join(",");
  const rowLine = row.map(toCsvCell).join(",");
  return headerLine + "\n" + rowLine + "\n";
}

// Handle form submit: build CSV and trigger client-side download
document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const username = (document.getElementById("username").value || "").trim();
  const password = (document.getElementById("password").value || "").trim();

  // NOTE: This is a demo for static sites; do not store real passwords this way.
  const headers = ["timestamp_iso", "username", "password"];
  const row = [new Date().toISOString(), username, password];
  const csv = buildCsv(headers, row);

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const filename = `login_${new Date().toISOString().replace(/[:.]/g, "-")}.csv`;

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});
