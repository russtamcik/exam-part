import React, { useEffect } from "react";
import request from "../server";

import { Modal, Form, Button } from "rsuite";
import { SchemaModel, StringType } from "schema-typed";
import useMessages from "../store/messages";
import MessagesCards from "../components/card/MessagesCard";
import Messages from "../types/messages";
const MessagesPage: React.FC = () => {
  const {
    user,
    messages,
    total,
    page,
    selected,
    loading,
    search,
    modalLoading,
    getMessages,
    setPage,
    setSearch,
    controlModal,
    setSelected,
    setModalLoading,
  } = useMessages();

  const [formValue, setFormValue] = React.useState<Partial<Messages>>({});
  const pageTotal = 10;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getMessages();
  }, [getMessages, user]);

  const handleFormChange = (value: Partial<Messages>) => {
    setFormValue(value);
  };

  const handleModalClose = () => {
    controlModal(false);
    setFormValue({});
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formRef = React.useRef<any>(null);

  const handleModalConfirm = async () => {
    try {
      setModalLoading(true);
      const isValid = formRef.current.check();
      const valueData = { ...formValue, whom: user?._id };

      if (!isValid) {
        console.error("Form error!");
        return;
      }

      if (selected === null) {
        await request.post("messages", valueData);
      } else {
        await request.put(`messages/${selected}`, valueData);
      }
      getMessages();
      handleModalClose();
      handleClose();
      setFormValue({});
    } finally {
      setModalLoading(false);
    }
  };

  const editMessages = async (id: string) => {
    const { data } = await request.get<Messages>(`messages/${id}`);
    setFormValue(data);
    controlModal(true);
    setSelected(id);
    handleOpen();
  };

  const deleteMessages = async (id: string) => {
    const shouldDelete = window.confirm("Are you sure you want to delete?");
    if (shouldDelete) {
      await request.delete(`messages/${id}`);
      getMessages();
    }
  };

  const model = SchemaModel({
    title: StringType().isRequired("Please fill your title"),
    user: StringType().isRequired("Please fill user name"),
    message: StringType().isRequired("Please fill"),
  });

  const totalPages = Math.ceil(total / pageTotal);

  return (
    <div>
      <input
        type="text"
        className="form-control"
        placeholder="Search messages..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

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
          <div className="totals">Messages ({total})</div>
          <div className="input-group mb-3 input-add">
            <button className="btn add-button" onClick={handleOpen}>
              Add Messages
            </button>
          </div>

          <div className="all">
            {messages.map((messages) => (
              <MessagesCards
                key={messages._id}
                editMessages={editMessages}
                deleteMessages={deleteMessages}
                messages={messages}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <nav>
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => setPage(page - 1)}
                    >
                      Previous
                    </button>
                  </li>
                  {[...Array(totalPages).keys()].map((pageNumber) => (
                    <li
                      key={pageNumber}
                      className={`page-item ${
                        page === pageNumber + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setPage(pageNumber + 1)}
                      >
                        {pageNumber + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      page === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setPage(page + 1)}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}

          <Modal
            open={open}
            onClose={handleClose}
            style={{ marginTop: "40px" }}
          >
            <Modal.Header>
              <Modal.Title>Experience</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                formValue={formValue}
                onChange={handleFormChange}
                ref={formRef}
                model={model}
              >
                <Form.Group>
                  <Form.ControlLabel>Title</Form.ControlLabel>
                  <Form.Control name="title" />
                  <Form.HelpText>Enter title</Form.HelpText>
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>User</Form.ControlLabel>
                  <Form.Control name="user" />
                  <Form.HelpText>Enter user</Form.HelpText>
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Message</Form.ControlLabel>
                  <Form.Control name="message" />
                  <Form.HelpText>Enter message</Form.HelpText>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={handleModalConfirm}
                appearance="primary"
                loading={modalLoading}
              >
                {selected === null ? "Add Messages" : "Edit Messages"}
              </Button>
              <Button onClick={handleClose} appearance="subtle">
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
