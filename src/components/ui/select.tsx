import React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

/***
 * Reference: https://www.radix-ui.com/primitives/docs/components/select#with-a-placeholder
 * Usage:
 * <Select placeholder="xxx" defaultValue="1">
 *  <SelectItem value="1">Item 1</SelectItem>
 *  <SelectItem value="2">Item 2</SelectItem>
 *  <SelectItem value="3">Item 3</SelectItem>
 *</Select>
 */
interface SelectProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> {
  placeholder?: string; // Add placeholder as an optional prop
  children?: React.ReactNode; // Children can be React elements, strings, etc.
  id: string
}

const Select = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectProps
>(({ children, placeholder, id, ...props }, forwardedRef) => (
  <SelectPrimitive.Root {...props}>
    <SelectPrimitive.Trigger
      ref={forwardedRef}
      id={id}
      className="flex justify-between items-center h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 dark:focus-visible:ring-gray-500"
    >
      <SelectPrimitive.Value placeholder={placeholder} />
      <SelectPrimitive.Icon>
        <ChevronDownIcon className="text-gray-600 dark:text-gray-200" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] dark:bg-gray-700">
        <SelectPrimitive.ScrollUpButton className="flex items-center justify-center h-9 bg-white dark:bg-gray-600 cursor-default">
          <ChevronUpIcon className="text-gray-600 dark:text-gray-100" />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="flex items-center justify-center h-9 bg-white dark:bg-gray-600 cursor-default">
          <ChevronDownIcon className="text-gray-600 dark:text-gray-100" />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  </SelectPrimitive.Root>

));

type SelectItemProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Item
>;
export const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <SelectPrimitive.Item
      // biome-ignore lint/a11y/useSemanticElements: <explanation>
      role="option"
      className={cn(
        "text-sm leading-none rounded-[3px] flex items-center h-9 pr-[35px] pl-[25px] relative select-none",
        // Dark and light theme support
        "text-gray-900 dark:text-gray-100", // Default text color (light/dark mode)
        "data-[disabled]:text-gray-400 dark:data-[disabled]:text-gray-500", // Disabled state text color
        "data-[highlighted]:bg-neutral-100 dark:data-[highlighted]:bg-gray-700", // Highlighted state background color
        "data-[highlighted]:text-black dark:data-[highlighted]:text-white", // Highlighted state text color
        "data-[disabled]:pointer-events-none", // Disabled state pointer events
        className // Allow for external class name overrides
      )}
      {...props}
      ref={forwardedRef}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>

  );
});

export default Select;
