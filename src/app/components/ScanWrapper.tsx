// src/components/QRScanClient.tsx
"use client";

import { useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import React from "react";

export default function QRScanClient() {
  const [scanned, setScanned] = useState<string | null>(null);

  const onScanSuccess = (decodedText: string) => {
    setScanned(decodedText);
    console.log("Scanned:", decodedText);
  };

  const onScanFailure = (error: unknown) => {
    // You can optionally handle scan failures
    console.warn("Scan error", error);
  };

  // Run once on mount
  React.useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false,
    );
    scanner.render(onScanSuccess, onScanFailure);

    return () => {
      scanner.clear().catch((error) => console.error("Clear error", error));
    };
  }, []);

  return (
    <div>
      <div id="reader" className="w-[300px] max-w-full" />
      {scanned && (
        <div className="mt-4 text-green-600 font-semibold">
          ✅ Scanned: {scanned}
        </div>
      )}
    </div>
  );
}
