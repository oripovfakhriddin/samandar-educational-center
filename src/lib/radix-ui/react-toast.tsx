"use client";

import * as React from "react";

interface ToastContextValue {
  toasts: ToastData[];
  addToast: (toast: Omit<ToastData, "id">) => string;
  removeToast: (id: string) => void;
  updateToast: (id: string, toast: Partial<ToastData>) => void;
}

interface ToastData {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  duration?: number;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

interface ToastProviderProps {
  children?: React.ReactNode;
  swipeDirection?: "right" | "left" | "up" | "down";
  swipeThreshold?: number;
  duration?: number;
}

interface ToastRootProps extends React.HTMLAttributes<HTMLLIElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  duration?: number;
  children?: React.ReactNode;
}

interface ToastViewportProps extends React.HTMLAttributes<HTMLOListElement> {
  children?: React.ReactNode;
}

interface ToastTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

interface ToastDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

interface ToastActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  altText: string;
  children?: React.ReactNode;
}

interface ToastCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const Provider = ({ children, duration = 5000 }: ToastProviderProps) => {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);

  const addToast = React.useCallback(
    (toast: Omit<ToastData, "id">) => {
      const id = Math.random().toString(36).substr(2, 9);
      const newToast: ToastData = {
        ...toast,
        id,
        open: true,
      };

      setToasts((prev) => [...prev, newToast]);

      // Auto remove after duration
      if (toast.duration !== Number.POSITIVE_INFINITY) {
        setTimeout(() => {
          removeToast(id);
        }, toast.duration || duration);
      }

      return id;
    },
    [duration]
  );

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

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
      value={{
        toasts,
        addToast,
        removeToast,
        updateToast,
      }}>
      {children}
    </ToastContext.Provider>
  );
};

const Viewport = React.forwardRef<HTMLOListElement, ToastViewportProps>(
  ({ children, ...props }, ref) => {
    return (
      <ol ref={ref} tabIndex={-1} {...props}>
        {children}
      </ol>
    );
  }
);

const Root = React.forwardRef<HTMLLIElement, ToastRootProps>(
  ({ open = true, onOpenChange, duration, children, ...props }, ref) => {
    React.useEffect(() => {
      if (duration && duration !== Number.POSITIVE_INFINITY) {
        const timer = setTimeout(() => {
          onOpenChange?.(false);
        }, duration);

        return () => clearTimeout(timer);
      }
    }, [duration, onOpenChange]);

    if (!open) return null;

    return (
      <li
        ref={ref}
        role='status'
        aria-live='polite'
        aria-atomic='true'
        tabIndex={0}
        data-state={open ? "open" : "closed"}
        {...props}>
        {children}
      </li>
    );
  }
);

const Title = React.forwardRef<HTMLDivElement, ToastTitleProps>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

const Description = React.forwardRef<HTMLDivElement, ToastDescriptionProps>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

const Action = React.forwardRef<HTMLButtonElement, ToastActionProps>(
  ({ altText, children, ...props }, ref) => {
    return (
      <button ref={ref} aria-label={altText} {...props}>
        {children}
      </button>
    );
  }
);

const Close = React.forwardRef<HTMLButtonElement, ToastCloseProps>(
  ({ children, ...props }, ref) => {
    return (
      <button ref={ref} type='button' {...props}>
        {children}
      </button>
    );
  }
);

Provider.displayName = "ToastProvider";
Viewport.displayName = "ToastViewport";
Root.displayName = "ToastRoot";
Title.displayName = "ToastTitle";
Description.displayName = "ToastDescription";
Action.displayName = "ToastAction";
Close.displayName = "ToastClose";

export { Provider, Viewport, Root, Title, Description, Action, Close };
