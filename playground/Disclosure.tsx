import React, { useState, useId } from "react";

interface DisclosureProps {
  title: string;
  children: React.ReactNode;
}

export const Disclosure: React.FC<DisclosureProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();

  return (
    <div className="border rounded-md my-2">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full text-left px-4 py-3 bg-gray-100 font-semibold flex justify-between items-center"
      >
        {title}
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <div id={contentId} className="p-4 bg-white border-t">
          {children}
        </div>
      )}
    </div>
  );
};