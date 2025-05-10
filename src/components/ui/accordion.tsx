import { useState } from "react";

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  style?: React.CSSProperties; // Thêm hỗ trợ style
}

export function Accordion({ children, style }: AccordionProps) {
  return <div className="space-y-2" style={style}>{children}</div>;
}

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  children: React.ReactNode;
  style?: React.CSSProperties; // Thêm hỗ trợ style
}

Accordion.Item = function AccordionItem({ title, children,style }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-300 rounded-lg">
      <button
        className="w-full text-left p-4 font-semibold bg-gray-100 hover:bg-gray-200" style={style}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </button>
      {isOpen && <div className="p-4 border-t border-gray-300">{children}</div>}
    </div>
  );
};
