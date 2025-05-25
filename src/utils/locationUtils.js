const toRad = deg => (deg * Math.PI) / 180;

export const getEstimatedDurationInMinutes = (
  coord1,
  coord2,
  speedKmh = 30,
) => {
  const R = 6371;

  const dLat = toRad(coord2.latitude - coord1.latitude);
  const dLon = toRad(coord2.longitude - coord1.longitude);

  const lat1 = toRad(coord1.latitude);
  const lat2 = toRad(coord2.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distanceKm = R * c;
  const estimatedMinutes = (distanceKm / speedKmh) * 60;

  return Math.ceil(estimatedMinutes);
};

export const formatDuration = minutes => {
  if (minutes < 60) {
    return `${minutes} dəqiqə`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours < 24) {
    if (remainingMinutes === 0) {
      return `${hours} saat`;
    } else {
      return `${hours} saat ${remainingMinutes} dəqiqə`;
    }
  }

  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  let result = `${days} gün`;
  if (remainingHours > 0) {result += ` ${remainingHours} saat`;}
  if (remainingMinutes > 0) {result += ` ${remainingMinutes} dəqiqə`;}

  return result;
};
