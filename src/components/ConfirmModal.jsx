import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = "Confirm",
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-50 flex items-center justify-center px-6"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-paper dark:bg-ink text-ink dark:text-paper rounded-lg shadow-xl max-w-sm w-full p-6"
          >
            <h3 className="font-display text-lg font-600 mb-2">{title}</h3>
            <p className="text-sm text-ink/60 dark:text-paper/60 mb-6">
              {message}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={onCancel}
                className="px-4 py-2 rounded-md text-sm font-medium text-ink/70 dark:text-paper/70 hover:bg-ink/5 dark:hover:bg-paper/10 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
