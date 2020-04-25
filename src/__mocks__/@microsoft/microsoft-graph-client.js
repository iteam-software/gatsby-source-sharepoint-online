const GraphRequest = jest.fn().mockImplementation(() => {
  return {
    expand() {
      return this;
    },
    get() {
      return Promise.resolve({
        value: [
          {
            id: Math.floor(Math.random() * 100000).toString(16),
          },
        ],
      });
    },
  };
});

const Client = jest.fn().mockImplementation(() => {
  return {
    api() {
      return new GraphRequest();
    },
    config: {},
  };
});

Client.initWithMiddleware = (options) => {
  return new Client();
};

exports.GraphRequest = GraphRequest;
exports.Client = Client;
