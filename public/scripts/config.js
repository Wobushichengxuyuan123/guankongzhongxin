let PROXY_PATH;

if (window.location.search) {
  const params = new URLSearchParams(window.location.search);
  const __path = params.get('proxy-path')

  if (__path) {
    PROXY_PATH = '/' + __path
  }
}

if (!PROXY_PATH) {
  PROXY_PATH = ''
}

const config = {
  iceServers: [
    {
      username: 'kurento',
      credential: 'kurento',
      url: 'stun:39.103.237.231:23478',
    },
    {
      username: 'kurento',
      credential: 'kurento',
      url: 'turn:39.103.237.231:23478',
    },
    // {
    //   username: 'kurento',
    //   credential: 'kurento',
    //   url: 'stun:192.168.3.249:23478',
    // },
    // {
    //   username: 'kurento',
    //   credential: 'kurento',
    //   url: 'turn:20.1.58.139:10448',
    // },
  ],
  server: `wss://39.103.237.231:28443`,
  // server: `wss://192.168.1.70:28443`,
  // server: `wss://20.1.58.139:10082/kms-server`,
  // server: `wss://${window.location.hostname}:10082${PROXY_PATH}`,
  // freeice: true,
}
