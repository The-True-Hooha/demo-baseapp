import { Search, Loader2 } from "lucide-react";

interface Props {
  onScan: () => void;
  scanning: boolean;
}

export function ScanButton({ onScan, scanning }: Props) {
  return (
    <div className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-lg p-4 border border-white/20">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold flex items-center gap-2 mb-1">
            <Search className="h-5 w-5 text-blue-400" />
            Blockchain Scanner
          </h3>
          <p className="text-sm text-gray-300">
            Scan Base network for newly deployed tokens
          </p>
        </div>

        <button
          onClick={onScan}
          disabled={scanning}
          className="bg-blue-500 hover:bg-blue-400 disabled:opacity-50 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
        >
          {scanning ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Search className="h-4 w-4" />
              Scan Now
            </>
          )}
        </button>
      </div>
    </div>
  );
}
