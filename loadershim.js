require("dotenv").config();

global.___loader = {
  enqueue: jest.fn(),
};
