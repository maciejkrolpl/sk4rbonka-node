const { Client } = require('pg');

jest.mock('pg', () => {
  const mClient = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn(),
  };
  return { Client: jest.fn(() => mClient) };
});

describe('59540432', () => {
  let client;
  beforeEach(() => {
    client = new Client();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should success', async () => {
    client.query.mockResolvedValueOnce({ rows: [], rowCount: 2 });
  });

  // it('should failure', async () => {
  //   const mError = new Error('dead lock');
  //   client.query.mockRejectedValueOnce(mError);
  //   await getAlerts();
  //   expect(client.connect).toBeCalledTimes(1);
  //   expect(client.query).toBeCalledWith('SELECT * FROM public.alerts;');
  //   expect(client.end).toBeCalledTimes(1);
  //   expect(failure).toBeCalledWith({ message: mError, status: false });
  // });
});