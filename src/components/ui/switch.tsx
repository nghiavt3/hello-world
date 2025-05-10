import { useState } from "react";

interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function Switch({ checked = false, onCheckedChange }: SwitchProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const toggleSwitch = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    if (onCheckedChange) {
      onCheckedChange(newState);
    }
  };

  return (
    <button
      className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 transition-colors ${
        isChecked ? "bg-blue-500" : "bg-gray-300"
      }`}
      onClick={toggleSwitch}
    >
      <div
        className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
          isChecked ? "translate-x-6" : "translate-x-0"
        }`}
      ></div>
    </button>
  );
}
