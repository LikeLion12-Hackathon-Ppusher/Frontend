const handleType = (type) => {
  return type === 'SY' ? '흡연자' : '비흡연자';
};

const handleAlarm = (option) => {
  return option ? '켜짐' : '꺼짐';
};

const handleDistance = (distance) => {
  return distance === 2 ? 30 : distance;
};
