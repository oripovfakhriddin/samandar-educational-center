"use client";

import * as React from "react";

interface SelectContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SelectContext = React.createContext<SelectContextValue | null>(null);

interface SelectRootProps {
  children?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  required?: boolean;
}

interface SelectTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

interface SelectValueProps extends React.HTMLAttributes<HTMLSpanElement> {
  placeholder?: string;
}

interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  position?: "item-aligned" | "popper";
}

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

interface SelectPortalProps {
  children?: React.ReactNode;
}

interface SelectViewportProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Root = ({
  children,
  value,
  defaultValue,
  onValueChange,
  open,
  defaultOpen,
  onOpenChange,
}: SelectRootProps) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "");
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen || false);

  const isControlledValue = value !== undefined;
  const isControlledOpen = open !== undefined;

  const currentValue = isControlledValue ? value : internalValue;
  const currentOpen = isControlledOpen ? open : internalOpen;

  const handleValueChange = (newValue: string) => {
    if (!isControlledValue) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
    handleOpenChange(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlledOpen) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  return (
    <SelectContext.Provider
      value={{
        value: currentValue,
        onValueChange: handleValueChange,
        open: currentOpen,
        onOpenChange: handleOpenChange,
      }}>
      {children}
    </SelectContext.Provider>
  );
};

const Trigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ children, ...props }, ref) => {
    const context = React.useContext(SelectContext);

    const handleClick = () => {
      context?.onOpenChange(!context.open);
    };

    return (
      <button
        ref={ref}
        type='button'
        role='combobox'
        aria-controls='dropdown-id'
        aria-expanded={context?.open}
        aria-haspopup='listbox'
        data-state={context?.open ? "open" : "closed"}
        onClick={handleClick}
        {...props}>
        {children}
      </button>
    );
  }
);

const Value = React.forwardRef<HTMLSpanElement, SelectValueProps>(
  ({ placeholder, ...props }, ref) => {
    const context = React.useContext(SelectContext);

    return (
      <span ref={ref} {...props}>
        {context?.value || placeholder}
      </span>
    );
  }
);

const Portal = ({ children }: SelectPortalProps) => {
  return <>{children}</>;
};

const Content = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ children, position = "popper", ...props }, ref) => {
    const context = React.useContext(SelectContext);

    if (!context?.open) return null;

    return (
      <div
        ref={ref}
        role='listbox'
        data-state={context.open ? "open" : "closed"}
        {...props}>
        {children}
      </div>
    );
  }
);

const Viewport = React.forwardRef<HTMLDivElement, SelectViewportProps>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

const Item = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ value, disabled, children, ...props }, ref) => {
    const context = React.useContext(SelectContext);

    const handleClick = () => {
      if (disabled) return;
      context?.onValueChange(value);
    };

    const isSelected = context?.value === value;

    return (
      <div
        ref={ref}
        role='option'
        aria-selected={isSelected}
        data-state={isSelected ? "checked" : "unchecked"}
        data-disabled={disabled}
        onClick={handleClick}
        {...props}>
        {children}
      </div>
    );
  }
);

const ItemText = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ children, ...props }, ref) => {
  return (
    <span ref={ref} {...props}>
      {children}
    </span>
  );
});

const ItemIndicator = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ children, ...props }, ref) => {
  return (
    <span ref={ref} {...props}>
      {children}
    </span>
  );
});

const Icon = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ children, ...props }, ref) => {
  return (
    <span ref={ref} {...props}>
      {children}
    </span>
  );
});

const ScrollUpButton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
});

const ScrollDownButton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
});

const Group = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} role='group' {...props}>
      {children}
    </div>
  );
});

const Label = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
});

const Separator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return <div ref={ref} role='separator' {...props} />;
});

Root.displayName = "SelectRoot";
Trigger.displayName = "SelectTrigger";
Value.displayName = "SelectValue";
Content.displayName = "SelectContent";
Item.displayName = "SelectItem";
ItemText.displayName = "SelectItemText";
ItemIndicator.displayName = "SelectItemIndicator";

export {
  Root,
  Trigger,
  Value,
  Portal,
  Content,
  Viewport,
  Item,
  ItemText,
  ItemIndicator,
  Icon,
  ScrollUpButton,
  ScrollDownButton,
  Group,
  Label,
  Separator,
};
