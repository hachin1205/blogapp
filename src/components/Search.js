
import { useState, useEffect } from 'react'
import axios from 'axios'
import BasicSelect from './BasicSelect'
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
export default function Search(){
  const [inputValue, setInputValue] = useState("")
  const [keyword, setKeyword] = useState("amazon")
  const [bookinfo, setBookinfo] = useState([])
  const baseUrl = "https://www.googleapis.com/books/v1/volumes?q="+keyword+"&key=AIzaSyBYiGsuNGXjzL8PSI0rcl5DH_0Zn6VLwnI"
  // const promise = axios.get(baseUrl)
  // promise.then(response=>{console.log(response)})
  const handleChange = (event) => {
    setBookinfo(event.target.value);
  };
  function onChangeHandler(){
    setKeyword(inputValue)
    setInputValue('')
  }
  useEffect(() => {
    console.log('effect')
    console.log(keyword)
    axios
      .get(baseUrl)
      .then(response => {
        // console.log(response.data.items)
        setBookinfo(response.data.items)
      })
  }, [keyword])
    return(

    <div>
       <Box sx={{ minWidth: 120 }}>

    <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Book</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={bookinfo}
    label="Book"
    onChange={handleChange}
  > 
{/*     
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem> */}
  </Select>
</FormControl>
</Box>
      <div>{keyword}</div>
      <input value={inputValue} onChange={e=>setInputValue(e.target.value)} /><button onClick={onChangeHandler}>search</button>
      
      {bookinfo.length?bookinfo.map(({volumeInfo})=>
      {return(
      <>
      <div></div>
      <em></em>
      <img src={volumeInfo.imageLinks===undefined?"none":volumeInfo.imageLinks.smallThumbnail}></img>
      <Select>
      <MenuItem>{volumeInfo.title}</MenuItem>
      <MenuItem>page:{volumeInfo.pageCount}</MenuItem>
      {/* <div>author:{volumeInfo.authors}</div> */}
      <MenuItem>{volumeInfo.authors}</MenuItem>
      </Select>
      </>)
    }
      )
      :<div>loading</div>}
      
      </div>
      )
}