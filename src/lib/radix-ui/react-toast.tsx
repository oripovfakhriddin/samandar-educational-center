"use client";

import * as React from "react";

// Toast elementining umumiy ma'lumotlari
interface ToastData {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  duration?: number;
}

// Kontekst qiymatining tipi
interface ToastContextValue {
  toasts: ToastData[];
  addToast: (toast: Omit<ToastData, "id">) => string;
  removeToast: (id: string) => void;
  updateToast: (id: string, toast: Partial<ToastData>) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

// Provider komponenti uchun props
interface ToastProviderProps {
  children: React.ReactNode;
  swipeDirection?: "right" | "left" | "up" | "down";
  swipeThreshold?: number;
  duration?: number;
}

// ToastRootProps tipida yana qo‘shimcha `open`, `onOpenChange`, `duration` mavjud
interface ToastRootProps extends React.HTMLAttributes<HTMLLIElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  duration?: number;
}

interface ToastActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  altText: string;
}

const Provider: React.FC<ToastProviderProps> = ({
  children,
  duration = 5000,
}) => {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = React.useCallback(
    (toast: Omit<ToastData, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastData = {
        ...toast,
        id,
        open: true,
      };
      setToasts((prev) => [...prev, newToast]);

      if (toast.duration !== Number.POSITIVE_INFINITY) {
        setTimeout(() => removeToast(id), toast.duration ?? duration);
      }

      return id;
    },
    [duration, removeToast]
  );

  const updateToast = React.useCallback(
    (id: string, updates: Partial<ToastData>) => {
      setToasts((prev) =>
        prev.map((toast) =>
          toast.id === id ? { ...toast, ...updates } : toast
        )
      );
    },
    []
  );

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, updateToast }}>
      {children}
    </ToastContext.Provider>
  );
};

const Viewport = React.forwardRef<
  HTMLOListElement,
  React.HTMLAttributes<HTMLOListElement>
>(({ children, ...props }, ref) => (
  <ol ref={ref} tabIndex={-1} {...props}>
    {children}
  </ol>
));

const Root = React.forwardRef<HTMLLIElement, ToastRootProps>(
  ({ open = true, onOpenChange, duration, children, ...props }, ref) => {
    React.useEffect(() => {
      if (open && duration && duration !== Number.POSITIVE_INFINITY) {
        const timer = setTimeout(() => {
          onOpenChange?.(false);
        }, duration);
        return () => clearTimeout(timer);
      }
    }, [open, duration, onOpenChange]);

    if (!open) return null;

    return (
      <li
        ref={ref}
        role='status'
        aria-live='polite'
        aria-atomic='true'
        tabIndex={0}
        data-state='open'
        {...props}>
        {children}
      </li>
    );
  }
);

const Title = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => (
  <div ref={ref} {...props}>
    {children}
  </div>
));

const Description = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => (
  <div ref={ref} {...props}>
    {children}
  </div>
));

const Action = React.forwardRef<HTMLButtonElement, ToastActionProps>(
  ({ altText, children, ...props }, ref) => (
    <button ref={ref} aria-label={altText} {...props}>
      {children}
    </button>
  )
);

const Close = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...props }, ref) => (
  <button ref={ref} type='button' {...props}>
    {children}
  </button>
));

// Display name'lar
Provider.displayName = "ToastProvider";
Viewport.displayName = "ToastViewport";
Root.displayName = "ToastRoot";
Title.displayName = "ToastTitle";
Description.displayName = "ToastDescription";
Action.displayName = "ToastAction";
Close.displayName = "ToastClose";

// Eksport
export {
  Provider,
  Viewport,
  Root,
  Title,
  Description,
  Action,
  Close,
  ToastContext,
  type ToastData,
};
