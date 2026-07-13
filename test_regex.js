const extractCityDistrict = (address) => {
  if (!address) return { city: '', district: '' };
  
  // Loại bỏ các đoạn chữ rác ở cuối địa chỉ
  let addr = address.replace(/,?\s*(Việt Nam|Vietnam)\s*$/i, '');
  addr = addr.replace(/\(Nguồn:\s*Facebook\)/i, '');
  addr = addr.replace(/\s+\d{5,6}$/, '');
  
  const parts = addr.split(',').map(p => p.trim());
  
  let city = '';
  let district = '';
  if (parts.length >= 2) {
    city = parts[parts.length - 1];
    district = parts[parts.length - 2];
  } else if (parts.length === 1) {
    city = parts[0];
  }
  
  return { city, district };
};

console.log(extractCityDistrict("Trà Vinh, Việt Nam"));
console.log(extractCityDistrict("Trà Vinh, Việt Nam "));
console.log(extractCityDistrict("Trà Vinh, Tỉnh Trà Vinh, Việt Nam"));
