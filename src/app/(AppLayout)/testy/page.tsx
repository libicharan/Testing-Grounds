// src/app/(AppLayout)/testy/page.tsx
// import QRScanClient from '@/app/components/ScanWrapper';

import GhostScanner from "@/app/components/table/ParanormalScanner";
// import ParanormalScanner from "@/app/components/table/ParanormalScanner";

export default function QRScanPage() {
  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">QR Scanner</h1>
      {/* <QRScanClient /> */}
      {/* <ParanormalScanner/> */}
      <GhostScanner />
    </div>
  );
}
