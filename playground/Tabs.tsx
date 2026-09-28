import React, { useState, useRef, KeyboardEvent } from "react";

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  defaultTabId?: string;
}

export const Tabs: React.FC<TabsProps> = ({ items, defaultTabId }) => {
  const [activeTab, setActiveTab] = useState(defaultTabId || items[0]?.id);
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;
    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % items.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + items.length) % items.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = items.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    const nextTab = items[nextIndex];
    setActiveTab(nextTab.id);
    tabRefs.current[nextTab.id]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Playground Tabs" className="flex border-b">
        {items.map((tab, idx) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => (tabRefs.current[tab.id] = el)}
              role="tab"
              aria-selected={isSelected}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`px-4 py-2 font-medium ${
                isSelected ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {items.map((tab) => {
        const isSelected = activeTab === tab.id;
        return (
          <div
            key={tab.id}
            id={`panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            hidden={!isSelected}
            tabIndex={0}
            className="p-4"
          >
            {tab.content}
          </div>
        );
      })}
    </div>
  );
};