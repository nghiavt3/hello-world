interface ModalProps {
    open: boolean;
    style?: React.CSSProperties;
    onClose: () => void;
    onSave?: ()=>void;
    children: React.ReactNode;
  }
  
  export function Modal({ open,style, onClose,onSave, children,...props }: ModalProps) {
    if (!open) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" style={style} {...props}>
        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
          {children}
      {onSave ? (
         <button
         onClick={onSave}
         className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg"
       >
         Save
       </button>
      ):(<div></div>)}
         

          <button
            onClick={onClose}
            className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    );
  }
  