import { createContext, useContext, useEffect, useId } from "react";

//! COMPOUND COMPONENT FOR MODEL
const ModalCtx = createContext(null);

function useModalCtx() {
  const ctx = useContext(ModalCtx);
  if (!ctx) throw new Error("Modal.* must be used inside <Modal>");
  return ctx;
}

function useLockBodyScroll(isOpen) {
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; };
  }, [isOpen]);
}

const Modal = ({ isOpen, onClose, children, lockScroll = true }) => {
  const titleId = useId();

  // esc to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // lock scroll when open
  if(lockScroll) useLockBodyScroll(isOpen);

  if (!isOpen) return null;

  return (
    <ModalCtx.Provider value={{ isOpen, onClose, titleId }}>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {children}
      </div>
    </ModalCtx.Provider>
  );
};

/* Subcomponents */

Modal.Overlay = function Overlay({ className = "bg-black/50 backdrop-blur-sm", onClick }) {
  const { onClose } = useModalCtx();
  return (
    <div
      onClick={onClick ?? onClose}
      className={`absolute inset-0 ${className}`}
    />
  );
};

Modal.Content = function Content({ className = "", children, onClick }) {
  const { titleId } = useModalCtx();
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={(e) => {
        // prevent closing when clicking inside the panel
        e.stopPropagation();
        onClick?.(e);
      }}
      className={[
        "relative mx-4 w-full max-w-lg rounded-lg bg-white p-6 shadow-lg",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
};

Modal.Header = function Header({ className = "", children }) {
  return (
    <div className={["mb-4 flex items-start justify-between gap-4", className].join(" ")}>
      {children}
    </div>
  );
};

Modal.Title = function Title({ children, className = "" }) {
  const { titleId } = useModalCtx();
  return (
    <h2 id={titleId} className={["text-lg font-semibold text-gray-800", className].join(" ")}>
      {children}
    </h2>
  );
};

Modal.Body = function Body({ className = "", children }) {
  return <div className={["text-gray-700", className].join(" ")}>{children}</div>;
};

Modal.Footer = function Footer({ className = "", children }) {
  return (
    <div className={["mt-6 flex items-center justify-end gap-2", className].join(" ")}>
      {children}
    </div>
  );
};

Modal.Close = function Close({ className = "", children = "✕", ariaLabel = "Close modal" }) {
  const { onClose } = useModalCtx();
  return (
    <button
      onClick={onClose}
      aria-label={ariaLabel}
      className={[
        "text-gray-400 hover:text-red-600 hover:scale-105 transition-all",
        "absolute right-3 top-3",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
};

export default Modal;
