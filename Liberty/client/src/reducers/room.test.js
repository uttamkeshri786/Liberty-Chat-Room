import reducer from './room';

describe('Room reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ id: '', isLocked: false, members: [] });
  });

  it('should handle USER_EXIT', () => {
    const state = {
      members: [
        { publicKey: { n: 'amitkey' }, id: 'amitkey', username: 'amit', isOwner: true },
        { publicKey: { n: 'uttamkey' }, id: 'uttamkey', username: 'uttam', isOwner: false },
        { publicKey: { n: 'poonamkey' }, id: 'poonamkey', username: 'poonam', isOwner: false },
      ],
    };
    const payload = {
      members: [
        { publicKey: { n: 'uttamkey' }, isOwner: true },
        { publicKey: { n: 'poonamkey' }, isOwner: false },
      ],
    };
    expect(reducer(state, { type: 'USER_EXIT', payload: payload })).toEqual({
      members: [
        { id: 'uttamkey', isOwner: true, publicKey: { n: 'uttamkey' }, username: 'uttam' },
        { id: 'poonamkey', isOwner: false, publicKey: { n: 'poonamkey' }, username: 'poonam' },
      ],
    });
  });

  it('should handle RECEIVE_ENCRYPTED_MESSAGE_ADD_USER', () => {
    const state = {
      members: [
        { publicKey: { n: 'uttamkey' }, id: 'uttamkey', username: 'uttam', isOwner: true },
        { publicKey: { n: 'poonamkey' }, id: 'poonamkey', username: 'poonam', isOwner: false },
        { publicKey: { n: 'amitkey' }, id: 'amitkey', username: 'amit', isOwner: false },
      ],
    };
    const payload = {
      payload: {
        username: 'amity',
        isOwner: true,
        publicKey: { n: 'amitkey' },
      },
    };
    expect(reducer(state, { type: 'RECEIVE_ENCRYPTED_MESSAGE_ADD_USER', payload: payload })).toEqual({
      members: [
        { id: 'uttamkey', isOwner: true, publicKey: { n: 'uttamkey' }, username: 'uttam' },
        { id: 'poonamkey', isOwner: false, publicKey: { n: 'poonamkey' }, username: 'poonam' },
        { id: 'amitkey', isOwner: true, publicKey: { n: 'amitkey' }, username: 'amity' },
      ],
    });
  });

  it('should handle CREATE_USER', () => {
    const state = {
      members: [
        { publicKey: { n: 'uttamkey' }, id: 'uttamkey', username: 'uttam', isOwner: true },
        { publicKey: { n: 'poonamkey' }, id: 'poonamkey', username: 'poonam', isOwner: false },
      ],
    };
    const payload = {
      username: 'amit',
      publicKey: { n: 'amitKey' },
    };
    expect(reducer(state, { type: 'CREATE_USER', payload: payload })).toEqual({
      members: [
        { id: 'uttamkey', isOwner: true, publicKey: { n: 'uttamkey' }, username: 'uttam' },
        { id: 'poonamkey', isOwner: false, publicKey: { n: 'poonamkey' }, username: 'poonam' },
        { id: 'amitKey', publicKey: { n: 'amitKey' }, username: 'amit' },
      ],
    });
  });

  it('should handle USER_ENTER', () => {
    const state = {
      members: [
        { publicKey: { n: 'uttamkey' }, id: 'uttamkey', username: 'uttam', isOwner: true },
        { publicKey: { n: 'poonamkey' }, id: 'poonamkey', username: 'poonam', isOwner: false },
      ],
    };
    const payload = {
      users: [
        { publicKey: { n: 'uttamkey' }, id: 'uttamkey', username: 'uttam', isOwner: true },
        { publicKey: { n: 'poonamkey' }, id: 'poonamkey', username: 'poonam', isOwner: false },
        { publicKey: { n: 'amitkey' }, id: 'amitkey', username: 'amit', isOwner: false },
      ],
      isLocked: false,
      id: 'test',
    };
    expect(reducer(state, { type: 'USER_ENTER', payload: payload })).toEqual({
      id: 'test',
      isLocked: false,
      members: [
        { id: 'uttamkey', isOwner: true, publicKey: { n: 'uttamkey' }, username: 'uttam' },
        { id: 'poonamkey', isOwner: false, publicKey: { n: 'poonamkey' }, username: 'poonam' },
        { id: 'amitkey', isOwner: false, publicKey: { n: 'amitkey' } },
      ],
    });
  });

  it('should handle TOGGLE_LOCK_ROOM', () => {
    expect(reducer({ isLocked: true }, { type: 'TOGGLE_LOCK_ROOM' })).toEqual({ isLocked: false });
  });

  it('should handle RECEIVE_TOGGLE_LOCK_ROOM', () => {
    expect(reducer({ isLocked: true }, { type: 'RECEIVE_TOGGLE_LOCK_ROOM', payload: { locked: false } })).toEqual({
      isLocked: false,
    });
  });

  it('should handle SEND_ENCRYPTED_MESSAGE_CHANGE_USERNAME', () => {
    const state = {
      members: [
        { publicKey: { n: 'uttamkey' }, id: 'uttamkey', username: 'uttam', isOwner: true },
        { publicKey: { n: 'poonamkey' }, id: 'poonamkey', username: 'poonam', isOwner: false },
        { publicKey: { n: 'amitkey' }, id: 'amitkey', username: 'amit', isOwner: false },
      ],
    };
    const payload = {
      newUsername: 'poonamtte',
      id: 'poonamkey',
    };
    expect(reducer(state, { type: 'SEND_ENCRYPTED_MESSAGE_CHANGE_USERNAME', payload: payload })).toEqual({
      members: [
        { id: 'uttamkey', isOwner: true, publicKey: { n: 'uttamkey' }, username: 'uttam' },
        { id: 'poonamkey', isOwner: false, publicKey: { n: 'poonamkey' }, username: 'poonamtte' },
        { id: 'amitkey', isOwner: false, publicKey: { n: 'amitkey' }, username: 'amit' },
      ],
    });
  });

  it('should handle RECEIVE_ENCRYPTED_MESSAGE_CHANGE_USERNAME', () => {
    const state = {
      members: [
        { publicKey: { n: 'uttamkey' }, id: 'uttamkey', username: 'uttam', isOwner: true },
        { publicKey: { n: 'poonamkey' }, id: 'poonamkey', username: 'poonam', isOwner: false },
        { publicKey: { n: 'amitkey' }, id: 'amitkey', username: 'amit', isOwner: false },
      ],
    };
    const payload = {
      payload: {
        newUsername: 'poonamtte',
        id: 'poonamkey',
      },
    };
    expect(reducer(state, { type: 'RECEIVE_ENCRYPTED_MESSAGE_CHANGE_USERNAME', payload: payload })).toEqual({
      members: [
        { id: 'uttamkey', isOwner: true, publicKey: { n: 'uttamkey' }, username: 'uttam' },
        { id: 'poonamkey', isOwner: false, publicKey: { n: 'poonamkey' }, username: 'poonamtte' },
        { id: 'amitkey', isOwner: false, publicKey: { n: 'amitkey' }, username: 'amit' },
      ],
    });
  });
});
