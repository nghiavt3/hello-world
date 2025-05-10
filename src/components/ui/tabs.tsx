import React, { createContext, useContext, useState } from 'react';

interface TabsContextProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextProps | null>(null);

interface TabsProps {
  children: React.ReactNode;
  defaultValue: string;
  className?: string;
}

export const Tabs = ({ children, defaultValue, className }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

export const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabs must be used within Tabs component');
  }
  return context;
};

interface TabsListProps {
    children: React.ReactNode;
    className?: string;
  }
  
  export const TabsList = ({ children, className }: TabsListProps) => {
    return <div className={className}>{children}</div>;
  };


interface TabsTriggerProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

export const TabsTrigger = ({ children, value, className }: TabsTriggerProps) => {
  const { activeTab, setActiveTab } = useTabs();
  const isActive = activeTab === value;

  return (
    <button
      className={`${className} ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
};


interface TabsContentProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

export const TabsContent = ({ children, value, className }: TabsContentProps) => {
  const { activeTab } = useTabs();
  return activeTab === value ? <div className={className}>{children}</div> : null;
};
