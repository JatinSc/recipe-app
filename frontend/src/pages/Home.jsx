import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'


const Home = () => {

  // # user can't access homepage without login
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  // # we are importing user from AuthContext (we have save the state of user in that )
  useEffect(() => {
    !user && navigate('/login', { replace: true })
  }, [])
  const [recipe, setrecipe] = useState([])

  const [searchInput, setSearchInput] = useState("")
  const [expand, setExpand] = useState(false)
  const [info,setInfo] = useState(false)
  const getContact = async () => {

    try {
      const res = await fetch(`https://recipeappbackend.onrender.com/myrecipe`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });


      const result = await res.json();

      if (!result.error) {
        setrecipe(result.contacts)

      } else {
        console.log(result.error)

      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getContact()
  }, []);

  const handleExpand = () => {
    if(expand){
      setExpand(false)
    }else{
      setExpand(true)
    }
  }
  return (
    <><div className="jumbotron">
      <h1>Welcome {user ? user.name : null}</h1>
      <form style={{ display: "flex" }} >
        <input type="text"
          name='searchInput'
          id='searchInput'
          className='form-control my-3'
          placeholder='Search Recipe'
          value={searchInput}
          onChange={(e) => { setSearchInput(e.target.value) }}
          style={{ color: "#044474" }}
        />
      </form>
      <hr className="my-4" />
      <p className="lead">
        <Link to={'/create'}>
          <button style={{ marginLeft: "50%" }} className="btn btn-dark" href="#" type='button'>NEW</button>
        </Link>
      </p>
      <h2>ALL RECIPE</h2>
      <div style={{width:"50%",marginLeft:"26%"}}>{recipe.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchInput.toLowerCase())).map((recipe) => (
          <div className="card mb-3" key={recipe._id}
            onClick={handleExpand}
          >
            <h3 className="card-header">{recipe.title}</h3>
            <div className="card-body">
              <h5 className="card-title">Author : {recipe.author}</h5>
            </div>
            <img src={recipe.image} alt="food image" style={{ width: "100%", height: "500px" }}></img>
            <div className="card-body">
            {expand?<>
            <button className='btn btn-dark my-2' style={{margin:"5px"}}>ingredients</button>
            <button className='btn btn-dark my-2'>directions</button>
            <p className="card-text"><b>Ingredients are :</b> {recipe.ingredients}</p>
            </> : <><button className='btn btn-dark my-2' style={{margin:"5px"}}>ingredients</button>
            <button className='btn btn-dark my-2'>directions</button>
            <p className="card-text"><b>directions are :</b> {recipe.directions}</p></>}  
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default Home