import {useEffect, useState} from 'react'
import Form from './components/Form'
import Notifications from './components/Notifications'

function App() {

    useEffect(() => {
        axios.get('http://localhost:8000/api/countries')
            .then(res => {

            })
    })

    return (
        <div>
            <Form></Form>
            <Notifications></Notifications>
        </div>
  )
}

export default App
