import { Progress } from "rsuite";

import { useEffect, useState } from "react";
import useEducation from "../store/education";
import useExperience from "../store/experience";
import usePortfolio from "../store/portfoli";
import useMessages from "../store/messages";
import useSkill from "../store/skill";

const style = {
  width: 180,
  display: "inline-block",
  marginRight: 10,
};

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const { total: educationTotal, getEducation } = useEducation();
  const { total: expiriensTotal, getExperience } = useExperience();
  const { total: portfolioTotal, getPortfolio } = usePortfolio();
  const { total: messages, getMessages } = useMessages();

  const { total: skillsTotal, getSkills } = useSkill();

  useEffect(() => {
    if (educationTotal || expiriensTotal || portfolioTotal || skillsTotal) {
      setLoading(false);
    }
    getEducation();
    getExperience();
    getPortfolio();
    getSkills();
    getMessages();
  }, [
    educationTotal,
    expiriensTotal,
    portfolioTotal,
    skillsTotal,
    messages,
    getEducation,
    getExperience,
    getPortfolio,
    getSkills,
    getMessages,
  ]);
  return (
    <div>
      {loading ? (
        <div className="typewriter">
          <div className="slide">
            <i></i>
          </div>
          <div className="paper"></div>
          <div className="keyboard"></div>
        </div>
      ) : (
        <div>
          <div style={style}>
            <Progress.Circle percent={expiriensTotal} strokeColor="info" />
            <h4 className="text-center mt-3">Experineces</h4>
          </div>
          <div style={style}>
            <Progress.Circle percent={skillsTotal} />
            <h4 className="text-center mt-3">Skills</h4>
          </div>
          <div style={style}>
            <Progress.Circle percent={educationTotal} />
            <h4 className="text-center mt-3">Educations</h4>
          </div>
          <div style={style}>
            <Progress.Circle percent={portfolioTotal} />
            <h4 className="text-center mt-3">Portfolios</h4>
          </div>
          <div style={style}>
            <Progress.Circle percent={messages} />
            <h4 className="text-center mt-3">Messages</h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
