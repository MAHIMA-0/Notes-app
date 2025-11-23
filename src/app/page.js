"use client"
import{useState,useEffect} from 'react';
export default function Page(){
  const[title,setTitle]=useState("");
  const[editTitle,setEditTitle]=useState("");
  const[editId,setEditId]=useState("");
  const[tasks,setTasks]=useState([]);

  // eslint-disable-next-line react-hooks/immutability
  useEffect(()=>{fetchTask();},[]);

  const fetchTask=async()=>{
    const r= await fetch("api/notes")
    setTasks(await r.json());
      
  }

  const addTask=async()=>{
    await fetch("/api/notes",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({title}),
    })
    setTitle("");
    fetchTask();
  }

  const editTask=(task)=>{
    setEditId(task.id);
    setEditTitle(task.title);
  }

  const saveEdit=()=>{
    fetch("/api/notes",{
      method:"PUT",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({id:editId,title:editTitle}),
    })
    setEditId("");
    setEditTitle("");
    fetchTask();
  }

  const cancel=()=>{
    setEditId("");
    setEditTitle("");
  }
  
  const deleteTask=(id)=>{
    fetch("api/notes",{
      method:"DELETE",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({id})
    })
    fetchTask();
  }



  return(
    <>
    <h1>Task App using Nextjs</h1>
    <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/>
    <button onClick={()=>addTask()}>ADD</button>

    <div>
      {tasks.map((task)=>(
        <li key={task.id}>
          {editId===task.id ? (
            <>
            <input type="text" value={editTitle} onChange={(e)=>setEditTitle(e.target.value)}/>
            <button onClick={()=>saveEdit()}>SAVE</button>
            <button onClick={()=>cancel()}>CANCEL</button>
            </>
          ):(
          <>
          {task.title}
          <button onClick={()=>deleteTask(task.id)}>DELETE</button>
          <button onClick={()=>editTask(task)}>EDIT</button>
          </>
          )}
          
        </li>
      ))}
    </div>
    </>
  )
}