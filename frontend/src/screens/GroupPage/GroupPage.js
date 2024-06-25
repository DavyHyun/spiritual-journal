import React, { useEffect, useState, useRef } from "react";
import { Accordion, Badge, Button, Card, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { logout } from "../../actions/userActions";
import Header from "../../components/Header/Header";
import journals from "../../data.js";
import Sidebar from "../../components/Sidebar/Sidebar";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { TiDeleteOutline } from "react-icons/ti";
import {
  listGroup,
  deleteJournalAction,
  addCommentAction,
} from "../../actions/journalActions";
import { FiLogOut, FiUserMinus} from "react-icons/fi";
import { leaveGroupAction, groupList } from "../../actions/groupActions";
import "./GroupPage.css";

const CommentForm = ({ journalId }) => {
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const submitComment = () => {
    if (!commentText.trim()) return; // Check for empty comment
    // Dispatch an action to add the comment
    // Replace `addCommentToJournal` with your actual action creator
    dispatch(addCommentAction(journalId, commentText));
    setCommentText(""); // Clear the input after submission
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        submitComment();
      }}
      style={{ display: "flex", flexDirection: "row", width: "100%" }}
    >
      <Form.Group
        controlId="commentText"
        style={{ marginRight: "2%", width: "90%" }}
      >
        <Form.Control
          as="textarea"
          rows={1}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Comment
      </Button>
    </Form>
  );
};

const Comment = ({ name, text }) => {
  return (
    <div
      style={{
        display: "flex",
        width: "80%",
        flexDirection: "column",
        marginTop: "-1%",
        marginBottom: "1%",
      }}
    >
      <p style={{ fontSize: "12px", textAlign: "left" }}>{name}</p>
      <p style={{ fontSize: "15px", textAlign: "left", marginTop: "-20px" }}>
        {text}
      </p>
    </div>
  );
};

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

  const accordionRefs = useRef([]);

  const scrollToContent = (index) => {
    if (accordionRefs.current[index]) {
      setTimeout(() => {
        try {
          accordionRefs.current[index].scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        } catch (e) {
          console.log("ERROR: ", e);
        }
      }, 400);
    }
  };

  const journalGroup = useSelector((state) => state.journalGroup);
  const { loading, journals, error } = journalGroup;
  const journalCreate = useSelector((state) => state.journalCreate);
  const { success: successCreate } = journalCreate;
  const group = useSelector((state) => state.groupList);
  const { groups } = group;
  
  const commentAdd = useSelector((state) => state.addComment);
  const {
    loading: commentLoading,
    error: commentError,
    success: commentSuccess,
  } = commentAdd;

  const journalDeletee = useSelector((state) => state.journalDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = journalDeletee;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredJournals, setFilteredJournals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [openItemId, setOpenItemId] = useState(null);

  const handleAccordionToggle = (itemId) => {
    setOpenItemId((prev) => (prev === itemId ? null : itemId));
  };

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
  }, [userInfo, nav, successCreate, successDelete, commentSuccess]);

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

  const deleteHandler = (id, title) => {
    const userResponse = window.confirm(
      `Are you sure you want to delete journal \"${title}\" ?`
    );
    if (userResponse) {
      dispatch(deleteJournalAction(id));
    } else {
      console.log("NOT DELETED");
    }
  };

  const leaveGroup = (id) => {
    const group = groups.find(g => g._id === id);
    const groupName = group.groupName;
    const userResponse = window.confirm(
      `Are you sure you want to leave group "${groupName}"?`
    );
    console.log(group)
    //console.log(groupName);
    if (userResponse) {
      dispatch(leaveGroupAction(id));
      dispatch(groupList());
      nav("/myjournal");
    } else {
      console.log("NOT LEFT");
    }
  };

  return (
    <div className="group-page-container">
      <Sidebar />
      <div className="group-content">
        <div className="group-header">
          <div className="header-content">
            <div onClick={() => setShowModal(true)} className="dateButton">
              {showAll ? "Filter" : `${formatDateMonth(selectedDate)}`}
            </div>
            <div className="leave-group-icon">
              <FiUserMinus className="icon"  onClick={() => leaveGroup(id)}/>
            </div>
         </div>
    </div>
   

  
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {errorDelete && (
          <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
        )}
        {loading && <Loading />}
        {loadingDelete && <Loading />}

        {filteredJournals
          ?.slice()
          .reverse()
          .map((note, index) => (
            <Accordion
              activeKey={openItemId}
              onSelect={(eventKey) => handleAccordionToggle(eventKey)}
              style={{ width: "75vw", maxWidth: "75vw" }}
              onClick={() => scrollToContent(index)}
            >
              <Accordion.Item eventKey={note._id}>
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
                <Accordion.Body
                  ref={(el) => (accordionRefs.current[index] = el)}
                >
                  <div
                    style={{
                      maxHeight: "195px",
                      overflowY: "scroll",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "15px",
                        marginTop: "1%",
                      }}
                    >
                      "{note.passage}"
                    </p>
                  </div>
                  <p
                    style={{
                      fontSize: "15px",
                      marginTop: "3%",
                      marginBottom: "2%",
                      whiteSpace: "pre-wrap", // Ensures white spaces and new lines are handled normally
                    }}
                  >
                    {note.content}
                  </p>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "4%",
                    }}
                  >
                    <p>COMMENTS</p>
                    {commentError && (
                      <ErrorMessage variant="danger">{error}</ErrorMessage>
                    )}
                    {commentLoading && <Loading />}

                    {note.comments.map((comment) => (
                      <Comment name={comment.authorName} text={comment.text} />
                    ))}
                  </div>
                  <CommentForm journalId={note._id} />
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "2%",
                    }}
                  >
                    <TiDeleteOutline
                      size={20}
                      className="deleteButton"
                      onClick={() => deleteHandler(note._id, note.title)}
                    />
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))}
      </div>
    </div>
  );
};

export default GroupPage;
