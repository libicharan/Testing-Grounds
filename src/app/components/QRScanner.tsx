"use client";

import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

type QRScannerProps = {
  onScan: (decodedText: string) => void;
};

export default function QRScanner({ onScan }: QRScannerProps) {
  useEffect(() => {
    // 👇 Provide all 3 required arguments to the constructor
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 250 },
      /* verbose */ false,
    );

    scanner.render(
      (decodedText) => {
        onScan(decodedText);
        scanner.clear(); // stop scanning after success
      },
      (error) => {
        console.warn("QR scan error:", error);
      },
    );

    return () => {
      scanner.clear().catch((e) => console.error("Scanner cleanup error", e));
    };
  }, [onScan]);

  return <div id="qr-reader" className="w-full max-w-md" />;
}
