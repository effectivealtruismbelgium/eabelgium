import { QRCodeSVG } from "qrcode.react";
import React, { useState } from "react";
import generateQrCode from "sepa-payment-qr-code";
import BankDetailItem from "../BankDetailItem";

interface BankTransferInfo {
  beneficiary: string;
  beneficiaryAddress: string;
  iban: string;
  amount: number;
  reference: string;
}

interface QrCodeGeneratorProps {
  defaultAmount?: number;
  reference: string;
  charityName: string;
  className?: string;
}

// Bank transfer constants
const KBF_NAME = "Koning Boudewijnstichting";
const KBF_ADDRESS = "Brederodestraat 21 - 1000 Brussel";
const KBF_IBAN = "BE10 0000 0000 0404";

const generateQrCodeForBankTransfer = (transferInfo: BankTransferInfo) => {
  return generateQrCode({
    name: `${transferInfo.beneficiary}, ${transferInfo.beneficiaryAddress}`,
    iban: transferInfo.iban.replace(/\s/g, ""),
    amount: transferInfo.amount,
    unstructuredReference: transferInfo.reference,
  });
};

const QrCodeGenerator: React.FC<QrCodeGeneratorProps> = ({
  defaultAmount = 25,
  reference,
  charityName,
  className = "",
}) => {
  const [amount, setAmount] = useState(0);
  const [activeTab, setActiveTab] = useState<"qr" | "details">("qr");

  const transferInfo: BankTransferInfo = {
    beneficiary: KBF_NAME,
    beneficiaryAddress: KBF_ADDRESS,
    iban: KBF_IBAN,
    amount: amount > 0 ? amount : defaultAmount,
    reference: reference,
  };

  let qr = generateQrCodeForBankTransfer(transferInfo);

  return (
    <div className={className}>
      <div className="flex flex-col items-start gap-8 md:flex-row">
        <div className="md:flex-3/5">
          <h2 className="text-base-800 mb-4 text-2xl font-bold">
            Donate via bank transfer with tax deductibility
          </h2>
          <p className="text-base-600 mb-6">
            Enter the amount you'd like to donate and scan the QR code with your
            banking app to make a direct transfer to {charityName} via the King
            Baudouin Foundation.
          </p>
          <label
            htmlFor="donation-amount"
            className="text-base-700 mb-2 block text-sm font-medium"
          >
            Donation amount (€)
          </label>
          <input
            type="number"
            id="donation-amount"
            min="1"
            step="0.01"
            value={amount > 0 ? amount : ""}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            placeholder="25.00"
            className="border-base-300 focus:ring-primary-500 focus:border-primary-500 w-full rounded-lg border px-4 py-3 focus:ring-2"
          />

          <p className="text-base-500 mt-4 text-sm">
            Note that donations are not processed through our website, but
            directly through the King Baudouin Foundation. A{" "}
            <strong>5% fee</strong> is applied to your donation. This fee allows
            for tax deductibility to foreign charities from Belgium.{" "}
            <a href="#how-it-works" className="text-primary-500">
              Learn why.
            </a>
          </p>
        </div>

        <div className="flex w-full flex-col md:flex-2/5">
          {/* Tab Navigation */}
          <div className="border-base-200 mb-6 flex border-b">
            <button
              onClick={() => setActiveTab("qr")}
              className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "qr"
                  ? "border-primary-500 text-primary-600"
                  : "text-base-500 hover:text-base-700 border-transparent"
              }`}
            >
              QR Code
            </button>
            <button
              onClick={() => setActiveTab("details")}
              className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "details"
                  ? "border-primary-500 text-primary-600"
                  : "text-base-500 hover:text-base-700 border-transparent"
              }`}
            >
              Bank Details
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "qr" && (
            <div className="flex flex-col items-center">
              <QRCodeSVG value={qr} size={256} />
              <p className="text-base-500 mt-4 text-center text-sm">
                Scan with your banking app
              </p>
            </div>
          )}

          {activeTab === "details" && (
            <div>
              <div className="space-y-4">
                <BankDetailItem
                  label="Account holder"
                  value={transferInfo.beneficiary}
                />
                <BankDetailItem label="IBAN" value={transferInfo.iban} />
                <BankDetailItem
                  label="Amount (€)"
                  value={`${transferInfo.amount.toFixed(2)}`}
                />
                <BankDetailItem label="Reference" value={reference} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QrCodeGenerator;
