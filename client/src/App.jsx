import React from 'react'
import { useState } from 'react'

import Navbar from './containers/Navbar'
import Body from './containers/Body'
import Modal from './containers/Modal'

import Button from './components/Button'
import AddEmployee from './containers/AddEmployee'
import { EmployeeProvider } from './context/EmployeeProvider'

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }
  
  return (
    <EmployeeProvider>
      <div className="min-h-screen bg-primary">
        <div className="text-white p-5">
          <Navbar />
          <Button openmodal={openModal} text='Add Employee'/>
          <Body />
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <AddEmployee closeModal={closeModal}/>
          </Modal>
        </div>
      </div>
    </EmployeeProvider>
  )
}

export default App