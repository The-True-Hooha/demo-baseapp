import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Props {
  sentiment: "bullish" | "bearish" | "neutral";
  mentions: number;
  className?: string;
}

export function SocialSentiment({
  sentiment,
  mentions,
  className = "",
}: Props) {
  const getSentimentData = () => {
    switch (sentiment) {
      case "bullish":
        return {
          icon: TrendingUp,
          color: "text-green-400 bg-green-400/20",
          label: "Bullish",
          emoji: "🚀",
        };
      case "bearish":
        return {
          icon: TrendingDown,
          color: "text-red-400 bg-red-400/20",
          label: "Bearish",
          emoji: "📉",
        };
      default:
        return {
          icon: Minus,
          color: "text-gray-400 bg-gray-400/20",
          label: "Neutral",
          emoji: "😐",
        };
    }
  };

  const { icon: Icon, color, label, emoji } = getSentimentData();

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${color} ${className}`}
    >
      <Icon className="h-4 w-4" />
      <span className="text-sm font-semibold">
        {emoji} {label}
      </span>
      {mentions > 0 && <span className="text-xs opacity-75">({mentions})</span>}
    </div>
  );
}
