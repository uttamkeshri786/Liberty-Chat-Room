import * as actions from './unencrypted_messages';
import { getSocket } from 'utils/socket';

const mockEmit = jest.fn((_type, _null, callback) => {
  callback({ isLocked: true });
});

jest.mock('utils/socket', () => {
  return {
    getSocket: jest.fn().mockImplementation(() => ({
      emit: mockEmit,
    })),
  };
});

describe('Reveice unencrypted message actions', () => {
  it('should create no action', () => {
    const mockDispatch = jest.fn();
    actions.receiveUnencryptedMessage('FAKE')(mockDispatch, jest.fn().mockReturnValue({}));
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('should create user enter action', () => {
    const mockDispatch = jest.fn();
    actions.receiveUnencryptedMessage('USER_ENTER', 'test')(mockDispatch, jest.fn().mockReturnValue({ state: {} }));
    expect(mockDispatch).toHaveBeenLastCalledWith({ type: 'USER_ENTER', payload: 'test' });
  });

  it('should create user exit action', () => {
    const mockDispatch = jest.fn();
    const state = {
      room: {
        members: [
          { publicKey: { n: 'uttamkey' }, id: 'uttamkey', username: 'uttam' },
          { publicKey: { n: 'amitkey' }, id: 'amitkey', username: 'amit' },
          { publicKey: { n: 'poonamkey' }, id: 'poonamkey', username: 'amit' },
        ],
      },
    };
    const mockGetState = jest.fn().mockReturnValue(state);
    const payload1 = [
      { publicKey: { n: 'uttamkey' } },
      { publicKey: { n: 'amitkey' } },
      { publicKey: { n: 'poonamkey' } },
    ];
    const payload2 = [{ publicKey: { n: 'amitkey' } }, { publicKey: { n: 'poonamkey' } }];

    // Nobody left
    actions.receiveUnencryptedMessage('USER_EXIT', payload1)(mockDispatch, mockGetState);

    expect(mockDispatch).not.toHaveBeenCalled();

    actions.receiveUnencryptedMessage('USER_EXIT', payload2)(mockDispatch, mockGetState);
    expect(mockDispatch).toHaveBeenLastCalledWith({
      payload: {
        id: 'uttamkey',
        members: [{ publicKey: { n: 'amitkey' } }, { publicKey: { n: 'poonamkey' } }],
        username: 'uttam',
      },
      type: 'USER_EXIT',
    });
  });

  it('should create receive toggle lock room action', () => {
    const mockDispatch = jest.fn();
    const state = {
      room: {
        members: [
          { publicKey: { n: 'uttamkey' }, id: 'iduttam', username: 'uttam' },
          { publicKey: { n: 'amitkey' }, id: 'idamit', username: 'amit' },
        ],
      },
    };
    const mockGetState = jest.fn().mockReturnValue(state);
    const payload = { publicKey: { n: 'uttamkey' } };

    actions.receiveUnencryptedMessage('TOGGLE_LOCK_ROOM', payload)(mockDispatch, mockGetState);
    expect(mockDispatch).toHaveBeenLastCalledWith({
      payload: { id: 'iduttam', locked: undefined, username: 'uttam' },
      type: 'RECEIVE_TOGGLE_LOCK_ROOM',
    });
  });

  it('should create receive toggle lock room action', () => {
    const mockDispatch = jest.fn();
    const state = {
      user: {
        username: 'uttam',
        id: 'iduttam',
      },
    };
    const mockGetState = jest.fn().mockReturnValue(state);

    actions.sendUnencryptedMessage('TOGGLE_LOCK_ROOM')(mockDispatch, mockGetState);
    expect(mockDispatch).toHaveBeenLastCalledWith({
      payload: { locked: true, sender: 'iduttam', username: 'uttam' },
      type: 'TOGGLE_LOCK_ROOM',
    });
  });
});

describe('Send unencrypted message actions', () => {
  it('should create no action', () => {
    const mockDispatch = jest.fn();
    actions.sendUnencryptedMessage('FAKE')(mockDispatch, jest.fn().mockReturnValue({}));
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('should create toggle lock room action', () => {
    const mockDispatch = jest.fn();
    const state = {
      user: {
        username: 'uttam',
        id: 'iduttam',
      },
    };
    const mockGetState = jest.fn().mockReturnValue(state);

    actions.sendUnencryptedMessage('TOGGLE_LOCK_ROOM')(mockDispatch, mockGetState);
    expect(mockDispatch).toHaveBeenLastCalledWith({
      payload: { locked: true, sender: 'iduttam', username: 'uttam' },
      type: 'TOGGLE_LOCK_ROOM',
    });
  });
});
