import {
  createPortal,
  forwardRef,
  type ForwardedRef,
  type ReactNode,
} from "preact/compat";
import clsx from "clsx";

interface BaseProps {
  className?: string;
  [key: string]: unknown;
}

export const Button = forwardRef(
  (
    {
      className,
      active,
      reversed,
      ...props
    }: {
      active: boolean;
      reversed: boolean;
    } & BaseProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => (
    <button
      {...props}
      ref={ref}
      className={clsx("p-1 rounded-lg", className, {
        "bg-green-500/15 text-green-500": active,
      })}
    />
  )
);

export const EditorValue = forwardRef(
  (
    {
      className,
      value,
      ...props
    }: {
      value: any;
    } & BaseProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const textLines = value.document.nodes
      .map((node: any) => node.text)
      .join("\n");
    return (
      <div ref={ref} {...props} className={clsx(className, "mt-8 mb-0 -mx-5")}>
        <div className="text-sm px-5 py-1.5 text-green-500 border-t-2 border-t-gray-50 bg-white">
          Slate's value as text
        </div>
        <div className="text-green-500 text-sm font-mono py-2.5 px-5">
          {textLines}
        </div>
      </div>
    );
  }
);

export const Instruction = forwardRef(
  ({ className, ...props }: BaseProps, ref: ForwardedRef<HTMLDivElement>) => (
    <div
      {...props}
      ref={ref}
      className={clsx(
        className,
        "whitespace-pre-wrap m-0 -mx-5 mb-2.5 p-2.5 text-sm bg-[#f8f8e8]"
      )}
    />
  )
);

export const Menu = forwardRef(
  ({ className, ...props }: BaseProps, ref: ForwardedRef<HTMLDivElement>) => (
    <div
      {...props}
      data-test-id="menu"
      ref={ref}
      className={clsx(className, "[&>*]:inline-block")}
    />
  )
);

export const Portal = ({ children }: { children?: ReactNode }) => {
  return typeof document === "object"
    ? createPortal(children, document.body)
    : null;
};

export const Toolbar = forwardRef(
  ({ className, ...props }: BaseProps, ref: ForwardedRef<HTMLDivElement>) => (
    <Menu
      {...props}
      ref={ref}
      className={clsx(
        className,
        "relative p-1.5 -mx-5 space-x-1 border-b-2 border-gray-200 mb-5"
      )}
    />
  )
);
