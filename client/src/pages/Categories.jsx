import React from 'react'
import {useCategory} from '../hooks/useCategory.jsx'
import Layout from '../components/layout/Layout.jsx'
import {Link} from 'react-router-dom'

const Category = () => {
  const categories=useCategory()
  return (
     <Layout title='All-Categories'>
      <div className='container' style={{marginTop:"100px"}}>
        <div className='row-container' style={{width:"80%"}}>
          {categories.map(c=>(
            <div className='col-md-3 mt-5 mb-2' key={c.id}>
              <div className='card'> 
              <Link to={`/category-products/${c.slug}`} className="btn cat-btn">
                  {c.name}
                </Link></div>
            </div>
          ))}
        </div>
      </div>
     </Layout>
  )
}

export default Category