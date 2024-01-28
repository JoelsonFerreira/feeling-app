export function timeSince(date: Date) {
  const seconds = Math.floor((Number(new Date()) - Number(date)) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) return Math.floor(interval) + " y";
  
  interval = seconds / 2592000;

  if (interval > 1) return Math.floor(interval) + " months";
  
  interval = seconds / 86400;

  if (interval > 1) return Math.floor(interval) + " d";
  
  interval = seconds / 3600;

  if (interval > 1) return Math.floor(interval) + " h";
  
  interval = seconds / 60;

  if (interval > 1) return Math.floor(interval) + " m";
  
  return Math.floor(seconds) + " seconds";
}

export function abbrNum(number: number, decPlaces: number) {
  let _number = number
  let _decPlaces = decPlaces

  _decPlaces = Math.pow(10, _decPlaces);

  const abbrev = ["k", "m", "b", "t"];

  for (var i = abbrev.length - 1; i >= 0; i--) {
    const size = Math.pow(10, (i + 1) * 3);

    if (size <= _number) {
      _number = Math.round(_number * _decPlaces / size) / _decPlaces;

      if ((_number == 1000) && (i < abbrev.length - 1)) {
        _number = 1;
        i++;
      }

      return `${_number}${abbrev[i]}`
    }
  }

  return `${_number}`;
}