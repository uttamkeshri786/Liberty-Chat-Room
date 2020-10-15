import reducer from './activities';

describe('Activities reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      items: [],
    });
  });

  it('should handle CLEAR_ACTVITIES', () => {
    expect(reducer({ items: [{}, {}] }, { type: 'CLEAR_ACTIVITIES' })).toEqual({
      items: [],
    });
  });

  it('should handle SEND_ENCRYPTED_MESSAGE_SLASH_COMMAND', () => {
    expect(
      reducer({ items: [] }, { type: 'SEND_ENCRYPTED_MESSAGE_SLASH_COMMAND', payload: { payload: 'content' } }),
    ).toEqual({ items: [{ payload: 'content', type: 'SLASH_COMMAND' }] });
  });

  it('should handle SEND_ENCRYPTED_MESSAGE_FILE_TRANSFER', () => {
    expect(
      reducer({ items: [] }, { type: 'SEND_ENCRYPTED_MESSAGE_FILE_TRANSFER', payload: { payload: 'content' } }),
    ).toEqual({ items: [{ payload: 'content', type: 'FILE' }] });
  });

  it('should handle SEND_ENCRYPTED_MESSAGE_TEXT_MESSAGE', () => {
    expect(
      reducer({ items: [] }, { type: 'SEND_ENCRYPTED_MESSAGE_TEXT_MESSAGE', payload: { payload: 'content' } }),
    ).toEqual({ items: [{ payload: 'content', type: 'TEXT_MESSAGE' }] });
  });

  it('should handle RECEIVE_ENCRYPTED_MESSAGE_TEXT_MESSAGE', () => {
    expect(
      reducer(
        { items: [] },
        { type: 'RECEIVE_ENCRYPTED_MESSAGE_TEXT_MESSAGE', payload: { payload: { payload: 'content' } } },
      ),
    ).toEqual({ items: [{ payload: 'content', type: 'TEXT_MESSAGE' }] });
  });

  it('should handle SEND_ENCRYPTED_MESSAGE_SEND_FILE', () => {
    expect(
      reducer({ items: [] }, { type: 'SEND_ENCRYPTED_MESSAGE_SEND_FILE', payload: { payload: 'content' } }),
    ).toEqual({ items: [{ payload: 'content', type: 'SEND_FILE' }] });
  });

  it('should handle RECEIVE_ENCRYPTED_MESSAGE_SEND_FILE', () => {
    expect(
      reducer(
        { items: [] },
        { type: 'RECEIVE_ENCRYPTED_MESSAGE_SEND_FILE', payload: { payload: { message: 'content' } } },
      ),
    ).toEqual({ items: [{ message: 'content', type: 'RECEIVE_FILE' }] });
  });

  it('should handle RECEIVE_ENCRYPTED_MESSAGE_ADD_USER', () => {
    const payload1 = {
      payload: { content: 'content', id: 'iduttam', username: 'uttam' },
      state: {
        room: {
          members: [{ id: 'idamit' }],
        },
      },
    };
    expect(reducer({ items: [] }, { type: 'RECEIVE_ENCRYPTED_MESSAGE_ADD_USER', payload: payload1 })).toEqual({
      items: [{ type: 'USER_ENTER', userId: 'iduttam', username: 'uttam' }],
    });

    // Test already reveived user
    const payload2 = {
      payload: { content: 'content', id: 'iduttam', username: 'uttam' },
      state: {
        room: {
          members: [{ id: 'iduttam' }],
        },
      },
    };
    expect(reducer({ items: [] }, { type: 'RECEIVE_ENCRYPTED_MESSAGE_ADD_USER', payload: payload2 })).toEqual({
      items: [],
    });
  });

  it('should handle USER_EXIT', () => {
    expect(reducer({ items: [] }, { type: 'USER_EXIT', payload: { id: 'iduttam', username: 'uttam' } })).toEqual({
      items: [{ type: 'USER_EXIT', userId: 'iduttam', username: 'uttam' }],
    });
    // Without id
    expect(reducer({ items: [] }, { type: 'USER_EXIT', payload: { username: 'uttam' } })).toEqual({
      items: [],
    });
  });

  it('should handle TOGGLE_LOCK_ROOM', () => {
    expect(
      reducer(
        { items: [] },
        { type: 'TOGGLE_LOCK_ROOM', payload: { id: 'iduttam', username: 'uttam', locked: true, sender: 'uttam' } },
      ),
    ).toEqual({
      items: [{ locked: true, sender: 'uttam', type: 'TOGGLE_LOCK_ROOM', userId: 'iduttam', username: 'uttam' }],
    });
  });

  it('should handle RECEIVE_TOGGLE_LOCK_ROOM', () => {
    expect(
      reducer(
        { items: [] },
        { type: 'RECEIVE_TOGGLE_LOCK_ROOM', payload: { id: 'iduttam', username: 'uttam', locked: true, sender: 'uttam' } },
      ),
    ).toEqual({
      items: [{ locked: true, sender: 'uttam', type: 'TOGGLE_LOCK_ROOM', userId: 'iduttam', username: 'uttam' }],
    });
  });

  it('should handle SHOW_NOTICE', () => {
    expect(reducer({ items: [] }, { type: 'SHOW_NOTICE', payload: { message: 'Hello wordld!' } })).toEqual({
      items: [{ message: 'Hello wordld!', type: 'NOTICE' }],
    });
  });

  it('should handle SEND_ENCRYPTED_MESSAGE_CHANGE_USERNAME', () => {
    const payload1 = { currentUsername: 'uttam', newUsername: 'amit', sender: 'uttam' };
    expect(
      reducer(
        {
          items: [
            { sender: 'uttam', username: 'uttam' },
            { sender: 'poonam', username: 'poonam' },
          ],
        },
        { type: 'SEND_ENCRYPTED_MESSAGE_CHANGE_USERNAME', payload: payload1 },
      ),
    ).toEqual({
      items: [
        { sender: 'uttam', username: 'amit' },
        { sender: 'poonam', username: 'poonam' },
        { currentUsername: 'uttam', newUsername: 'amit', type: 'CHANGE_USERNAME' },
      ],
    });
  });

  it('should handle RECEIVE_ENCRYPTED_MESSAGE_CHANGE_USERNAME', () => {
    const payload1 = { payload: { currentUsername: 'uttam', newUsername: 'amit', sender: 'uttam' } };
    expect(
      reducer(
        {
          items: [
            { sender: 'uttam', username: 'uttam', type: 'USER_ACTION' },
            { sender: 'uttam', username: 'uttam', type: 'TEXT_MESSAGE' },
            { sender: 'uttam', username: 'uttam', type: 'ANOTHER_TYPE' },
            { sender: 'poonam', username: 'poonam' },
          ],
        },
        { type: 'RECEIVE_ENCRYPTED_MESSAGE_CHANGE_USERNAME', payload: payload1 },
      ),
    ).toEqual({
      items: [
        { sender: 'uttam', type: 'USER_ACTION', username: 'amit' },
        { sender: 'uttam', type: 'TEXT_MESSAGE', username: 'amit' },
        { sender: 'uttam', type: 'ANOTHER_TYPE', username: 'uttam' },
        { sender: 'poonam', username: 'poonam' },
        { currentUsername: 'uttam', newUsername: 'amit', type: 'CHANGE_USERNAME' },
      ],
    });
  });

  it('should handle SEND_ENCRYPTED_MESSAGE_USER_ACTION', () => {
    expect(
      reducer({ items: [] }, { type: 'SEND_ENCRYPTED_MESSAGE_USER_ACTION', payload: { message: 'Hello wordld!' } }),
    ).toEqual({ items: [{ message: 'Hello wordld!', type: 'USER_ACTION' }] });
  });

  it('should handle RECEIVE_ENCRYPTED_MESSAGE_USER_ACTION', () => {
    expect(
      reducer(
        { items: [] },
        { type: 'RECEIVE_ENCRYPTED_MESSAGE_USER_ACTION', payload: { payload: { message: 'Hello wordld!' } } },
      ),
    ).toEqual({ items: [{ message: 'Hello wordld!', type: 'USER_ACTION' }] });
  });
});
