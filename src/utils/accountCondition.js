export const handleType = (type) => {
  return type === 'SY' ? '흡연자' : '비흡연자';
};

export const handleAlarm = (option) => {
  return option ? '켜짐' : '꺼짐';
};

export const handleDistance = (distance) => {
  return distance === 2 ? 30 : distance;
};
