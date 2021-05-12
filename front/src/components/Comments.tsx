import React, { useEffect, useState } from "react";
import axios from "axios";
import { useInput } from "../customs/useInput";
import { API_URL } from "../const/utils.js";
import styled from "@emotion/styled";

type Post = {
  board_id : number,
  title : string,
  writer : string,
  datetime : Date
}

const Comments = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [input, handleInput, setInput] = useInput('');

  const handleSubmit = () => {
    setInput('');
  }

  const init = async() => {
    try{
      const { data } = await axios.get(`${API_URL}/getBoard`)
      console.log(data);
      setPosts(data)
    } catch(err){
      console.log(err)
      console.log( "failed because of", err)
    }
  }

  useEffect(() => {
    init();
  }, [])

  return(
    <CommentWrap>
      {posts.map((item, i) =>
        <div className='post' key={`post${i}`}>
          <span>〉{item.board_id}</span>
          <span>{item.title}</span>
        </div>
      )}
      <div className='submit'>
          <input value={input} onChange={handleInput} />
          <button onClick={handleSubmit}>⌲</button>
      </div>
    </CommentWrap>
  )
}

const CommentWrap = styled.li`
    width: 40%;
    margin-left: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end; 
    .post{
        width: 100%;
        height: 20px; 
        p{
            font-size: 0.8rem;
        }
    }   
    .submit{
        height:35px;
        box-sizing: border-box;
        position:relative;
        display:flex;
        align-items: center;    
        input, button{
            position:absolute;
            border:1px solid #333;
            height:100%;
            box-sizing: border-box;
        }   
        input{
            width:100%;
            text-align: center;
            &:focus{
                outline:0;
            }
        }

        button{
            right:1rem;
            font-size: 2rem;
            border:none;
            background: none;
            line-height: 0.2rem;
            cursor:pointer; 
            &:focus{
                outline:0;
            }
            &:hover{
                color:red;
            }
        }
    }

`

export default Comments