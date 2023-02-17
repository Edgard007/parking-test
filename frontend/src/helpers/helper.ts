export const decimalFormat = (num: string) => {
  const amount = Number(num)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

  return amount === "NaN" ? "$0.00" : `$${amount}`;
};

export const onlyFloat = (e: any, setState: (amount: string) => void) => {
  const value = e?.target?.value;
  const valid = new RegExp(/^\d*\.?\d{0,2}$/g);

  if (valid.test(value)) {
    const amount = value.charAt(0) === "." ? "0" + value : value;

    // ==> Validate that the amount has no more than 9 digits.
    if ((value || "").length > 9 && (value || "").indexOf(".") === -1) return;

    setState(amount);
  }
};
