import Messages from "../../types/messages";

interface MessagesCardProps {
  messages: Messages;
  editMessages: (id: string) => void;
  deleteMessages: (id: string) => void;
}

const userId = localStorage.getItem("PORTFOLIO_USER")
  ? JSON.parse(localStorage.getItem("PORTFOLIO_USER") || "")
  : null;

const MessagesCards = ({
  messages,
  editMessages,
  deleteMessages,
}: MessagesCardProps) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Answers: {messages.answer}</h5>
        <p className="card-text">Messages title: {messages.title}</p>
        <p className="card-text">User: {messages.user}</p>
        <p className="card-text">Message: {messages.message}</p>

        <div className="knop">
          {userId.role === "client" ? (
            ""
          ) : (
            <div>
              <button
                className="btn btn-primary"
                onClick={() => editMessages(messages._id)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => deleteMessages(messages._id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesCards;
