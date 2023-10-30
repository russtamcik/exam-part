interface Messages {
  answer: string;
  show: true;
  _id: string;
  title: string;
  message: string;
  user: string;
  whom: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
  };
}

export default Messages;
