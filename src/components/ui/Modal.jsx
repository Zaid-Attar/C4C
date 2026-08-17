import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function Modal({ isOpen, onClose, title, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    
    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  // Handle native escape key
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleCancel = (e) => {
      e.preventDefault();
      onClose();
    };
    dialog.addEventListener('cancel', handleCancel);
    return () => dialog.removeEventListener('cancel', handleCancel);
  }, [onClose]);

  return (
    <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle bg-base-300/40 backdrop-blur-sm">
      <div className="modal-box bg-base-100 border border-base-content/10 shadow-2xl rounded-3xl">
        <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">
          <X size={18} />
        </button>
        <h3 className="font-bold text-xl text-base-content tracking-tight mb-6">{title}</h3>
        {children}
      </div>
      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button type="button">close</button>
      </form>
    </dialog>
  );
}
