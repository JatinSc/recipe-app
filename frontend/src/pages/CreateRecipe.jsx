import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import ToastContext from '../context/ToastContext'

const CreateRecipe = () => {
    const {toast} = useContext(ToastContext)
    const {user} = useContext(AuthContext)
   

    const [recipe , setrecipe] = useState({
        title : "",
        author : "",
        image : "",
        ingredients : "",
        directions:""
    })

    const navigate = useNavigate()
    
    

    //# for sending the data from frontend to backend
    const handleSubmit = async (event) =>{
      event.preventDefault()  

      const res = await fetch(`https://recipeappbackend.onrender.com/recipe`, {
        method : "POST",
        headers : {
            "Content-type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body : JSON.stringify(recipe)
    });
    const result = await res.json();
    if(!result.error){
        toast.success(`recipe of "${recipe.title}" saved successfully`)
        setrecipe({ title:"",author:"",image:"",ingredients:"",directions:""})
        navigate('/', {replace:true})
      }else{
        toast.error(result.error);
    }
    }
  return (
    <>
    <h2>Create a recipe</h2>
    <hr className="my-4"/>
    <h8 className="my-4"><strong>Share the recipe with the club by completing the below form.</strong></h8>
    <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="titleInput" className="form-label mt-4">
        Recipe Title
        </label>
      <input type="text" 
      className="form-control" 
      id="titleInput"
      name='title'  
      value={recipe.title}
      onChange={(e)=> {setrecipe({...recipe, title: e.target.value})}}
      // required
      placeholder="enter title"/>
    </div>

    <div className="form-group">
      <label htmlFor="authorInput" className="form-label mt-4">
        Author
        </label>
      <input type="text" 
      className="form-control" 
      id="authorInput"
      name='author'  
      value={recipe.author}
      onChange={(e)=> {setrecipe({...recipe, author: e.target.value})}}
      // required
      placeholder="enter author name "/>
    </div>

    <div className="form-group">
      <label htmlFor="imageInput" className="form-label mt-4">
        Please paste url link for image
        </label>
      <input type="text" 
      className="form-control" 
      id="imageInput"
      name='image'  
      value={recipe.image}
      onChange={(e)=> {setrecipe({...recipe, image: e.target.value})}}
      // required
      placeholder="image url....."/>
    </div>

    <div className="form-group">
      <label htmlFor="ingredientsInput" className="form-label mt-4 ">
        Ingredients
        </label>
      <textarea type="text" 
      className="form-control mb-3" 
      id="ingredientsInput"
      name='ingredients'  
      value={recipe.ingredients}
      onChange={(e)=> {setrecipe({...recipe, ingredients: e.target.value})}}
      // required
      placeholder=""/>
    </div>

    <div className="form-group">
      <label htmlFor="directiontInput" className="form-label mt-4 ">
        Recipe directions
        </label>
      <textarea type='text' 
      className="form-control mb-3" 
      id="directionInput"
      name='directions'  
      value={recipe.directions}
      onChange={(e)=> {setrecipe({...recipe, directions: e.target.value})}}
      // required
      placeholder=""/>
    </div>
    <input type="submit" value="Add Recipe" className="btn btn-dark my-2" />
    
    </form>
    </>
  )
}

export default CreateRecipe