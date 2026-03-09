export type CalculateInvoiceAmountInputT = {
  adSpend: number;
  feeRate: number;
  minimumFee: number;
  discountPercent: number;
};

export type CalculateInvoiceAmountResultT = {
  calculatedFee: number;
  finalFee: number;
};

const round2 = (value: number): number => Math.round(value * 100) / 100;

export const calculateInvoiceAmount = (
  input: CalculateInvoiceAmountInputT
): CalculateInvoiceAmountResultT => {
  const { adSpend, feeRate, minimumFee, discountPercent } = input;

  const rawFee = adSpend * feeRate;
  const calculatedFee = round2(Math.max(rawFee, minimumFee));
  const discountAmount = calculatedFee * (discountPercent / 100);
  const finalFee = round2(calculatedFee - discountAmount);

  return { calculatedFee, finalFee };
};
