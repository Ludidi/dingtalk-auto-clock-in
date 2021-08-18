const schedule = require('node-schedule');
const http = require('http');

const KEY = ''; // 替换为自己的key

const sendBarkMessage = (message) => {
  const req = http.request(
    `http://api.day.app/${KEY}/${message}?sound=glass&url=dingtalk://snowdreams1006.tech/`,
    (res) => {
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log('sendBarkMessage', `BODY: ${chunk}`);
      });
      res.on('end', () => {
        console.log('sendBarkMessage', 'No more data in response.');
      });
    }
  );
  req.on('error', (e) => {
    console.error('sendBarkMessage', `problem with request: ${e.message}`);
  });

  req.end();
};

// 定时任务
const scheduleCronstyle = () => {
  // 周一至周五 早上八点五十
  schedule.scheduleJob('0 50 8 * * 1-5', () => {
    sendBarkMessage('上班打卡了~ 还有十分钟就要送老板鱼缸小石头咯~');
  });

  // 周一至周五 晚上六点
  schedule.scheduleJob('0 0 18 * * 1-5', () => {
    sendBarkMessage('打卡下班了~ 不然老板鱼缸里又要多养小鱼咯~');
  });
};

scheduleCronstyle();
