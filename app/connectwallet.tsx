import {
  Wallet,
  ArrowRight,
  CheckCircle,
  Play,
  AlertCircle,
} from "lucide-react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useEffect } from "react";

interface Props {
  onTryDemo?: () => void;
}

export function ConnectWallet({ onTryDemo }: Props = {}) {
  const { address, isConnected, isConnecting } = useAccount();
  const { connect, connectors, error, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    console.log(
      "Available connectors:",
      connectors.map((c) => ({ name: c.name, id: c.id })),
    );
  }, [connectors]);

  if (isConnected && address) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
          <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-600" />
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Wallet Connected
          </h3>
          <p className="text-slate-600 mb-6 font-mono">
            {address.slice(0, 6)}...{address.slice(-4)}
          </p>
          <button
            onClick={() => disconnect()}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            Disconnect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white border border-slate-200 rounded-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wallet className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">
            Connect Your Wallet
          </h3>
          <p className="text-slate-600">
            Connect your wallet to track your real DeFi portfolio on Base
          </p>
        </div>

        {onTryDemo && (
          <div className="mb-8">
            <button
              onClick={onTryDemo}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors mb-6"
            >
              <Play className="h-5 w-5" />
              Try Demo Mode
            </button>
            <div className="border-t border-slate-200 pt-6">
              <p className="text-sm text-slate-500 text-center mb-6">
                Or connect a real wallet:
              </p>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {connectors.length > 0 ? (
            connectors.map((connector) => (
              <button
                key={connector.uid}
                onClick={() => {
                  console.log("Connecting to:", connector.name);
                  connect({ connector });
                }}
                disabled={isPending || isConnecting}
                className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Wallet className="h-5 w-5" />
                {isPending || isConnecting
                  ? "Connecting..."
                  : `Connect ${connector.name}`}
                <ArrowRight className="h-5 w-5" />
              </button>
            ))
          ) : (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <span className="font-medium text-orange-900">
                  No wallets detected
                </span>
              </div>
              <p className="text-sm text-orange-800">
                Please install MetaMask or another Web3 wallet extension to
                continue.
              </p>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <span className="font-medium text-red-900">
                Connection Failed
              </span>
            </div>
            <p className="text-sm text-red-800 mb-2">{error.message}</p>
            <p className="text-xs text-red-600">
              Make sure you have MetaMask or another wallet extension installed
              and unlocked.
            </p>
          </div>
        )}

        <p className="text-sm text-slate-500 text-center mt-6">
          Your wallet will be used to read your DeFi positions on Base Network
        </p>
      </div>
    </div>
  );
}
