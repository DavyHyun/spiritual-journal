import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineDown } from "react-icons/ai";
import './NewEntry.css';

const NewEntry = () => {
   const [verseText, setVerseText] = useState("");
   const [invalid, setInvalid] = useState(false);
   const [book, setBook] = useState("");
   const [chapter, setChapter] = useState("");
   const [verses, setVerses] = useState("");

   useEffect(() => {
       const fetchVerseText = async () => {
           if (verses !== '' && book !== '' && chapter !== '' && !isNaN(chapter)) {
               try {
                   const response = await fetch(`https://bible-api.com/${book}${chapter}:${verses}`);
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
   }, [book, chapter, verses]);

  return (
    <div className="containerEntry">
        <div className="notebookContain">
            {invalid ? <p style={{color: 'red', fontSize: '8px', width: '88%', justifyContent: 'flex-start', marginBottom: '-5px'}}>enter valid verse</p> : null}
            <div className="versesEntry">
                <input type="text" placeholder="John" style={{
                    fontSize: '20px',
                    width: '180px',
                    border: 'none',
                    outline: 'none'
                }} onChange={(e) => {setBook(e.target.value)}}/>
                <input type="text" placeholder="3" style={{
                    fontSize: '20px',
                    width: '50px',
                    border: 'none',
                    outline: 'none'
                }}  onChange={(e) => {setChapter(e.target.value)}}/>
                <p style={{
                    fontSize: '30px',
                    marginTop: '3%',
                    marginRight: '3%'
                }}>:</p>
                <input type="text" placeholder="16 - 18" style={{
                    fontSize: '20px',
                    width: '100px',
                    border: 'none',
                    outline: 'none'
                }}  onChange={(e) => {setVerses(e.target.value)}}/>
            </div>
            {
                verseText ? 
                <div className="verseContainer">
                    {verseText}
                </div> : null
            }
            <textarea 
                type="text"
                placeholder='Write reflection here...'
                style={{
                    fontSize: '15px',
                    height: '50%',
                    width: '90%',
                    outline: 'none',
                    marginTop: '5%',
                    border: 'none'
                }}
            />
            <div className="submitContainer">
                <div className="addToButton" onClick={() => {}}>
                    Add To
                    <AiOutlineDown style={{
                        marginLeft: '20%'
                    }}/>
                </div>
                <div className="postButton" onClick={() => {}}>
                    Post
                </div>
            </div>
        </div>
    </div>
  )
}

export default NewEntry