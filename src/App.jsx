import { useState } from 'react'
import logo from './logo.svg';
import './App.css';
import Card from './component/card';
import FoodCard from './component/foodCard';


function App() {
  const [foodName, setFoodName] = useState('')
  const [foodPrice, setFoodPrice] = useState('')
  const [foodImg, setFoodImg] = useState('')
  const [foodDesc, setFoodDesc] = useState('')
  const [edit, setEdit] = useState(false)



  const [foods, setFoods] = useState([{
    foodDesc: "bdsahdsaljkbh,",
    foodImg: "https://media.istockphoto.com/photos/fresh-homemade-pizza-margherita-picture-id1278998606?b=1&k=20&m=1278998606&s=170667a&w=0&h=BlXvVFfwLwD4ckIF_7sg_mis8ULaqy9sdPgA6grpSo4=",
    foodName: "Pizza",
    foodPrice: "200"
  }])


  const onChangeFoodName = (e) => {
    setFoodName(e.target.value)
  }
  const onChangeFoodPrice = (e) => {
    setFoodPrice(e.target.value)
  }
  const onChangeFoodImg = (e) => {
    setFoodImg(e.target.value)
  }
  const onChangeFoodDesc = (e) => {
    setFoodDesc(e.target.value)
  }

  const addFood = () => {
    let obj = {
      foodName,
      foodPrice,
      foodDesc,
      foodImg
    }

    setFoods([...foods, obj])
    setFoodName('')
    setFoodPrice('')
    setFoodImg('')
    setFoodDesc('')
  }

  const editFood = () => {

  }


  return (
    <div className="App">
      <h1>My First React App</h1>


      <input
        onChange={onChangeFoodName}
        placeholder='Food name'
        value={foodName} />

      <input
        onChange={onChangeFoodPrice}
        placeholder='price'
        value={foodPrice} />

      <input
        onChange={onChangeFoodImg}
        placeholder='image'
        value={foodImg} />

      <input
        onChange={onChangeFoodDesc}
        placeholder='description'
        value={foodDesc} />

      <button onClick={edit ? editFood : addFood}>{edit ? 'Update' : 'Add'}</button>

      <div className='food_container'>

        {
          foods.map((data, index) => {
            return (
              <FoodCard name={data.foodName}
                img={data.foodImg}
                price={data.foodPrice}
                desc={data.foodDesc}
                deleteItem={() => {
                  foods.splice(index, 1)
                  setFoods([...foods])
                }}
                editItem={() =>
                  setEdit(true)
                  // console.log(foods[index])
                }
              />)
          })
        }
      </div>


    </div>
  );
}

export default App;
