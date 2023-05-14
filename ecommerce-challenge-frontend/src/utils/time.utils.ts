export const timeSince = (date: Date | string | undefined) => {
  if (!date) return;
  date = new Date(date);

  var seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (Math.floor(seconds) < 10) return " gần đây";

  let result = getTimeSince(seconds);

  return result + " trước";
};

const getTimeSince = (seconds: number) => {
  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " năm";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " tháng";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " ngày";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " giờ";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " phút";
  }
  if (Math.floor(seconds) < 10) return " gần đây";
  return Math.floor(seconds) + " giây";
};
