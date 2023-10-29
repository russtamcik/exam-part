import Skill from "../../types/skill";
import "../../css/skillcard.css";
interface SkillsCardProps {
  skills: Skill;
  editSkills: (id: string) => void;
  deleteSkills: (id: string) => void;
}

const SkillsCards = ({ skills, editSkills, deleteSkills }: SkillsCardProps) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{skills.name}</h5>
        <p className="card-text">Percent: {skills.percent}</p>
        <div className="knop">
          <button
            className="btn btn-primary"
            onClick={() => editSkills(skills._id)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => deleteSkills(skills._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillsCards;
