import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineDown } from "react-icons/ai";
import './NewEntry.css';

const NewEntry = () => {
  return (
    <div className="containerEntry">
        <div className="notebookContain">
            <div className="versesEntry">
                <input type="text" placeholder="John" style={{
                    fontSize: '20px',
                    width: '180px',
                    border: 'none',
                    outline: 'none'
                }}/>
                <input type="text" placeholder="3" style={{
                    fontSize: '20px',
                    width: '50px',
                    border: 'none',
                    outline: 'none'
                }}/>
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
                }}/>
            </div>
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