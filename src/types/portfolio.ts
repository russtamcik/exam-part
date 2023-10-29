interface Portfolio {
  _id: string;
  name: string;
  url: string;
  photo: {
    _id: string;
    name: string;
    user: string;
  };
  description: string;
  user: null;
}

export default Portfolio;
