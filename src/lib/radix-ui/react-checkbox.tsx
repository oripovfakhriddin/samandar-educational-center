"use client";

import * as React from "react";

interface CheckboxRootProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
}

interface CheckboxIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

const Root = React.forwardRef<HTMLButtonElement, CheckboxRootProps>(
  (
    { checked, defaultChecked, onCheckedChange, disabled, children, ...props },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = React.useState(
      defaultChecked || false
    );
    const isControlled = checked !== undefined;
    const checkedValue = isControlled ? checked : internalChecked;

    const handleClick = () => {
      if (disabled) return;

      const newChecked = !checkedValue;
      if (!isControlled) {
        setInternalChecked(newChecked);
      }
      onCheckedChange?.(newChecked);
    };

    return (
      <button
        ref={ref}
        type='button'
        role='checkbox'
        aria-checked={checkedValue}
        data-state={checkedValue ? "checked" : "unchecked"}
        disabled={disabled}
        onClick={handleClick}
        {...props}>
        {children}
      </button>
    );
  }
);

const Indicator = React.forwardRef<HTMLSpanElement, CheckboxIndicatorProps>(
  ({ children, ...props }, ref) => {
    return (
      <span ref={ref} {...props}>
        {children}
      </span>
    );
  }
);

Root.displayName = "CheckboxRoot";
Indicator.displayName = "CheckboxIndicator";

export { Root, Indicator };
export * as Checkbox from "./react-checkbox";
