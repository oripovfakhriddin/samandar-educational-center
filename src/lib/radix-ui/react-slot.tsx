"use client";

import * as React from "react";

type ValidElement<P = Record<string, unknown>> = React.ReactElement<
  P,
  (props: P) => React.ReactElement | null
>;

interface SlotProps<T extends HTMLElement = HTMLElement>
  extends React.HTMLAttributes<T> {
  children?: ValidElement;
}

const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, ...props }, ref) => {
    if (React.isValidElement(children) && typeof children.type !== "string") {
      const mergedRef = (value: HTMLElement | null) => {
        if (typeof ref === "function") {
          ref(value);
        } else if (ref && typeof ref === "object" && ref !== null) {
          (ref as React.MutableRefObject<HTMLElement | null>).current = value;
        }

        const childRef = (
          children as ValidElement & {
            ref?: React.Ref<HTMLElement>;
          }
        ).ref;

        if (typeof childRef === "function") {
          childRef(value);
        } else if (childRef && typeof childRef === "object") {
          (childRef as React.MutableRefObject<HTMLElement | null>).current =
            value;
        }
      };

      const childProps = {
        ...children.props,
        ...props,
        ref: mergedRef,
      };

      return React.cloneElement(children, childProps);
    }

    if (React.Children.count(children) > 1) {
      throw new Error("Slot expects only a single child.");
    }

    return null;
  }
);

Slot.displayName = "Slot";

export { Slot };
