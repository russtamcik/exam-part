import User from "./user";

interface Skill {
  _id: string;
  name: string;
  percent: number;
  user: User;
}

export default Skill;
