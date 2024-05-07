import React, { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { logout } from "../../actions/userActions";
import Header from "../../components/Header/Header";
import journals from "../../data.js";
import Sidebar from "../../components/Sidebar/Sidebar";
import { listGroup } from "../../actions/journalActions";

const SelectDateModal = ({
  show,
  onHide,
  onApply,
  setShowModal,
  setShowAll,
}) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Select Month and Year</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="monthSelect" style={{ marginBottom: "5%" }}>
            <Form.Label>Month</Form.Label>
            <Form.Control
              as="select"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString("default", { month: "long" })}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="yearSelect">
            <Form.Label>Year</Form.Label>
            <Form.Control
              as="select"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              {Array.from(new Array(30), (_, i) => (
                <option key={i} value={new Date().getFullYear() - i}>
                  {new Date().getFullYear() - i}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={() => onApply(year, month)}>
          Apply
        </Button>
        <Button
          variant="info"
          onClick={() => {
            setShowModal(false);
            setShowAll(true);
          }}
        >
          Show All
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const GroupPage = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const journalGroup = useSelector((state) => state.journalGroup);
  const { loading, journals, error } = journalGroup;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredJournals, setFilteredJournals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    if (showAll) {
      setFilteredJournals(journals);
    } else {
      const filtered = journals.filter((journal) => {
        const journalDate = new Date(journal.createdAt);
        return (
          journalDate.getFullYear() === selectedDate.getFullYear() &&
          journalDate.getMonth() === selectedDate.getMonth()
        );
      });
      setFilteredJournals(filtered);
    }
  }, [journals, selectedDate, showAll]);

  useEffect(() => {
    console.log(id);
    dispatch(listGroup(id));
    if (!userInfo) {
      nav("/");
    }
  }, [userInfo, nav]);

  useEffect(() => {
    if (journals?.length) {
      const now = new Date();
      setSelectedDate(new Date(now.getFullYear(), now.getMonth()));
    }
  }, [journals]);

  const handleApply = (year, month) => {
    setSelectedDate(new Date(year, month - 1));
    setShowAll(false);
    setShowModal(false);
  };

  // const logoutHandle = async() => {
  //   dispatch(logout());
  //   nav("/");
  // }

  const formatDate = (date) => {
    let dateString = date + "";
    let dateF = new Date(dateString);

    let formattedDate = dateF.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return formattedDate;
  };

  const formatDateMonth = (date) => {
    let dateString = date + "";
    let dateF = new Date(dateString);

    let formattedDate = dateF.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });

    return formattedDate;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        // alignItems: "center",
      }}
    >
      <Sidebar />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          alignItems: "center",
          flex: 0.8,
          marginBottom: "5%",
        }}
      >
        <div onClick={() => setShowModal(true)} className="dateButton">
          {showAll ? "Filter" : `${formatDateMonth(selectedDate)}`}
        </div>
        <SelectDateModal
          show={showModal}
          onHide={() => setShowModal(false)}
          onApply={handleApply}
          setShowModal={setShowModal} // Pass setShowModal as a prop
          setShowAll={setShowAll} // Pass setShowAll as a prop
        />

        {filteredJournals
          ?.slice()
          .reverse()
          .map((note) => (
            <Accordion
              defaultActiveKey={["0"]}
              style={{ width: "75vw", maxWidth: "75vw" }}
            >
              <Accordion.Item eventkey="0">
                <Accordion.Header
                  style={{
                    display: "flex",
                    height: "70px",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ width: "85%", textAlign: "left" }}>
                    {note.verse}
                    {note.title ? ` | ${note.title}` : ""} | {note.authorName}
                  </span>
                  <span style={{ fontSize: "12px" }}>
                    {formatDate(note.createdAt)}
                  </span>
                </Accordion.Header>
                <Accordion.Body>
                  <p
                    style={{
                      fontSize: "15px",
                      marginTop: "1%",
                    }}
                  >
                    "{note.passage}"
                  </p>
                  <p
                    style={{
                      fontSize: "15px",
                      marginTop: "3%",
                      marginBottom: "2%",
                      whiteSpace: "normal", // Ensures white spaces and new lines are handled normally
                      wordWrap: "break-word",
                    }}
                  >
                    {note.content}
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))}
      </div>
    </div>
  );
};

export default GroupPage;
