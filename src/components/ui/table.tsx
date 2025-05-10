export function Table({ children }: { children: React.ReactNode }) {
  return <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">{children}</table>;
}

Table.Head = function TableHead({ children }: { children: React.ReactNode }) {
  return <thead className="bg-gray-100">{children}</thead>;
};

Table.Body = function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
};

Table.Row = function TableRow({ children }: { children: React.ReactNode }) {
  return <tr className="border-b last:border-none">{children}</tr>;
};

Table.Cell = function TableCell({ children, header = false }: { children: React.ReactNode; header?: boolean }) {
  return header ? (
    <th className="px-4 py-2 text-left font-semibold text-gray-700">{children}</th>
  ) : (
    <td className="px-4 py-2">{children}</td>
  );
};