// import { useEffect } from "react";
// import { Form, Input, Modal } from "antd";

// import useExperience from "../store/experience";

// import ExperienceCards from "../components/card/ExperienceCard";
// import request from "../server";
// // import { Modal, Button, ButtonToolbar, Placeholder } from "rsuite";
// import Experience from "../types/experience";

// const ExperiencePage = () => {
//   const {
//     user,
//     experience,
//     total,
//     page,
//     isModalOpen,
//     modalLoading,
//     selected,
//     loading,
//     search,
//     getExperience,
//     setPage,
//     setSearch,
//     showModal,
//     controlModal,
//     setSelected,
//     setModalLoading,
//   } = useExperience();

//   const [form] = Form.useForm();
//   console.log(experience);
//   // const [open, setOpen] = React.useState(false);
//   // const handleOpen = () => setOpen(true);
//   // const handleClose = () => setOpen(false);

//   useEffect(() => {
//     getExperience();
//   }, [getExperience, user]);

//   const pageTotal = 10;

//   const handleOk = async () => {
//     try {
//       setModalLoading(true);
//       const values = await form.validateFields();
//       if (selected === null) {
//         await request.post("experiences", values);
//       } else {
//         await request.put(`experiences/${selected}`, values);
//       }
//       getExperience();
//       controlModal(false);
//       form.resetFields();
//     } finally {
//       setModalLoading(false);
//     }
//   };

//   const editExperience = async (id: string) => {
//     const { data } = await request.get(`experiences/${id}`);
//     form.setFieldsValue(data);
//     controlModal(true);
//     setSelected(id);
//   };

//   const deleteExperience = async (id: string) => {
//     await request.delete(`experiences/${id}`);
//     getExperience();
//   };

//   const totalPages = Math.ceil(total / pageTotal);

//   return (
//     <div className="ant-modal-content">
//       <input
//         type="text"
//         className="form-control"
//         placeholder="Search experience..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />
//       {loading ? (
//         <div className="typewriter">
//           <div className="slide">
//             <i></i>
//           </div>
//           <div className="paper"></div>
//           <div className="keyboard"></div>
//         </div>
//       ) : (
//         <div style={{ backgroundColor: "grey", height: "100%" }}>
//           <div className="totals">Experiences ({total})</div>
//           <div className="input-group mb-3 input-add">
//             <button className="btn add-button" onClick={() => showModal(form)}>
//               Add Experiences
//             </button>
//           </div>

//           <div className="all">
//             {experience.map((experience) => (
//               <ExperienceCards
//                 key={experience._id}
//                 editExperience={editExperience}
//                 deleteExperience={deleteExperience}
//                 experience={experience}
//               />
//             ))}
//           </div>

//           {totalPages > 1 && (
//             <div className="pagination">
//               <nav>
//                 <ul className="pagination justify-content-center">
//                   <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
//                     <button
//                       className="page-link"
//                       onClick={() => setPage(page - 1)}
//                     >
//                       Previous
//                     </button>
//                   </li>
//                   {[...Array(totalPages).keys()].map((pageNumber) => (
//                     <li
//                       key={pageNumber}
//                       className={`page-item ${
//                         page === pageNumber + 1 ? "active" : ""
//                       }`}
//                     >
//                       <button
//                         className="page-link"
//                         onClick={() => setPage(pageNumber + 1)}
//                       >
//                         {pageNumber + 1}
//                       </button>
//                     </li>
//                   ))}
//                   <li
//                     className={`page-item ${
//                       page === totalPages ? "disabled" : ""
//                     }`}
//                   >
//                     <button
//                       className="page-link"
//                       onClick={() => setPage(page + 1)}
//                     >
//                       Next
//                     </button>
//                   </li>
//                 </ul>
//               </nav>
//             </div>
//           )}

//           {/* <ButtonToolbar>
//             <Button onClick={handleOpen}> Open</Button>
//           </ButtonToolbar>

