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
  const [recipe, setrecipe] = useState([{
    "title": "Chocolate Chip Cookies",
    "author": "Jane Smith",
    "image": "https://sallysbakingaddiction.com/wp-content/uploads/2013/05/classic-chocolate-chip-cookies.jpg",
    "ingredients": "all-purpose flour ,baking soda, salt ,unsalted butter ,brown sugar ,granulated sugar ,large egg ,vanilla extract,chocolate chips",
    "directions": "Preheat oven to 350°F. In a medium bowl, whisk together the flour, baking soda, and salt. In a separate large bowl, beat the butter, brown sugar, and granulated sugar until creamy. Add in the egg and vanilla extract and mix well. Gradually stir in the dry ingredients until well-combined. Fold in the chocolate chips. Drop the dough by rounded tablespoons onto a baking sheet and bake for 10-12 minutes, or until the edges are lightly golden. Cool on the baking sheet for a few minutes, then transfer to a wire rack to cool completely."
  },
  {
    "title": "Samosa",
    "author": "John Doe",
    "image": "https://images.herzindagi.info/image/2021/Sep/chaii-samosa.jpg",
    "ingredients": "all-purpose flour , vegetable oil , salt , water, boiled and mashed potatoes ,green peas ,ginger ,green chillies ,turmeric powder ,garam masala powder ,amchur powder",
    "directions": "In a large bowl, mix together the flour, vegetable oil, and salt until crumbly. Slowly add in the water, mixing until a dough forms. Cover the dough and let it rest for 30 minutes. In a separate pan, heat some oil and sauté the ginger and green chillies. Add in the mashed potatoes, green peas, and spices and mix well. Roll the dough into small circles, then cut in half. Fold the half circle into a cone and fill with the potato mixture. Seal the edges and fry in hot oil until golden brown."
  },
  {
    "title": "Chicken Tikka Masala",
    "author": "Sarah Johnson",
    "image": "https://images.herzindagi.info/image/2021/Sep/chicken-tikka-masala.jpg",
    "ingredients": 
      "boneless , skinless ,chicken breast, yogurt ,lemon juice, ginger, garlic, garam masala, cumin, coriander, paprika, cayenne pepper, tomato puree, heavy cream",
    "directions": "Cut the chicken into small pieces and marinate in a mixture of yogurt, lemon juice, ginger, garlic, and spices for at least 30 minutes. Thread the chicken onto skewers and grill until cooked through. In a separate pan, sauté some onion and garlic until soft. Add in the tomato puree and heavy cream and mix well. Add the grilled chicken to the pan and simmer until the sauce has thickened and the chicken is cooked through. Serve with rice and naan bread."
  },
  {
    "title": "Gulab Jamun",
    "author": "Amit Sharma",
    "image":"https://images.herzindagi.info/image/2021/Sep/Gulab-Jamun.jpg",
    "ingredients": "milk powder, all-purpose flour, baking powder, ghee, milk, sugar, water ,rose water, saffron ,cardamom, powder",
    "directions": "In a large bowl, mix together the milk powder, flour, baking powder, and ghee. Slowly add in the milk, mixing until a dough forms. Knead the dough until smooth, then shape into small balls. In a separate pan, heat the sugar and water until the sugar has dissolved. Add in the rose water, saffron, and cardamom powder and mix well. Drop the dough balls into the syrup and simmer for 10-15 minutes, or until the balls have expanded and the syrup has thickened. Serve warm or at room temperature."
  }
])

  const [searchInput, setSearchInput] = useState("")
  const [expand, setExpand] = useState(false)
  
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
            <img src={recipe.image} alt="food image" style={{ width: "100%", height: "60%" }}></img>
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