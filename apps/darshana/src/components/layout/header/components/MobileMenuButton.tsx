type MobileMenuButtonProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export function MobileMenuButton({ isOpen, onToggle }: MobileMenuButtonProps) {
  return (
    <button type="button" onClick={onToggle}
      aria-label={isOpen ? "Close menu" : "Open menu"} aria-expanded={isOpen} aria-controls="primary-navigation"
      className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 lg:hidden">
      <span aria-hidden="true">
        {isOpen ? "✕" : "☰"}
      </span>
    </button>
  );
}