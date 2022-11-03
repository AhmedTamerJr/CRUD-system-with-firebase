import React,{useEffect, useState} from"react"
import {AiOutlinePlus} from "react-icons/ai"
import Todo from "./Components/Todo";
import {db }  from "./firebase"
import {query,collection,onSnapshot ,updateDoc,doc,addDoc ,deleteDoc} from"firebase/firestore"

const style ={
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F10ED] to-[#1CE5E0]`,
  container:`bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading:`text-3xl fold-bold text-center text-gray-800 p-2`,
  form:`flex justify-between `,
  input:`border p-2 w-full text-xl`,
  button:`border p-4 ml-2 bg-purple-400 text-slate-100`,
  count:`text-center p-2`
}

function App() {

  const [todo,setTodo]=useState([])
  const [input,setInput]=useState("")
  //create element 
  const createTodo=async(e)=>{
    e.preventDefault()
    if(input===""){
      alert ("Enter a task")
      return
    }
    await addDoc(collection(db,"todo"),{
      text:input ,
      completed:false,
    })
    setInput("")

    
  }
  //end of create

  //update the database
  const toggleComplete=async(todo)=>{
    await updateDoc(doc(db,"todo",todo.id),{
      completed:!todo.completed
    })
  }
  //End of update

//read data
  useEffect(()=>{
    const q=query(collection(db,"todo"))
    const lisnter=onSnapshot(q,(querySnapshot)=>{
      let todoArray=[]
      querySnapshot.forEach(get=>{
        todoArray.push({...get.data(),id:get.id})
      })
      setTodo(todoArray)
    })
    return()=>lisnter
  },[])
//end of read
//delete todo
const deleteTodo=async(id)=>{
  await deleteDoc(doc(db,'todo',id))
}

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input value={input} onChange={(e)=>setInput(e.target.value )} type="text" placeholder="Add Task" className={style.input}/>
          <button className={style.button}>{<AiOutlinePlus size="30"/>}</button>
        </form>
        <ul>
          {todo.map((todo,index)=>
              (<Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo}/>)
          )}
          
        </ul>
        <p className={style.count}>{todo.length>1? `You have ${todo.length} tasks finish it please`:todo.length===1 ?`you Only One task` :`You don't have any tasks to do bye :)` }</p>
      </div>
    </div>
  );
}

export default App;
