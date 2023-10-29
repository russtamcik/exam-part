import { useEffect } from "react";
import { Form, Input, Modal } from "antd";
import useSkill from "../store/skill";
import request from "../server";
import Skill from "../types/skill";
import SkillsCards from "../components/card/SkillsCards";

import "../css/SkillPage.css";

const Skills = () => {
  const {
    user,
    skills,
    total,
    page,
    isModalOpen,
    modalLoading,
    selected,
    loading,
    search,
    getSkills,
    setPage,
    setSearch,
    showModal,
    controlModal,
    setSelected,
    setModalLoading,
  } = useSkill();

  const [form] = Form.useForm();

  useEffect(() => {
    getSkills();
  }, [getSkills, user]);

  const pageTotal = 10;

  const handleOk = async () => {
    try {
      setModalLoading(true);
      const values = await form.validateFields();
      if (selected === null) {
        await request.post("skills", values);
      } else {
        await request.put(`skills/${selected}`, values);
      }
      getSkills();
      controlModal(false);
      form.resetFields();
    } finally {
      setModalLoading(false);
    }
  };

  const editSkills = async (id: string) => {
    const { data } = await request.get(`skills/${id}`);
    form.setFieldsValue(data);
    controlModal(true);
    setSelected(id);
  };

  const deleteSkills = async (id: string) => {
    await request.delete(`skills/${id}`);
    getSkills();
  };

  const totalPages = Math.ceil(total / pageTotal);

  return (
    <div className="ant-modal-content">
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
        <div style={{ backgroundColor: "grey", height: "100%" }}>
          <div className="totals">Skills ({total})</div>
          <div className="input-group mb-3 input-add">
            <button className="btn add-button" onClick={() => showModal(form)}>
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
            title="Skills data"
            maskClosable={false}
            confirmLoading={modalLoading}
            okText={selected === null ? "Add skill" : "Save skill"}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={() => controlModal(false)}
          >
            <Form
              className="antd-modal"
              name="category"
              autoComplete="off"
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
              form={form}
            >
              <Form.Item<Skill>
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

              <Form.Item<Skill>
                label="Percent"
                name="percent"
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

export default Skills;
