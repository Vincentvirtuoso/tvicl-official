export const getInitials = (name = "") => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const formatCurrency = (value) => {
  if (!value) return "";
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
};

// --- Convert number to words
export const numberToWords = (num) => {
  if (!num || isNaN(num)) return "";

  const units = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const teens = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const scales = ["", "Thousand", "Million", "Billion", "Trillion"];

  const toWords = (n) => {
    if (n === 0) return "Zero";
    let words = "";
    let scaleIndex = 0;

    while (n > 0) {
      const chunk = n % 1000;
      if (chunk) {
        let chunkWords = "";
        const hundreds = Math.floor(chunk / 100);
        const remainder = chunk % 100;
        if (hundreds) {
          chunkWords += `${units[hundreds]} Hundred `;
        }
        if (remainder) {
          if (remainder < 10) chunkWords += units[remainder];
          else if (remainder < 20) chunkWords += teens[remainder - 10];
          else {
            const t = Math.floor(remainder / 10);
            const u = remainder % 10;
            chunkWords += `${tens[t]}${u ? " " + units[u] : ""}`;
          }
        }
        words = `${chunkWords.trim()} ${scales[scaleIndex]} ${words}`.trim();
      }
      n = Math.floor(n / 1000);
      scaleIndex++;
    }
    return words;
  };

  return `${toWords(num)} Naira Only`;
};
