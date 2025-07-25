import { TrendingUp, Zap, BarChart3, Users } from "lucide-react";

type FilterType = "trending" | "new" | "active" | "social";

interface Props {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function FilterTabs({ currentFilter, onFilterChange }: Props) {
  const filters = [
    {
      id: "trending" as FilterType,
      label: "Trending",
      icon: TrendingUp,
      color: "text-green-400",
    },
    {
      id: "new" as FilterType,
      label: "New",
      icon: Zap,
      color: "text-blue-400",
    },
    {
      id: "active" as FilterType,
      label: "Active",
      icon: BarChart3,
      color: "text-purple-400",
    },
    {
      id: "social" as FilterType,
      label: "Social",
      icon: Users,
      color: "text-pink-400",
    },
  ];

  return (
    <div className="bg-white/10 rounded-lg p-1">
      <div className="grid grid-cols-4 gap-1">
        {filters.map(({ id, label, icon: Icon, color }) => (
          <button
            key={id}
            onClick={() => onFilterChange(id)}
            className={`py-2 px-3 rounded-md flex flex-col items-center gap-1 transition-colors ${
              currentFilter === id
                ? "bg-white text-purple-900 font-semibold"
                : "text-white hover:bg-white/10"
            }`}
          >
            <Icon
              className={`h-4 w-4 ${currentFilter === id ? "text-purple-900" : color}`}
            />
            <span className="text-xs">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
