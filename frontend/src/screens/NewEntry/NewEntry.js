import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineDown } from "react-icons/ai";
import './NewEntry.css';

const NewEntry = () => {
  return (
    <div className="containerEntry">
        <div className='notebookContain'>
            <div className="versesEntry">
                    <input type="text" placeholder="John" style={{
                        fontSize: '22px',
                        width: '180px',
                        border:'none',
                        outline: 'none'
                    }}/>
                    <input type="text" placeholder="3" style={{
                        border:'none',
                        fontSize: '22px',
                            width: '50px',
                            outline: 'none'
                    }}/>
                    <p style={{
                        fontSize: '30px',
                        marginTop: '3%',
                        marginRight: '3%'
                    }}>:</p>
                    <input type="text" placeholder="16 - 18" style={{
                        border:'none',
                        fontSize: '22px',
                            width: '130px',
                            outline: 'none'
                    }}/>
            </div>
            <textarea 
                type="text"
                placeholder='Write reflection here...'
                style={{
                    fontSize: '15px',
                    height: '50%',
                    width: '86%',
                    border: 'none',
                    outline: 'none',
                    marginTop: '5%'
                }}
                
            />
            <div className="submitContainer">
                <div className="submitButton1" onClick={() => {}}>
                    Add To
                    <AiOutlineDown style={{ marginLeft: '20%'}}/>
                </div>
                <div className="submitButton2" onClick={() => {}}>
                    Post
                </div>
            </div>
           </div>
       </div>
  )
}

export default NewEntry