export const formatIndianAmount = (num: any) => {
    console.log(num)
  if (num === null || num === undefined) return '';

  const absNum = Math.abs(num);

  if (absNum >= 10000000) {        // 1 Crore or more
    return (num / 10000000).toFixed(2) + ' Cr';
  } else if (absNum >= 100000) {    // 1 Lakh or more
    return (num / 100000).toFixed(2) + ' L';
  } else if (absNum >= 1000) {       // 1 Thousand or more
    return (num / 1000).toFixed(2) + ' K';
  } else {
    return num.toString();
  }
}