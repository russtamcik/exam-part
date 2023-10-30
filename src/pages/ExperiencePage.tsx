import Experience from "../types/experience";
import React, { useEffect } from "react";
import useExperience from "../store/experience";
import request from "../server";
import ExperienceCards from "../components/card/ExperienceCard";

import { Modal, Form, Button } from "rsuite";
import { SchemaModel, StringType } from "schema-typed";
const ExperiencePage: React.FC = () => {
  const {
    user,
    experience,
    total,
    page,
    selected,
    loading,
    search,
    modalLoading,
    getExperience,
    setPage,
    setSearch,
    controlModal,
    setSelected,
    setModalLoading,
  } = useExperience();

  const [formValue, setFormValue] = React.useState<Partial<Experience>>({});
  const pageTotal = 10;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getExperience();
  }, [getExperience, user]);

  const handleFormChange = (value: Partial<Experience>) => {
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
      if (!isValid) {
        console.error("Form error!");
        return;
      }

      if (selected === null) {
        await request.post("experiences", formValue);
      } else {
        await request.put(`experiences/${selected}`, formValue);
      }
      getExperience();
      handleModalClose();
      handleClose();
      setFormValue({});
    } finally {
      setModalLoading(false);
    }
  };

  const editExperience = async (id: string) => {
    const { data } = await request.get<Experience>(`experiences/${id}`);
    setFormValue(data);
    controlModal(true);
    setSelected(id);
    handleOpen();
  };

  const deleteExperience = async (id: string) => {
    const shouldDelete = window.confirm("Are you sure you want to delete?");
    if (shouldDelete) {
      await request.delete(`experiences/${id}`);
      getExperience();
    }
  };

  const model = SchemaModel({
    workName: StringType().isRequired("Please fill your Work Name"),
    companyName: StringType().isRequired("Please fill your Company Name"),
    description: StringType().isRequired("Please fill"),
    startDate: StringType().isRequired("Please enter your Start Date"),
    endDate: StringType().isRequired("Please enter your End Date"),
  });

  const totalPages = Math.ceil(total / pageTotal);

  return (
    <div>
      <input
        type="text"
        className="form-control"
        placeholder="Search experience..."
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
          <div className="totals">Experiences ({total})</div>
          <div className="input-group mb-3 input-add">
            <button className="btn add-button" onClick={handleOpen}>
              Add Experience
            </button>
          </div>

          <div className="all">
            {experience.map((experience) => (
              <ExperienceCards
                key={experience._id}
                editExperience={editExperience}
                deleteExperience={deleteExperience}
                experience={experience}
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
                  <Form.ControlLabel>Work Name</Form.ControlLabel>
                  <Form.Control name="workName" />
                  <Form.HelpText>Enter work name</Form.HelpText>
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Company Name</Form.ControlLabel>
                  <Form.Control name="companyName" />
                  <Form.HelpText>Enter company name</Form.HelpText>
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Description</Form.ControlLabel>
                  <Form.Control
                    name="description"
                    componentClass="textarea"
                    rows={5}
                  />
                  <Form.HelpText>Enter description name</Form.HelpText>
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Sart Date</Form.ControlLabel>
                  <Form.Control name="startDate" />
                  <Form.HelpText>Enter start date</Form.HelpText>
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Endt Date</Form.ControlLabel>
                  <Form.Control name="endDate" />
                  <Form.HelpText>Enter end date</Form.HelpText>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={handleModalConfirm}
                appearance="primary"
                loading={modalLoading}
              >
                {selected === null ? "Add Experience" : "Edit Experience"}
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

export default ExperiencePage;
