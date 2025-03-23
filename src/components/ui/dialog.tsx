type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function Dialog({ open, onClose, children }: Props) {
  if (!open) {
    return null;
  }

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-background/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0 z-50 flex items-center justify-center"
      onClick={handleOverlayClick}
    >
      {children}
    </div>
  );
}
