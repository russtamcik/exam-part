import Portfolio from "../../types/portfolio";
import "../../css/portfolio.css";

interface PortfolioCardProps {
  portfolios: Portfolio;
  editPortfolio: (id: string) => void;
  deletePortfolio: (id: string) => void;
}

const PortfolioCards = ({
  portfolios,
  editPortfolio,
  deletePortfolio,
}: PortfolioCardProps) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{portfolios.name}</h5>
        <p className="card-text">
          Level: <a href={portfolios.url}>{portfolios.url}</a>
        </p>
        <p className="card-text">Description: {portfolios.description}</p>
        <div className="port">
          <img
            src={`https://ap-portfolio-backend.up.railway.app/upload/${
              portfolios.photo._id
            }.${portfolios.photo.name.split(".")[1]}`}
            alt="img"
          />
        </div>
        <div className="knop">
          <button
            className="btn btn-primary"
            onClick={() => editPortfolio(portfolios._id)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => deletePortfolio(portfolios._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCards;
