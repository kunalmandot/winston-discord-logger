const Transport = require('winston-transport');
const axios = require('axios');

const { HTTP_METHODS } = require('./constant');

class DiscordLogger extends Transport {
  constructor(options = {}) {
    super(options);

    this.webhook = options.webhook;
    this.color = options.color || 16711680;
    this.title = options.title || 'Alert';
    this.formatter = options.formatter;
  }

  log(info, callback) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    const { description, fields } = this.formatter(info);
    const requestBody = {
      embeds: [{
        color: this.color,
        title: this.title,
        description,
        fields,
      }],
    };

    axios({
      url: this.webhook,
      method: HTTP_METHODS.POST,
      data: requestBody,
    });

    callback();
  }
}

module.exports = DiscordLogger;
