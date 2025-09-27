interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  active?: boolean;
  className?: string;
}

export function Button({
  onClick,
  children,
  type = "button",
  active = true,
  className,
  ...props
}: ButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (!onClick) return;

    if (type === "button") {
      e.stopPropagation();
      e.preventDefault();
    }
    onClick();
  };

  return (
    <button
      className={`
        flex justify-center items-center
        w-full text-left px-3 py-2 rounded-lg text-gray-700 text-sm transition-colors duration-200
        ${active ? "bg-blue-600 text-white" : "hover:bg-gray-50"}
        ${className}
      `}
      onClick={handleClick}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
