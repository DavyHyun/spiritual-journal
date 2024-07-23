import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateJournalAction } from "../../actions/journalActions";  // Add this line
import "./EditPost.css";

const EditPost = () => {
  const location = useLocation();
  const { journal } = location.state;

  const [title, setTitle] = useState("");
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState("");
  const [verse, setVerse] = useState("");
  const [verseText, setVerseText] = useState("");
  const [content, setContent] = useState("");
  const [invalid, setInvalid] = useState(false);

  const nav = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!journal) {
      nav("/myjournals");
      return;
    }

    setTitle(journal.title);
    setBook(journal.verse.split(' ')[0]);
    setChapter(journal.verse.split(' ')[1].split(':')[0]);
    setVerse(journal.verse.split(':')[1]);
    setVerseText(journal.passage);
    setContent(journal.content);
  }, [journal]);

  useEffect(() => {
    const fetchVerseText = async () => {
      if (verse !== "" && book !== "" && chapter !== "" && !isNaN(chapter)) {
        try {
          const response = await fetch(
            `https://bible-api.com/${book}${chapter}:${verse}`
          );
          const data = await response.json();
          if (!data.text) {
            setInvalid(true);
            setVerseText(""); 
          } else {
            setVerseText(data.text);
            setInvalid(false);
          }
        } catch (error) {
          console.error("Error fetching data: ", error);
          setInvalid(true);
        }
      } else {
        setVerseText("");
      }
    };

    fetchVerseText();
  }, [book, chapter, verse]);

  const handleSubmit = () => {
    // console.log("Journal ID:", journal._id);
    // console.log("Verse:", `${book} ${chapter}:${verse}`);
    // console.log("Verse Text:", verseText);
    // console.log("Content:", content);
    // console.log("Title:", title);
    // console.log("Selected Groups:", []);
    dispatch(updateJournalAction(journal._id, `${book} ${chapter}:${verse}`, verseText, content, title, []));  // Update this line with your actual selectedGroups
    // nav("/myjournal");
  };

  return (
    <div className="containerEntry">
      <div className="notebookContain">
        <input
          type="text"
          placeholder="Title..."
          value={title}
          className="titleText"
          onChange={(e) => setTitle(e.target.value)}
        />
        {invalid ? <p className="invalidVerse">enter valid verse</p> : null}
        <div className="versesEntry">
          <input
            type="text"
            placeholder="John"
            value={book}
            className="bookText"
            onChange={(e) => setBook(e.target.value)}
          />
          <input
            type="text"
            placeholder="3"
            value={chapter}
            className="chapterText"
            onChange={(e) => setChapter(e.target.value)}
          />
          <p className="setChapter">:</p>
          <input
            type="text"
            placeholder="16-18"
            value={verse}
            className="verseText"
            onChange={(e) => setVerse(e.target.value)}
          />
        </div>
        {verseText ? <div className="verseContainer">{verseText}</div> : null}
        <textarea
          placeholder="Write reflection here..."
          className="reflectionContainer"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="submitContainer">
          <div className="postButton" onClick={handleSubmit}>
            Save
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
