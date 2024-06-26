import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createJournalAction } from "../../actions/journalActions";
import { useNavigate } from "react-router-dom";
import { AiOutlineDown } from "react-icons/ai";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { groupList } from "../../actions/groupActions";
import "./NewEntry.css";

const NewEntry = () => {
  const [verseText, setVerseText] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState("");
  const [verses, setVerses] = useState("");
  const [reflection, setReflection] = useState("");
  const [title, setTitle] = useState("");
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [showGroups, setShowGroups] = useState(false);

  const dispatch = useDispatch();
  const nav = useNavigate();

  const journalCreate = useSelector((state) => state.journalCreate);
  const { loading, error, journal } = journalCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const group = useSelector((state) => state.groupList);
  const { loadingG, groups } = group;

  // const resetHandler = () => {
  //   setBook("");
  //   setChapter("");
  //   setVerses("");
  //   setVerseText("");
  //   setReflection("");
  //   setTitle("");
  // };

  const submitHandler = () => {
    setShowGroups(false);
    const verse = book + " " + chapter + ":" + verses;
    dispatch(
      createJournalAction(verse, verseText, reflection, title, selectedGroups)
    );
  };

  const handleGroupSelect = (groupId) => {
    setSelectedGroups((prev) => {
      if (prev.includes(groupId)) {
        return prev.filter((id) => id !== groupId); // Deselect the group
      } else {
        return [...prev, groupId]; // Select the group
      }
    });
  };

  const toggleGroups = () => {
    console.log(groups);
    setShowGroups((prev) => !prev); // Toggle the visibility of the groups list
  };

  useEffect(() => {
    if (journal) {
      nav("/myjournal");
    }
    console.log("JOURNAL: ", journal);
    dispatch(groupList());
    const fetchVerseText = async () => {
      if (verses !== "" && book !== "" && chapter !== "" && !isNaN(chapter)) {
        try {
          const response = await fetch(
            `https://bible-api.com/${book}${chapter}:${verses}`
          );
          const data = await response.json();
          if (!data.text) {
            setInvalid(true);
            setVerseText(""); // Clear verseText if invalid
          } else {
            setVerseText(data.text);
            setInvalid(false);
          }
        } catch (error) {
          console.error("Error fetching data: ", error);
          setInvalid(true);
        }
      } else {
        setVerseText(""); // Clear verseText if inputs are incomplete
      }
    };

    fetchVerseText();
  }, [journalCreate, book, chapter, verses, dispatch, userInfo]);

  if (loadingG) {
    return <Loading />;
  }

  return (
    <div className="containerEntry">
      <div className="notebookContain">
        {loading && <Loading size={20} />}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <input
          type="text"
          placeholder="Title..."
          className="titleText"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        {invalid ? <p className="invalidVerse">enter valid verse</p> : null}
        <div className="versesEntry">
          <input
            type="text"
            placeholder="John"
            className="johnExample"
            onChange={(e) => {
              setBook(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="3"
            className="chapterExample"
            onChange={(e) => {
              setChapter(e.target.value);
            }}
          />
          <p className="setChapter">:</p>
          <input
            type="text"
            placeholder="16 - 18"
            className="verseExample"
            onChange={(e) => {
              setVerses(e.target.value);
            }}
          />
        </div>
        {verseText ? <div className="verseContainer">{verseText}</div> : null}
        <textarea
          type="text"
          placeholder="Write reflection here..."
          onChange={(e) => {
            setReflection(e.target.value);
          }}
          className="reflectionContainer"
        />
        <div className="submitContainer">
          <div className="addToButton" onClick={toggleGroups}>
            Add To
          </div>
          {showGroups ? (
            <div className="groupMenu">
              {groups.map((group) => (
                <div
                  key={group._id}
                  onClick={() => handleGroupSelect(group._id)}
                  style={{
                    backgroundColor: selectedGroups.includes(group._id)
                      ? "#D9D9D9"
                      : "transparent",
                    cursor: "pointer",
                    fontSize: "13px",
                    marginTop: "4%",
                  }}
                >
                  {group.groupName}
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}
          <div className="postButton" onClick={() => submitHandler()}>
            Post
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEntry;
