import { useEffect } from "react";
import { Form, Input, Modal } from "antd";

import request from "../server";
import useEducation from "../store/education";
import EducationCards from "../components/card/EducationCard";
import Education from "../types/education";

const EducationPage = () => {
  const {
    user,
    education,
    total,
    page,
    isModalOpen,
    modalLoading,
    selected,
    loading,
    search,
    getEducation,
    setPage,
    setSearch,
    showModal,
    controlModal,
    setSelected,
    setModalLoading,
  } = useEducation();

  const [form] = Form.useForm();
  console.log(education);

  useEffect(() => {
    getEducation();
  }, [getEducation, user]);

  const pageTotal = 10;

  const handleOk = async () => {
    try {
      setModalLoading(true);
      const values = await form.validateFields();
      if (selected === null) {
        await request.post("education", values);
      } else {
        await request.put(`education/${selected}`, values);
      }
      getEducation();
      controlModal(false);
      form.resetFields();
    } finally {
      setModalLoading(false);
    }
  };

  const editEducation = async (id: string) => {
    const { data } = await request.get(`education/${id}`);
    form.setFieldsValue(data);
    controlModal(true);
    setSelected(id);
  };

  const deleteEducation = async (id: string) => {
    const shouldDelete = window.confirm("Are you sure you want to delete?");
    if (shouldDelete) {
      await request.delete(`education/${id}`);
      getEducation();
    }
  };

  const totalPages = Math.ceil(total / pageTotal);

  return (
    <div className="ant-modal-content">
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
        <div style={{ backgroundColor: "grey", height: "100%" }}>
          <div className="totals">Education ({total})</div>
          <div className="input-group mb-3 input-add">
            <button className="btn add-button" onClick={() => showModal(form)}>
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
            title="Education data"
            maskClosable={false}
            confirmLoading={modalLoading}
            okText={selected === null ? "Add education" : "Save education"}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={() => controlModal(false)}
          >
            <Form
              className="antd-modal"
              name="education"
              autoComplete="off"
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
              form={form}
            >
              <Form.Item<Education>
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please fill!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<Education>
                label="Level"
                name="level"
                rules={[
                  {
                    required: true,
                    message: "Please fill!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item<Education>
                label="Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please fill!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item<Education>
                label="Start Date"
                name="startDate"
                rules={[
                  {
                    required: true,
                    message: "Please fill!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item<Education>
                label="End Date"
                name="endDate"
                rules={[
                  {
                    required: true,
                    message: "Please fill!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default EducationPage;
