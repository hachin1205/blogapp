
import './index.css';
// import './App.css';
import 'antd/dist/reset.css';

import { Col, Divider, Row } from 'antd';
import React, { useState } from 'react';
import { Drawer, Modal, Button } from 'antd';
import InternalMenu from 'antd/es/menu/menu';



const ITEMS = [{ id : 1, name: "chicken", price: 1, modifier: ["fried rice", "spring roll",'abc'] }, 
{ id :2, name: "beef", price: 2, modifier: ["fried rice"] }]
const itemStyle = {
  background: '#0092ff',
  padding: '18px 0 ',
};

const App = () => {
 
  const [open, setOpen] = useState(false);
  // pop up
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modal, setModal] = useState([])
  const showModal = (item) => {
    setIsModalOpen(true);
    // console.log(item)
    const modifierStatus = new Array(item.modifier.length).fill(false)
    // console.log(modifierStatus)
    setModal({...item,modifierStatus})
  };
  const handleOk = () => {
    setIsModalOpen(false)
    // const updatedCartItem = cartItem.push(modal)
    console.log(modal)
    setcartItem([...cartItem,modal])
    ;
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  // console.log(ITEMS)
  function onchangeCheck(selectedIdx,idx){
    selectedIdx.push(idx)
    return false
    
    
  }
  //modifier
  const [mCheck,setmCheck] = useState(false)
  const [cartItem, setcartItem] = useState([])
  function modifierChange(idx){
    const updatedModal = modal
    updatedModal.modifierStatus[idx] = !updatedModal.modifierStatus[idx]
    setModal(updatedModal)
    // setcartItem([...modal,{mCheck}])
  }
  console.log(modal)
  console.log(cartItem)
  return (
    <>
      <div className="container">
        <Divider orientation="left">Menu</Divider>
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <div>
              {ITEMS.map((item)=>{return(
              <>
              <Button type="primary" 
              className = "itemButton"
              onClick={()=>showModal(item)}>
                <>
                <div>{item.name}</div>
                <div>${item.price}</div>
                </>
              </Button>
             
             </>
              )})}

            </div>
          </Col>
        </Row>
  
      <Modal            
            title={''||modal.name}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
          {console.log(modal.modifierStatus)}
         {modal.name? modal.modifier.map(
          (x,idx)=>{
            const selectedIdx = []
            console.log(idx)
            return(<div><input 
            type="checkbox" 
            onChange={()=>modifierChange(idx)}
            />{x}</div>)}
         ):''}
          </Modal>
      
        <Button type="primary" className="toRight" onClick={showDrawer}>
          Cart
        </Button>
        <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
          {cartItem.length?cartItem.map(({name,modifier,modifierStatus})=>
          {
            const selectedModifier = []
            modifierStatus.forEach((item,idx)=>item===true?selectedModifier.push(idx):'')
            console.log(selectedModifier)
            console.log(selectedModifier.forEach(e=>console.log(modifier[e])))
            return(
            <>
            <h2>{name}</h2>
            
            {/* {modifier[selectedModifier]} */}
            <div>{modifier[selectedModifier]}</div>
          {/* {selectedModifier.forEach((e,idx)=>(<div>{idx}</div>))} */}
            </>
          )}
          
          ):"Your Shipping Card is empty! please add items"}

        </Drawer>
      </div>
    </>)
}


export default App;
