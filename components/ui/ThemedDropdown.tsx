"use client";

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useTheme } from "@/components/ThemeProvider";

interface DropdownOption {
  key: string;
  label: string;
}

interface ThemedDropdownProps {
  options: DropdownOption[];
  selectedKey: string;
  onSelectionChange: (key: string) => void;
  ariaLabel?: string;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  isDisabled?: boolean;
}

export default function ThemedDropdown({
  options,
  selectedKey,
  onSelectionChange,
  ariaLabel = "Dropdown menu",
  placeholder,
  size = "md",
  isDisabled = false,
}: ThemedDropdownProps) {
  const { theme } = useTheme();

  const selectedLabel = options.find(option => option.key === selectedKey)?.label || placeholder || options[0]?.label;

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-3 text-sm",
    lg: "px-6 py-4 text-base",
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="bordered"
          endContent={<ChevronDownIcon className="h-4 w-4" />}
          className={`${sizeClasses[size]} rounded-lg shadow-lg border`}
          style={{
            backgroundColor: theme === "dark" ? '#1a1a1a' : '#ffffff',
            borderColor: theme === "dark" ? '#1f2937' : '#e5e7eb',
            color: theme === "dark" ? '#ffffff' : '#111827',
          }}
          isDisabled={isDisabled}
          disableRipple
        >
          {selectedLabel}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label={ariaLabel}
        items={options}
        onAction={(key) => onSelectionChange(key as string)}
        className="rounded-lg !shadow-lg"
        style={{
          backgroundColor: theme === "dark" ? '#1a1a1a' : '#ffffff',
          borderColor: theme === "dark" ? '#1f2937' : '#e5e7eb',
        }}
      >
        {(item) => (
          <DropdownItem
            key={item.key}
            className="px-7 py-2"
            classNames={{
              base: theme === "dark" 
                ? "hover:!bg-gray-800 data-[hover=true]:!bg-gray-800" 
                : "hover:!bg-gray-100 data-[hover=true]:!bg-gray-100"
            }}
            style={{
              color: theme === "dark" ? '#d1d5db' : '#374151',
            }}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
