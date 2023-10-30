import React, { useEffect } from "react";
import useSkill from "../store/skill";
import request from "../server";
import Skill from "../types/skill";
import SkillsCards from "../components/card/SkillsCards";
import { SchemaModel, StringType, NumberType } from "schema-typed";
import { Modal, Form, Button } from "rsuite";

import "../css/SkillPage.css";

const Skills = () => {
  const {
    user,
    skills,
    total,
    page,
    modalLoading,
    selected,
    loading,
    search,
    getSkills,
    setPage,
    setSearch,
    controlModal,
    setSelected,
    setModalLoading,
  } = useSkill();

  const [formValue, setFormValue] = React.useState<Partial<Skill>>({});
  const pageTotal = 10;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getSkills();
  }, [getSkills, user]);

  const handleFormChange = (value: Partial<Skill>) => {
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
        await request.post("skills", formValue);
      } else {
        await request.put(`skills/${selected}`, formValue);
      }
      getSkills();
      handleModalClose();
      handleClose();
      setFormValue({});
    } finally {
      setModalLoading(false);
    }
  };

  const editSkills = async (id: string) => {
    const { data } = await request.get<Skill>(`skills/${id}`);
    setFormValue(data);
    controlModal(true);
    setSelected(id);
    handleOpen();
  };

  const deleteSkills = async (id: string) => {
    const shouldDelete = window.confirm("Are you sure you want to delete?");
    if (shouldDelete) {
      await request.delete(`skills/${id}`);
      getSkills();
    }
  };

  const model = SchemaModel({
    name: StringType().isRequired("Please fill your skill name"),
    percent: NumberType().isRequired("Please fill percent"),
  });

  const totalPages = Math.ceil(total / pageTotal);

  return (
    <div>
      <input
        type="text"
        className="form-control"
        placeholder="Search skills..."
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
          <div className="totals">Skills ({total})</div>
          <div className="input-group mb-3 input-add">
            <button className="btn add-button" onClick={handleOpen}>
              Add Skills
            </button>
          </div>

          <div className="all">
            {skills.map((skill) => (
              <SkillsCards
                key={skill._id}
                editSkills={editSkills}
                deleteSkills={deleteSkills}
                skills={skill}
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
              <Modal.Title>Skills</Modal.Title>
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
                  <Form.HelpText>Enter skill name</Form.HelpText>
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Percents</Form.ControlLabel>
                  <Form.Control name="percent" />
                  <Form.HelpText>Enter skill percent</Form.HelpText>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={handleModalConfirm}
                appearance="primary"
                loading={modalLoading}
              >
                {selected === null ? "Add Skill" : "Edit Skill"}
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

export default Skills;
