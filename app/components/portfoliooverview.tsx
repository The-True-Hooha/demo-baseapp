import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  RefreshCw,
  Clock,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Props {
  portfolio: {
    totalValue: number;
    totalChange24h: number;
    positions: any[];
    lastUpdated: number;
  };
  onRefresh: () => void;
  refreshing: boolean;
}

export function PortfolioOverview({ portfolio, onRefresh, refreshing }: Props) {
  const isPositive = portfolio.totalChange24h >= 0;
  const changeColor = isPositive ? "text-green-600" : "text-red-600";
  const changeIcon = isPositive ? TrendingUp : TrendingDown;
  const ChangeIcon = changeIcon;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900">Portfolio Value</h2>
        <button
          onClick={onRefresh}
          disabled={refreshing}
          className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-50 rounded-lg"
        >
          <RefreshCw
            className={`h-5 w-5 ${refreshing ? "animate-spin" : ""}`}
          />
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="h-6 w-6 text-slate-700" />
            <span className="text-4xl font-bold text-slate-900">
              $
              {portfolio.totalValue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>

          <div className={`flex items-center gap-2 ${changeColor}`}>
            <ChangeIcon className="h-5 w-5" />
            <span className="font-semibold text-lg">
              {isPositive ? "+" : ""}
              {portfolio.totalChange24h.toFixed(2)}%
            </span>
            <span className="text-sm text-slate-500">24h</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900">
              {portfolio.positions.length}
            </div>
            <div className="text-sm text-slate-600 font-medium">
              Active Positions
            </div>
          </div>

          <div className="text-center">
            <div className="text-lg font-bold text-slate-900">
              {formatDistanceToNow(portfolio.lastUpdated, { addSuffix: true })}
            </div>
            <div className="text-sm text-slate-600 font-medium">
              Last Updated
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
