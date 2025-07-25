import {
  PieChart,
  TrendingUp,
  Play,
  Wallet,
  BarChart3,
  Users,
  Zap,
  Share2,
  ExternalLink,
} from "lucide-react";

interface Props {
  onTryDemo: () => void;
}

export function PortfolioPreview({ onTryDemo }: Props) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">
          Professional DeFi Portfolio Tracking
        </h2>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Monitor your Aave, Uniswap, and other DeFi positions with
          institutional-grade analytics and real-time performance tracking.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onTryDemo}
            className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-lg font-semibold text-lg flex items-center justify-center gap-3 transition-colors"
          >
            <Play className="h-6 w-6" />
            Try Interactive Demo
          </button>

          <button
            onClick={() =>
              document
                .querySelector("#connect-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-slate-900 hover:bg-slate-800 text-white py-4 px-8 rounded-lg font-semibold text-lg flex items-center justify-center gap-3 transition-colors"
          >
            <Wallet className="h-6 w-6" />
            Connect Wallet
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-xl p-8 border border-slate-200 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Real-Time Analytics
          </h3>
          <p className="text-slate-600">
            Live portfolio tracking with 24h performance, APY monitoring, and
            protocol-specific insights across Base ecosystem.
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 border border-slate-200 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Share2 className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Social Integration
          </h3>
          <p className="text-slate-600">
            Share portfolio performance on Farcaster with custom embeds, driving
            engagement and discovery.
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 border border-slate-200 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Zap className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            Zero Dependencies
          </h3>
          <p className="text-slate-600">
            Direct blockchain integration using public Base RPC. No API keys,
            subscriptions, or external dependencies required.
          </p>
        </div>
      </div>

      {/* Portfolio Sample */}
      <div className="bg-white rounded-xl border border-slate-200 p-8 mb-12">
        <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
          Portfolio Dashboard Preview
        </h3>

        <div className="bg-slate-50 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-600 font-medium">
              Total Portfolio Value
            </span>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-4xl font-bold text-slate-900 mb-2">
            $15,847.32
          </div>
          <div className="text-green-600 font-semibold">+5.7% (24h)</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: "🏦", name: "Aave USDC", value: "$8,500", apy: "4.2% APY" },
            {
              icon: "⚡",
              name: "ETH Staking",
              value: "2.08 ETH",
              change: "+12.4%",
            },
            {
              icon: "🦄",
              name: "Uniswap LP",
              value: "ETH/USDC",
              apy: "8.7% APY",
            },
            {
              icon: "🏛️",
              name: "Compound",
              value: "0.85 WETH",
              apy: "2.8% APY",
            },
          ].map((position, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-lg p-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{position.icon}</span>
                <span className="font-semibold text-slate-900">
                  {position.name}
                </span>
              </div>
              <div className="text-sm text-slate-600">
                {position.value} • {position.apy || position.change}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Protocols */}
      <div className="text-center mb-12">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">
          Supported Protocols
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            "🏦 Aave",
            "🦄 Uniswap",
            "🏛️ Compound",
            "⚡ Native ETH",
            "💰 ERC20 Tokens",
          ].map((protocol, index) => (
            <span
              key={index}
              className="bg-white border border-slate-200 px-6 py-3 rounded-lg font-medium text-slate-700"
            >
              {protocol}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div id="connect-section" className="text-center">
        <div className="bg-slate-900 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-3">
            Ready to Track Your Portfolio?
          </h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Connect your wallet to see real DeFi positions, or explore the demo
            to understand the full experience.
          </p>

          <button
            onClick={onTryDemo}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-semibold flex items-center justify-center gap-2 mx-auto transition-colors"
          >
            <Play className="h-5 w-5" />
            Try Demo First
          </button>
        </div>
      </div>
    </div>
  );
}
