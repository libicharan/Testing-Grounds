"use client";

import { Html5Qrcode, Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";

export default function QRScanClient() {
  const [scanned, setScanned] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false,
    );

    scanner.render(
      (decodedText) => {
        setScanned(decodedText);
        console.log("Scanned:", decodedText);
        scanner.clear(); // stop scanning after success
      },
      () => {
        // optional: console.warn("Scan error", error);
      },
    );

    return () => {
      scanner.clear().catch((error) => console.error("Clear error", error));
    };
  }, []);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const html5Qr = new Html5Qrcode(
      /* pass a temporary ID or a dummy div */ "file-reader",
    );

    try {
      const result = await html5Qr.scanFile(file, true);
      setScanned(result);
      console.log("File scanned:", result);
    } catch (err) {
      console.error("❌ File scan error:", err);
      setScanned("❌ Could not detect QR code.");
    } finally {
      html5Qr.clear(); // always clean up
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div id="reader" className="w-[300px] max-w-full" />
      <div id="file-reader" className="hidden" />

      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="mt-4"
        />
      </div>

      {scanned && (
        <div className="mt-2 text-green-600 font-semibold">
          ✅ Scanned: {scanned}
        </div>
      )}
    </div>
  );
}
