# winston-discord-logger
Discord transport for winston 3+ that logs to a channel via webhook.

## Installation
```
npm install winston winston-discord-logger
```

## Usage
### Set up
```javascript
const winston = require('winston');
const DiscordLogger = require('winston-discord-logger');

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new DiscordLogger({
      webhook: 'Your discord webhook URL.',
      formatter: (info) => {
        const description: 'Your error details: Error stack or error message or anything.';
        const fields = [
          { name: 'Timestamp (UTC)', value: new Date().toISOString(), inline: true },
          { name: 'Log Id', value: info.logId, inline: true },
        ];
        return { description, fields };
      };
    }),
  ],
});

logger.info('This should be logged in Discord.');
```
Or
```javascript
const winston = require('winston');
const DiscordLogger = require('winston-discord-logger');

const logger = winston.createLogger({
  level: 'info',
});
logger.add(new DiscordLogger({
  webhook: 'Your discord webhook URL.',
  formatter: (info) => {
    const description: 'Your error details: Error stack or error message or anything.';
    const fields = [
      { name: 'Timestamp (UTC)', value: new Date().toISOString(), inline: true },
      { name: 'Log Id', value: info.logId, inline: true },
    ];
    return { description, fields };
  };
}));

logger.info('This should be logged in Discord.');
```

### Options
* `webhook`(string) **REQUIRED** - Discord incoming webhook.
* `formatter`(function) **REQUIRED** - Custom function to formate messages. This function accepts the `info` object ([see Winston documentation](https://github.com/winstonjs/winston/blob/master/README.md#streams-objectmode-and-info-objects)) and must return an object containing description and fields which is an array of object containing three required fields name, value and inline as shown in the usage.
* `level`(string) - Level to log. Global settings will apply if left undefined.
* `color`(number) - Theme color of the message (Default: 16711680).
* `title`(string) - Title of the message (Default: `Alert`).
