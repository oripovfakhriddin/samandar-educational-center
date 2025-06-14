"use client";

import * as React from "react";

interface SlotProps<T extends HTMLElement = HTMLElement>
  extends React.HTMLAttributes<T> {
  children?: React.ReactElement<any, React.JSXElementConstructor<any>>;
}

const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, ...props }, ref) => {
    if (
      React.isValidElement(children) &&
      typeof children.type !== "string" // faqat komponentalar uchun
    ) {
      const mergedRef = (value: HTMLElement | null) => {
        if (typeof ref === "function") {
          ref(value);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLElement | null>).current = value;
        }

        const childRef = (
          children as React.ReactElement & {
            ref?: React.Ref<HTMLElement>;
          }
        ).ref;

        if (typeof childRef === "function") {
          childRef(value);
        } else if (childRef) {
          (childRef as React.MutableRefObject<HTMLElement | null>).current =
            value;
        }
      };

      return React.cloneElement(children, {
        ...props,
        ...children.props,
        ref: mergedRef,
      });
    }

    if (React.Children.count(children) > 1) {
      throw new Error("Slot expects only a single child.");
    }

    return null;
  }
);

Slot.displayName = "Slot";

export { Slot };
