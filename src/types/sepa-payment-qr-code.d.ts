declare module "sepa-payment-qr-code" {
  interface SepaPaymentOptions {
    name: string;
    iban: string;
    amount?: number | null;
    bic?: string;
    purposeCode?: string;
    structuredReference?: string;
    unstructuredReference?: string;
    information?: string;
  }

  function generateQrCode(options: SepaPaymentOptions): string;
  export = generateQrCode;
}
