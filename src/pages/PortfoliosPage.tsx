import { useEffect } from "react";
import { Button, Form, Input, Modal, Upload } from "antd";

import request from "../server";

import PortfolioCards from "../components/card/PortfolioCard";
import Portfolio from "../types/portfolio";
import usePortfolio from "../store/portfoli";
import { UploadOutlined } from "@mui/icons-material";

const PortfolioPage = () => {
  const {
    user,
    portfolios,
    total,
    page,
    isModalOpen,
    modalLoading,
    selected,
    loading,
    search,
    getPortfolio,
    setPage,
    setSearch,
    showModal,
    controlModal,
    setSelected,
    setModalLoading,
  } = usePortfolio();

  const [form] = Form.useForm();
  console.log(portfolios);

  useEffect(() => {
    getPortfolio();
  }, [getPortfolio, user]);

  const pageTotal = 10;

  const handleOk = async () => {
    try {
      setModalLoading(true);
      const values = await form.validateFields();
      if (selected === null) {
        await request.post("portfolios", values);
      } else {
        await request.put(`portfolios/${selected}`, values);
      }
      getPortfolio();
      controlModal(false);
      form.resetFields();
    } finally {
      setModalLoading(false);
    }
  };

  const editPortfolio = async (id: string) => {
    const { data } = await request.get(`portfolios/${id}`);
    form.setFieldsValue(data);
    controlModal(true);
    setSelected(id);
  };

  const deletePortfolio = async (id: string) => {
    const shouldDelete = window.confirm("Are you sure you want to delete?");
    if (shouldDelete) {
      await request.delete(`portfolios/${id}`);
      getPortfolio();
    }
  };

  const handleImageUpload = (file: File | null) => {
    console.log("Uploaded file:", file);
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
            {portfolios.map((portfolios: Portfolio) => (
              <PortfolioCards
                key={portfolios._id}
                editPortfolio={editPortfolio}
                deletePortfolio={deletePortfolio}
                portfolios={portfolios}
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
            title="Portfolio data"
            maskClosable={false}
            confirmLoading={modalLoading}
            okText={selected === null ? "Add portfolio" : "Save portfolio"}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={() => controlModal(false)}
          >
            <Form
              className="antd-modal"
              name="portfolio"
              autoComplete="off"
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
              form={form}
            >
              <Form.Item<Portfolio>
                label="Portfolio Name"
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

              <Form.Item<Portfolio>
                label="Portfolio Url"
                name="url"
                rules={[
                  {
                    required: true,
                    message: "Please fill!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<Portfolio>
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
              <Form.Item<Portfolio> label="Image" name="photo">
                <Upload beforeUpload={handleImageUpload} accept="image/*">
                  <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
