const extractCityDistrict = (address) => {
  if (!address) return { city: '', district: '' };
  let addr = address.replace(/\(Nguồn:\s*Facebook\)/i, '');
  addr = addr.replace(/,?\s*(Việt Nam|Vietnam)\s*$/i, '');
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
  if (city) {
    city = city.replace(/\s+\d{5,6}$/, '').trim();
    city = city.replace(/^(Thành phố|TP\.|TP\s+|Tỉnh\s+)/i, '').replace(/\s+City$/i, '').trim();
    if (/hcm|ho chi minh/i.test(city)) city = 'Hồ Chí Minh';
  }
  if (district) {
    district = district.replace(/^(Quận|Huyện|Thị xã|TX\.|Thành phố|TP\.|TP\s+)\s+/i, '').trim();
  }
  return { city, district };
};

function formatStreet(address) {
  const { city, district } = extractCityDistrict(address);
  let street = address || '';
  street = street.replace(/\(Nguồn:\s*Facebook\)/i, '').trim();
  street = street.replace(/,?\s*(Việt Nam|Vietnam)\s*$/i, '').trim();
  if (city) street = street.replace(new RegExp(`,?\\s*${city}$`, 'i'), '').trim();
  if (district) street = street.replace(new RegExp(`,?\\s*${district}$`, 'i'), '').trim();
  street = street.replace(/,\s*$/, '').trim();
  return street || '-';
}

console.log(formatStreet("456 Đường ABC, Quận 1, Hồ Chí Minh, Việt Nam"));
console.log(formatStreet("Nha Khoa XYZ, Thành phố Cần Thơ"));
console.log(formatStreet("Thành phố Trà Vinh, Tỉnh Trà Vinh, Việt Nam (Nguồn: Facebook)"));
console.log(formatStreet("549a Đ. Đỗ Xuân Hợp, Phường Phước Long B, Quận 9, Hồ Chí Minh"));
