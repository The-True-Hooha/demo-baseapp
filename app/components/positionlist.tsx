import { ExternalLink, TrendingUp, TrendingDown } from "lucide-react";

interface Position {
  protocol: string;
  type: "lending" | "liquidity" | "staking" | "vault";
  token: string;
  amount: number;
  value: number;
  apy: number;
  change24h: number;
  address: string;
}

interface Props {
  positions: Position[];
}

export function PositionsList({ positions }: Props) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "lending":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "liquidity":
        return "bg-green-100 text-green-800 border-green-200";
      case "staking":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "vault":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const getProtocolEmoji = (protocol: string) => {
    switch (protocol.toLowerCase()) {
      case "aave":
        return "🏦";
      case "uniswap":
        return "🦄";
      case "uniswap v3":
        return "🦄";
      case "compound":
        return "🏛️";
      case "native":
        return "⚡";
      case "wallet":
        return "💰";
      default:
        return "📊";
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-slate-900">Your Positions</h3>

      <div className="space-y-4">
        {positions.map((position, index) => {
          const isPositive = position.change24h >= 0;
          const changeColor = isPositive ? "text-green-600" : "text-red-600";
          const ChangeIcon = isPositive ? TrendingUp : TrendingDown;

          return (
            <div
              key={`${position.protocol}-${position.token}-${index}`}
              className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">
                    {getProtocolEmoji(position.protocol)}
                  </span>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-bold text-xl text-slate-900">
                        {position.token}
                      </h4>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTypeColor(position.type)}`}
                      >
                        {position.type}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 font-medium">
                      {position.protocol}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (position.address !== "0x") {
                      window.open(
                        `https://basescan.org/address/${position.address}`,
                        "_blank",
                      );
                    }
                  }}
                  className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-50 rounded-lg"
                  disabled={position.address === "0x"}
                >
                  <ExternalLink className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-xl font-bold text-slate-900">
                    {position.amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 6,
                    })}
                  </div>
                  <div className="text-sm text-slate-600 font-medium">
                    Amount
                  </div>
                </div>

                <div>
                  <div className="text-xl font-bold text-slate-900">
                    $
                    {position.value.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  <div className="text-sm text-slate-600 font-medium">
                    Value
                  </div>
                </div>

                <div>
                  <div className={`flex items-center gap-2 ${changeColor}`}>
                    <ChangeIcon className="h-4 w-4" />
                    <span className="font-bold text-lg">
                      {isPositive ? "+" : ""}
                      {position.change24h.toFixed(2)}%
                    </span>
                  </div>
                  <div className="text-sm text-slate-600 font-medium">
                    24h Change
                  </div>
                </div>
              </div>

              {position.apy > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 font-medium">
                      Annual Percentage Yield
                    </span>
                    <span className="text-lg font-bold text-green-600">
                      {position.apy.toFixed(2)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {positions.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            <div className="text-6xl mb-6">📊</div>
            <p className="text-xl font-semibold mb-2">
              No DeFi positions found
            </p>
            <p className="text-sm">
              Start using DeFi protocols on Base to see your portfolio here!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
