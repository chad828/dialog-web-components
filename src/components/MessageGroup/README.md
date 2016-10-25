Basic MessageGroup:

```
const React = require('react');
const messages = require('./messages.json');
const IconButton = require('../IconButton/IconButton').default;

initialState = {
  messages,
  sender: {
    peer: {
      type: 'user',
      id: 1709029441,
      key: 'u1709029441'
    },
    title: 'Oleg Shilov',
    userName: 'olegshilov',
    avatar: 'https://storage.googleapis.com/prod-dlg-storage/8ac7b690efe8ef8c76635d54d68…3GWv1%2B7qrceCx9obFQUWMpdJb3r2ZYKzq4G%2FVqNLlrvBEKi8BDhTd%2BSnHxvZ3w%3D%3D',
    placeholder: 'lblue'
  },
  timestamp: "12:10",
  state: 'read',
  renderActions: () => {
    return [
      <IconButton
        key="1"
        glyph="delete"
        onClick={() => {}}
      />
    ];
  }
};

<MessageGroup {...state} />
```
