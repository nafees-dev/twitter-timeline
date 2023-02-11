export function timeElapsed(date1: any) {
  const date2: any = new Date();
  date1 = new Date(date1);
  const seconds = Math.floor((date2 - date1) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 30) {
    return `${days} days ago`;
  } else if (months < 12) {
    return `${months} months ago`;
  } else {
    return `${years} years ago`;
  }
}

export function calculateSize(array: Array<any>) {
  let size = 0;
  for (let i = 0; i < array.length; i++) {
    let objectSize = 0;
    for (let key in array[i]) {
      if (array[i].hasOwnProperty(key)) {
        objectSize += key.length * 2;
        let value = array[i][key];
        switch (typeof value) {
          case "string":
            objectSize += value.length * 2;
            break;
          case "number":
            objectSize += 8;
            break;
          case "boolean":
            objectSize += 4;
            break;
        }
      }
    }
    size += objectSize;
  }
  size = size / (1024 * 1024);
  let newsize = size.toFixed(3);
  return Number(newsize);
}