//           <Modal open={open} onClose={handleClose}>
//             <Modal.Header>
//               <Modal.Title>Modal Title</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <Form>
//                 <Form.Group controlId="name">
//                   <Form.ControlLabel>Username</Form.ControlLabel>
//                   <Form.Control name="name" />
//                   <Form.HelpText>Username is required</Form.HelpText>
//                 </Form.Group>
//               </Form>
//             </Modal.Body>
//             <Modal.Footer>
//               <Button onClick={handleClose} appearance="primary">
//                 Ok
//               </Button>
//               <Button onClick={handleClose} appearance="subtle">
//                 Cancel
//               </Button>
//             </Modal.Footer>
//           </Modal> */}
//           <Modal
//             title="Experience data"
//             maskClosable={false}
//             confirmLoading={modalLoading}
//             okText={selected === null ? "Add experience" : "Save experience"}
//             open={isModalOpen}
//             onOk={handleOk}
//             onCancel={() => controlModal(false)}
//           >
//             <Form
//               className="antd-modal"
//               name="experience"
//               autoComplete="off"
//               labelCol={{
//                 span: 24,
//               }}
//               wrapperCol={{
//                 span: 24,
//               }}
//               form={form}
//             >
//               <Form.Item<Experience>
//                 label="Work Name"
//                 name="workName"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please fill!",
//                   },
//                 ]}
//               >
//                 <Input />
//               </Form.Item>

//               <Form.Item<Experience>
//                 label="Company Name"
//                 name="companyName"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please fill!",
//                   },
//                 ]}
//               >
//                 <Input />
//               </Form.Item>
//               <Form.Item<Experience>
//                 label="Description"
//                 name="description"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please fill!",
//                   },
//                 ]}
//               >
//                 <Input />
//               </Form.Item>
//               <Form.Item<Experience>
//                 label="Start Date"
//                 name="startDate"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please fill!",
//                   },
//                 ]}
//               >
//                 <Input />
//               </Form.Item>
//               <Form.Item<Experience>
//                 label="End Date"
//                 name="endDate"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please fill!",
//                   },
//                 ]}
//               >
//                 <Input />
//               </Form.Item>
//             </Form>
//           </Modal>
//           <></>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExperiencePage;

import Experience from "../types/experience";
import React, { useEffect } from "react";
import useExperience from "../store/experience";
import request from "../server";
import ExperienceCards from "../components/card/ExperienceCard";
import FormGroup from "rsuite/esm/FormGroup";
import FormControl from "rsuite/esm/FormControl";
import FormControlLabel from "rsuite/esm/FormControlLabel";
import { Modal, Form, Button } from "rsuite";

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

  const handleModalConfirm = async () => {
    try {
      setModalLoading(true);
      if (selected === null) {
        await request.post("experiences", formValue);
      } else {
        await request.put(`experiences/${selected}`, formValue);
      }
      getExperience();
      handleModalClose();
      // controlModal(false);
    } finally {
      setModalLoading(false);
    }
  };

  const editExperience = async (id: string) => {
    const { data } = await request.get<Experience>(`experiences/${id}`);
    setFormValue(data);
    controlModal(true);
    setSelected(id);
    console.log(id);
  };

  const deleteExperience = async (id: string) => {
    await request.delete(`experiences/${id}`);
    getExperience();
  };

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
              <Form formValue={formValue} onChange={handleFormChange}>
                <FormGroup>
                  <FormControlLabel>Work Name</FormControlLabel>
                  <FormControl name="workName" />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel>Company Name</FormControlLabel>
                  <FormControl name="companyName" />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel>Description</FormControlLabel>
                  <FormControl
                    name="description"
                    componentClass="textarea"
                    rows={5}
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel>Sart Date</FormControlLabel>
                  <FormControl name="startDate" />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel>Endt Date</FormControlLabel>
                  <FormControl name="endDate" />
                </FormGroup>
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
              <Button onClick={handleModalClose} appearance="subtle">
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
