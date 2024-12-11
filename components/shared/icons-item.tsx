import { Badge } from "../ui/badge";

interface IconsItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  badge?: {
    variant: "default" | "secondary" | "destructive" | "outline";
    className?: string;
  };
}

export default function IconsItem({
  icon,
  label,
  value,
  badge,
}: IconsItemProps) {
  return (
    <div className="flex items-center space-x-3">
      <div className="flex size-10 items-center justify-center rounded-full bg-muted">
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        {badge ? (
          <Badge variant={badge.variant} className={badge.className}>
            {value}
          </Badge>
        ) : (
          <p className="text-base font-semibold">{value}</p>
        )}
      </div>
    </div>
  );
}
