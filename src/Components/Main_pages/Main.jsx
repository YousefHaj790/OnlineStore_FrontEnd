import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/Main.css'
const Main = () => {
  return (
    <div >

<div className='disCount' >
<p>We have 50% discount on those new products:</p>

<Link to='/Products/snacks'><img src="https://res.cloudinary.com/dt7bscqjh/image/upload/v1732971033/ics/Products/Snacks/acqlw8mnunld2yau9gea.jpg" alt="" /></Link>
<Link to='/Products/Grocery'><img src="https://res.cloudinary.com/dt7bscqjh/image/upload/v1732969001/ics/Products/Grocery/ei2mkaozbv0sykcxqolw.png" alt="" /></Link>
<Link to='/Products/Cleaning_materials'><img src="https://res.cloudinary.com/dt7bscqjh/image/upload/v1732972113/ics/Products/Cleaning%20materials/ou5wdxmmivg9txohuwla.webp" alt="" /></Link>

</div>


    </div>
  )
}

export default Main
