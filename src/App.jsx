import { useState } from 'react'
import logo from './logo.svg';
import './App.css';

function App() {

  // const [counter, setCounter] = useState(0)
  // const [userName, setUserName] = useState('')

  const [foodName, setFoodName] = useState('')
  const [foodPrice, setFoodPrice] = useState('')
  const [foodImg, setFoodImg] = useState('')
  const [foodDesc, setFoodDesc] = useState('')



  const [foods, setFoods] = useState([{
    foodDesc: "bdsahdsaljkbh,",
    foodImg: "https://media.istockphoto.com/photos/fresh-homemade-pizza-margherita-picture-id1278998606?b=1&k=20&m=1278998606&s=170667a&w=0&h=BlXvVFfwLwD4ckIF_7sg_mis8ULaqy9sdPgA6grpSo4=",
    foodName: "Pizza",
    foodPrice: "200"
  }])

  // const increment = () => { setCounter(counter + 1) }

  // const decrement = () => {
  //   if (counter > 0) {
  //     setCounter(counter - 1)
  //   }
  // }

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


  console.log('foods======>', foods)

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

      <button onClick={addFood}>Add Food</button>

      <div className='food_container'>

        {
          foods.map((data, index) => {
            return (
              <div className='food_div'>
                <img src={data.foodImg} height={'200'} width={'200'} />
                <span>{data.foodName}</span>

                <button onClick={() => alert(index)}>delete</button>
              </div>)
          })
        }
      </div>

      {/* <input
        onChange={onChangeUserName}
        placeholder='User name'
        value={userName} />

      <br />
      <br />

      <button onClick={increment}>+</button>
      <h1>{counter}</h1>
      <button disabled={counter === 0} onClick={decrement}>-</button> */}
    </div>
  );
}

export default App;
