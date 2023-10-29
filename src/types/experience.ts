import User from "./user";

interface Experience {
  _id: string;
  companyName: string;
  workName: string;
  description: string;
  startDate: string;
  endDate: string;
  user: User;
}

export default Experience;
