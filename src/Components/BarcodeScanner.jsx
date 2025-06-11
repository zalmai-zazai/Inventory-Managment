// src/Components/BarcodeScanner.jsx
import { Html5Qrcode } from "html5-qrcode";
import { useEffect } from "react";

export default function BarcodeScanner({ onScanSuccess, onClose }) {
  useEffect(() => {
    const scanner = new Html5Qrcode("reader");

    Html5Qrcode.getCameras().then((devices) => {
      if (devices && devices.length) {
        scanner.start(
          { facingMode: "environment" }, // back camera on phones
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            onScanSuccess(decodedText); // send barcode back
            scanner.stop().then(onClose).catch(console.error);
          },
          (errorMessage) => {
            // console.log(errorMessage);
          }
        );
      }
    });

    return () => {
      scanner.stop().catch(() => {});
    };
  }, []);

  return (
    <div className="bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <div id="reader" style={{ width: "300px" }}></div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
        >
          Close Scanner
        </button>
      </div>
    </div>
  );
}
