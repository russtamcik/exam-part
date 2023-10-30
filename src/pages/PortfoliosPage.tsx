import React, { useEffect, useState } from "react";

import request from "../server";

import PortfolioCards from "../components/card/PortfolioCard";
import Portfolio from "../types/portfolio";
import usePortfolio from "../store/portfoli";
import { Modal, Form, Button, Uploader } from "rsuite";
import { SchemaModel, StringType } from "schema-typed";

const PortfolioPage = () => {
  const {
    user,
    portfolios,
    total,
    page,

    modalLoading,
    selected,
    loading,
    search,
    getPortfolio,
    setPage,
    setSearch,

    controlModal,
    setSelected,
    setModalLoading,
  } = usePortfolio();

  const [formValue, setFormValue] = React.useState<Partial<Portfolio>>({});
  const pageTotal = 10;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    getPortfolio();
  }, [getPortfolio, user]);

  const handleFormChange = (value: Partial<Portfolio>) => {
    setFormValue(value);
  };

  const handleModalClose = () => {
    controlModal(false);
    setFormValue({});
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePhotoUpload = (fileList: string | any[]) => {
    if (fileList.length > 0) {
      const file = fileList[0];
      setPhotoFile(file.blobFile); // Save the uploaded file
    }
  };

  const handleSubmit = () => {
    // Perform form submission logic here
    console.log("Uploaded photo:", photoFile);
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
        await request.post("portfolios", formValue);
      } else {
        await request.put(`portfolios/${selected}`, formValue);
      }
      getPortfolio();
      handleModalClose();
      handleClose();
      setFormValue({});
    } finally {
      setModalLoading(false);
    }
  };

  const editPortfolio = async (id: string) => {
    const { data } = await request.get<Portfolio>(`portfolios/${id}`);
    setFormValue(data);
    controlModal(true);
    setSelected(id);
    handleOpen();
  };

  const deletePortfolio = async (id: string) => {
    const shouldDelete = window.confirm("Are you sure you want to delete?");
    if (shouldDelete) {
      await request.delete(`portfolios/${id}`);
      getPortfolio();
    }
  };

  const model = SchemaModel({
    name: StringType().isRequired("Please fill your portfolio Name"),
    url: StringType().isRequired("Please fill email"),
    description: StringType().isRequired("Please fill description"),
  });

  const totalPages = Math.ceil(total / pageTotal);

  return (
    <div>
      <input
        type="text"
        className="form-control"
        placeholder="Search protfolio..."
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
          <div className="totals">Protfolio ({total})</div>
          <div className="input-group mb-3 input-add">
            <button className="btn add-button" onClick={handleOpen}>
              Add Protfolio
            </button>
          </div>

          <div className="all">
            {portfolios.map((portfolio) => (
              <PortfolioCards
                key={portfolio._id}
                editPortfolio={editPortfolio}
                deletePortfolio={deletePortfolio}
                portfolios={portfolio}
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
              <Modal.Title>Portfolios</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                formValue={formValue}
                onChange={handleFormChange}
                ref={formRef}
                model={model}
                onSubmit={handleSubmit}
              >
                <Form.Group>
                  <Form.ControlLabel>Portfolio Name</Form.ControlLabel>
                  <Form.Control name="name" />
                  <Form.HelpText>Enter portfolio name</Form.HelpText>
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Url</Form.ControlLabel>
                  <Form.Control name="url" />
                  <Form.HelpText>Enter url</Form.HelpText>
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
                {/* <Form.Group controlId="uploader">
                  <Form.ControlLabel>Photo</Form.ControlLabel>
                  <Form.Control name="photo" accepter={Uploader} action="#" />
                </Form.Group> */}
                <Form.Group>
                  <Form.ControlLabel>Upload Photo</Form.ControlLabel>
                  <Uploader
                    name="photo"
                    fileListVisible={false}
                    onChange={handlePhotoUpload}
                    action=""
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={handleModalConfirm}
                appearance="primary"
                loading={modalLoading}
              >
                {selected === null ? "Add Protfolio" : "Edit Protfolio"}
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

export default PortfolioPage;
