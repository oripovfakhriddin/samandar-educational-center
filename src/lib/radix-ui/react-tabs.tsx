"use client";

import * as React from "react";

interface TabsContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

interface TabsRootProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  children?: React.ReactNode;
}

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children?: React.ReactNode;
}

const Root = React.forwardRef<HTMLDivElement, TabsRootProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      orientation = "horizontal",
      children,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(
      defaultValue || ""
    );
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const handleValueChange = (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      if (onValueChange) {
        onValueChange(newValue);
      }
    };

    return (
      <TabsContext.Provider
        value={{
          value: currentValue,
          onValueChange: handleValueChange,
          orientation,
        }}>
        <div ref={ref} data-orientation={orientation} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

const List = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ children, ...props }, ref) => {
    const context = React.useContext(TabsContext);

    return (
      <div
        ref={ref}
        role='tablist'
        aria-orientation={context?.orientation}
        data-orientation={context?.orientation}
        {...props}>
        {children}
      </div>
    );
  }
);

const Trigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, disabled, children, ...props }, ref) => {
    const context = React.useContext(TabsContext);
    const isSelected = context?.value === value;

    const handleClick = () => {
      if (disabled) return;
      if (context?.onValueChange) {
        context.onValueChange(value);
      }
    };

    return (
      <button
        ref={ref}
        type='button'
        role='tab'
        id={`trigger-${value}`}
        aria-selected={isSelected}
        aria-controls={`content-${value}`}
        data-state={isSelected ? "active" : "inactive"}
        data-orientation={context?.orientation}
        disabled={disabled}
        onClick={handleClick}
        {...props}>
        {children}
      </button>
    );
  }
);

const Content = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, children, ...props }, ref) => {
    const context = React.useContext(TabsContext);
    const isSelected = context?.value === value;

    if (!isSelected) return null;

    return (
      <div
        ref={ref}
        role='tabpanel'
        id={`content-${value}`}
        aria-labelledby={`trigger-${value}`}
        data-state={isSelected ? "active" : "inactive"}
        data-orientation={context?.orientation}
        {...props}>
        {children}
      </div>
    );
  }
);

// Display name'lar
Root.displayName = "TabsRoot";
List.displayName = "TabsList";
Trigger.displayName = "TabsTrigger";
Content.displayName = "TabsContent";

// Eksport
export { Root, List, Trigger, Content };
