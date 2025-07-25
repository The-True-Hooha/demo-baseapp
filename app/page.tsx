"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Share2, PieChart, Play, Eye } from "lucide-react";
import { PortfolioOverview } from "./components/portfoliooverview";
import { PositionsList } from "./components/positionlist";
import { PortfolioPreview } from "./components/preview";
import { ConnectWallet } from "./connectwallet";

interface PortfolioData {
  totalValue: number;
  totalChange24h: number;
  positions: DeFiPosition[];
  lastUpdated: number;
}

interface DeFiPosition {
  protocol: string;
  type: "lending" | "liquidity" | "staking" | "vault";
  token: string;
  amount: number;
  value: number;
  apy: number;
  change24h: number;
  address: string;
}

export default function HomePage() {
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  const { address, isConnected } = useAccount();

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isConnected && address) {
      setShowPreview(false);
      fetchPortfolioData();
    }
  }, [isConnected, address]);

  const loadDemoData = () => {
    setDemoMode(true);
    setShowPreview(false);
    setPortfolio({
      totalValue: 15847.32,
      totalChange24h: 5.7,
      positions: [
        {
          protocol: "Aave",
          type: "lending",
          token: "USDC",
          amount: 8500,
          value: 8500,
          apy: 4.2,
          change24h: 0.8,
          address: "0x4e65fE4DbA92790696d040ac24Aa414708F5c0AB",
        },
        {
          protocol: "Native",
          type: "staking",
          token: "ETH",
          amount: 2.08,
          value: 7347.32,
          apy: 3.1,
          change24h: 12.4,
          address: "0x",
        },
        {
          protocol: "Uniswap V3",
          type: "liquidity",
          token: "ETH/USDC",
          amount: 1250,
          value: 1250,
          apy: 8.7,
          change24h: -2.1,
          address: "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640",
        },
        {
          protocol: "Compound",
          type: "lending",
          token: "WETH",
          amount: 0.85,
          value: 2997.5,
          apy: 2.8,
          change24h: 8.2,
          address: "0xc3d688B66703497DAA19211EEdff47f25384cdc3",
        },
      ],
      lastUpdated: Date.now(),
    });
  };

  const fetchPortfolioData = async () => {
    if (!address) return;

    setRefreshing(true);
    try {
      const response = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          userFid: "demo-user",
          username: "Portfolio Tracker",
        }),
      });

      const data = await response.json();
      if (data.success) {
        setPortfolio(data.portfolio);
      }
    } catch (error) {
      console.error("Failed to fetch portfolio:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleShare = () => {
    if (!portfolio) return;

    const performanceEmoji = portfolio.totalChange24h >= 0 ? "📈" : "📉";
    const changeText = portfolio.totalChange24h >= 0 ? "up" : "down";

    const castText = `${performanceEmoji} My DeFi portfolio on Base is ${changeText} ${Math.abs(portfolio.totalChange24h).toFixed(2)}% today!

Total value: $${portfolio.totalValue.toLocaleString()}

Track your DeFi positions with real-time data 📊`;

    const warpcastUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(castText)}&embeds[]=${encodeURIComponent(window.location.href)}`;
    window.open(warpcastUrl, "_blank");
  };

  const handleBackToPreview = () => {
    setPortfolio(null);
    setDemoMode(false);
    setShowPreview(true);
  };

  const isWalletConnected = isConnected || demoMode;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-900 text-xl font-medium">
          Loading DeFi Portfolio...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <PieChart className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">
              Base DeFi Portfolio
            </h1>
          </div>
          <p className="text-lg text-slate-600">
            Track your DeFi positions on Base Network
          </p>

          {demoMode && (
            <div className="mt-4">
              <span className="bg-amber-100 border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm font-medium">
                🎭 Demo Mode Active
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Preview Mode */}
        {showPreview && (
          <div className="px-6 py-8">
            <PortfolioPreview onTryDemo={loadDemoData} />
          </div>
        )}

        {/* Wallet Connection */}
        {!isWalletConnected && !showPreview && (
          <div className="px-6 py-8">
            <div className="mb-6 text-center">
              <button
                onClick={() => setShowPreview(true)}
                className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-2 mx-auto font-medium"
              >
                <Eye className="h-4 w-4" />← Back to Preview
              </button>
            </div>
            <ConnectWallet onTryDemo={loadDemoData} />
          </div>
        )}

        {/* Connected Experience */}
        {isWalletConnected && (
          <>
            {/* Demo Banner */}
            {demoMode && (
              <div className="px-6 py-4">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Play className="h-5 w-5 text-amber-600" />
                    <span className="text-amber-900 font-medium">
                      Demo Mode - Simulated portfolio data
                    </span>
                  </div>
                  <button
                    onClick={handleBackToPreview}
                    className="text-amber-700 hover:text-amber-900 text-sm font-medium"
                  >
                    Exit Demo
                  </button>
                </div>
              </div>
            )}

            {/* Portfolio Overview */}
            {portfolio && (
              <div className="px-6 py-6">
                <PortfolioOverview
                  portfolio={portfolio}
                  onRefresh={fetchPortfolioData}
                  refreshing={refreshing}
                />
              </div>
            )}

            {/* Actions */}
            <div className="px-6 py-4">
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <button
                  onClick={handleShare}
                  disabled={!portfolio}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Share2 className="h-5 w-5" />
                  Share on Warpcast
                </button>
              </div>
            </div>

            {/* Scan Button */}
            {!portfolio && !demoMode && (
              <div className="px-6 py-4">
                <div className="max-w-md mx-auto">
                  <button
                    onClick={fetchPortfolioData}
                    disabled={refreshing}
                    className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white py-4 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <PieChart className="h-5 w-5" />
                    {refreshing ? "Scanning Portfolio..." : "Scan My Portfolio"}
                  </button>
                </div>
              </div>
            )}

            {/* Positions */}
            {portfolio?.positions && (
              <div className="px-6 pb-12">
                <PositionsList positions={portfolio.positions} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
