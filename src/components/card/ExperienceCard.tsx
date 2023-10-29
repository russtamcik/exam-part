import Experience from "../../types/experience";

interface ExperienceCardProps {
  experience: Experience;
  editExperience: (id: string) => void;
  deleteExperience: (id: string) => void;
}

const ExperienceCards = ({
  experience,
  editExperience,
  deleteExperience,
}: ExperienceCardProps) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{experience.workName}</h5>
        <p className="card-text">Company Name: {experience.companyName}</p>
        <p className="card-text">Description: {experience.description}</p>
        <p className="text-decoration-underline">
          Start Date: {experience.startDate.split("T")[0]}
        </p>
        <p className="text-decoration-underline">
          End Date: {experience.endDate.split("T")[0]}
        </p>
        <div className="knop">
          <button
            className="btn btn-primary"
            onClick={() => editExperience(experience._id)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => deleteExperience(experience._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCards;
