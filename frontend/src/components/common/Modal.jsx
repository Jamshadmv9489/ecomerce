import { useEffect } from "react";

const Modal = ({ isOpen, onClose, title, children, maxWidth = "max-w-md" }) => {

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm">
            <div className={`bg-white rounded-2xl w-full ${maxWidth} max-h-[90vh] overflow-y-auto p-4 sm:p-6 shadow-2xl animate-in fade-in zoom-in duration-200`}>
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <h2 className="text-lg sm:text-xl font-bold text-black">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-black transition-colors p-1"
                    >
                        ✕
                    </button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;