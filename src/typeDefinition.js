// Type Definition.
// 1. The system must apply Tailwind.
// 2. The system must have an empty table element prepared.
// 3. Two arrays are required to generate the table.
// 3.1. Data Array.
// 3.2. An array of objects that characterizes the columns.
// 3.3. A function for formatting column data, optionally.

/* 
type columnObject = {
  columnLabel: string,
  accessor: string,
  formatFunction: (info: number | string) => string,
};

type columnsArray = columnObject[];
 */

const columnsArray = [
  { columnLabel: "Total Invested", accessor: "investedAmouint" },
  { columnLabel: "Monthly Profitably", accessor: "interestReturns" },
  { columnLabel: "Total Profitably", accessor: "totalInterestReturns" },
  { columnLabel: "month", accessor: "moth" },
  { columnLabel: "Total Amount", accessor: "totalAmount" },
];
