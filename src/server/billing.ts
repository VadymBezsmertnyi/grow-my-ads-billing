export type CalculateInvoiceAmountInput = {
  adSpend: number;
  feeRate: number;
  minimumFee: number;
  discountPercent: number;
};

export type CalculateInvoiceAmountResult = {
  calculatedFee: number;
  finalFee: number;
};

const round2 = (value: number): number =>
  Math.round(value * 100) / 100;

export const calculateInvoiceAmount = (
  input: CalculateInvoiceAmountInput
): CalculateInvoiceAmountResult => {
  const { adSpend, feeRate, minimumFee, discountPercent } = input;

  const rawFee = adSpend * feeRate;
  const calculatedFee = round2(Math.max(rawFee, minimumFee));
  const discountAmount = calculatedFee * (discountPercent / 100);
  const finalFee = round2(calculatedFee - discountAmount);

  return { calculatedFee, finalFee };
};
