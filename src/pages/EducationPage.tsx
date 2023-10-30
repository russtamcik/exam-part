import { useEffect } from "react";
import React from "react";

import request from "../server";
import useEducation from "../store/education";
import EducationCards from "../components/card/EducationCard";
import Education from "../types/education";
import { SchemaModel, StringType } from "schema-typed";
import { Modal, Form, Button } from "rsuite";

const EducationPage = () => {
  const {
    user,
    education,
    total,
    page,
    modalLoading,
    selected,
    loading,
    search,
    getEducation,
    setPage,
    setSearch,
    controlModal,
    setSelected,
    setModalLoading,
  } = useEducation();

  const [formValue, setFormValue] = React.useState<Partial<Education>>({});
  const pageTotal = 10;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getEducation();
  }, [getEducation, user]);

  const handleFormChange = (value: Partial<Education>) => {
    setFormValue(value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formRef = React.useRef<any>(null);

  const handleModalClose = () => {
    controlModal(false);
    setFormValue({});
  };

  const handleModalConfirm = async () => {
    try {
      setModalLoading(true);
      const isValid = formRef.current.check();
      if (!isValid) {
        console.error("Form error!");
        return;
      }

      if (selected === null) {
        await request.post("education", formValue);
      } else {
        await request.put(`education/${selected}`, formValue);
      }
      getEducation();
      handleModalClose();
      handleClose();
      setFormValue({});
    } finally {
      setModalLoading(false);
    }
  };

  const editEducation = async (id: string) => {
    const { data } = await request.get<Education>(`education/${id}`);
    setFormValue(data);
    controlModal(true);
    setSelected(id);
    handleOpen();
  };

  const deleteEducation = async (id: string) => {
    const shouldDelete = window.confirm("Are you sure you want to delete?");
    if (shouldDelete) {
      await request.delete(`education/${id}`);
      getEducation();
    }
  };

  const model = SchemaModel({
    name: StringType().isRequired("Please fill your education name"),
    level: StringType().isRequired("Please fill education level"),
    description: StringType().isRequired("Please fill education level"),
    startDate: StringType().isRequired("Please fill start date"),
    endDate: StringType().isRequired("Please fill endt date"),
  });

  const totalPages = Math.ceil(total / pageTotal);

  return (
    <div>
      <input
        type="text"
        className="form-control"
        placeholder="Search education..."
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
          <div className="totals">Education ({total})</div>
          <div className="input-group mb-3 input-add">
            <button className="btn add-button" onClick={handleOpen}>
              Add Education
            </button>
          </div>

          <div className="all">
            {education.map((education) => (
              <EducationCards
                key={education._id}
                editEducation={editEducation}
                deleteEducation={deleteEducation}
                education={education}
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
              <Modal.Title>Education</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                formValue={formValue}
                onChange={handleFormChange}
                ref={formRef}
                model={model}
              >
                <Form.Group>
                  <Form.ControlLabel>Name</Form.ControlLabel>
                  <Form.Control name="name" />
                  <Form.HelpText>Enter education name</Form.HelpText>
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Level</Form.ControlLabel>
                  <Form.Control name="level" />
                  <Form.HelpText>Enter education level</Form.HelpText>
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Description</Form.ControlLabel>
                  <Form.Control name="description" />
                  <Form.HelpText>Enter education description</Form.HelpText>
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Start Date</Form.ControlLabel>
                  <Form.Control name="startDate" />
                  <Form.HelpText>Enter start date</Form.HelpText>
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>End Date</Form.ControlLabel>
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
                {selected === null ? "Add Education" : "Edit Education"}
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

export default EducationPage;
