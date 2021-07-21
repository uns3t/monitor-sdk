function sendBeacon(data: { [key: string]: any }, url: string) {
  navigator.sendBeacon(url, JSON.stringify(data));
}
