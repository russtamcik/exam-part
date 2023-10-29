import Education from "../../types/education";

interface EducationCardProps {
  education: Education;
  editEducation: (id: string) => void;
  deleteEducation: (id: string) => void;
}

const EducationCards = ({
  education,
  editEducation,
  deleteEducation,
}: EducationCardProps) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{education.name}</h5>
        <p className="card-text">Level: {education.level}</p>
        <p className="card-text">Description: {education.description}</p>
        <p className="text-decoration-underline">
          Start Date: {education.startDate.split("T")[0]}
        </p>
        <p className="text-decoration-underline">
          End Date: {education.endDate.split("T")[0]}
        </p>
        <div className="knop">
          <button
            className="btn btn-primary"
            onClick={() => editEducation(education._id)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => deleteEducation(education._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EducationCards;
