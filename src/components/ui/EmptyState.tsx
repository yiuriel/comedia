import type { ReactNode } from "react";

interface Props {
  icon?: ReactNode;
  title: string;
  description?: string;
}

export default function EmptyState({ icon, title, description }: Props) {
  return (
    <div className="text-center py-16">
      {icon && <div className="mb-3 text-gray-300 flex justify-center">{icon}</div>}
      <p className="text-lg text-gray-400">{title}</p>
      {description && <p className="text-sm text-gray-300 mt-1">{description}</p>}
    </div>
  );
}
