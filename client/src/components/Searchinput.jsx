import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import store from './Redux/store'
import { updateString } from './Redux/searchSlice'

const Searchinput = () => {
  const [searchTerm, setSearchterm] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSearch = (e) => {
    e.preventDefault()
    store.dispatch(updateString(searchTerm));
     navigate('/search')

  }

  return (
    <form className="d-flex align-items-center" role="search"   >
      <input className="form-control me-.5 ml-2" type="search" value={searchTerm} onChange={(e) => setSearchterm(e.target.value)}
        placeholder="Search" aria-label="Search" style={{ height: '50px' }} />
      <button className="btn btn-outline-success" type="submit" onClick={handleSearch}>Search</button>
    </form>
  )
}

export default Searchinput