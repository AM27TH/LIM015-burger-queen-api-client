export default function getTime(dateProcessed, dateEntry){
  function format(num) {
    num  = isNaN(num) ? 0 : num;
    return (num<10 ? '0':'') + num;
  }
  let diff = Date.parse(dateProcessed) - Date.parse(dateEntry);
  if(diff === 0) return { color: 'disable', message: '--:--:--' }
  const ms = diff % 1000;
  diff = (diff - ms) / 1000;
  const seg = diff % 60;
  diff = (diff - seg) / 60;
  const min = diff % 60;
  const hour = (diff - min) / 60;
  const time = `${format(hour)}:${format(min)}:${format(seg)}`;
  if (isNaN(hour) || hour <= 1) return { color: 'success', message: time };
  else if (hour <= 2) return { color: 'warning', message: time };
  else if (hour <= 24) return { color: 'error', message: time };
  return { color: 'error', message: 'Fuera de tiempo'};
}