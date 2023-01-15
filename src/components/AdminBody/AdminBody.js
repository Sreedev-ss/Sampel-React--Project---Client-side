import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './AdminBody.css'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'


function AdminBody() {
    const [user, setUser] = useState([])
    const [uid,setUid] = useState()
    const [searchUser, setSearchUser] = useState([])
    const [editUser, setEditUser] = useState()
    const [editName, setEditName] = useState()
    const [editEmail, setEditEmail] = useState()
    const [editMobile, setEditMobile] = useState()
    const accessToken = localStorage.getItem('accessToken')

    //Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
       (async() => getUser())();
    },[])

    const getUser = async () => {
       
        const userData = await axios.get("http://localhost:8000/user-data",{
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        })
        setUser(userData.data)
        setSearchUser(userData.data)
    }

    const searchHandler = (e) => {
        e.preventDefault();
        let value = e.target.value.trim().toLowerCase()
        setSearchUser(user.filter((user) => {
            if (user.name.toLowerCase().includes(value)) {
                return user;
            }
        }))
    }

    const handleEdit = (users) => {
        handleShow()
        setUid(users._id)
        setEditUser(users)
    }

    const updateData = async() => {
        await axios({
            method:'put',
            url:'http://localhost:8000/update-user',
            data:{
                id:uid,
                name:editName,
                email:editEmail,
                mobile:editMobile
            },
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        })
        window.location.reload()
    }

    const deleteUser = async(id) => {
        await axios({
            method:'delete',
            url:`http://localhost:8000/delete-user`,
            data:{
                id:id
            },
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        })
        window.location.reload()
    }

    return (

        <div>
            <h2 className='userMgmt' style={{ float: 'left' }}>User Management</h2>
            <input type="search"
                name=""
                placeholder=' Search for user '
                id=""
                style={{ float: 'right', width: 400, height: 40, margin: 20 }}
                onChange={searchHandler}
            />

            <table>
                <thead>
                    <tr>
                        <th scope="col">Username</th>
                        <th scope="col">Mobile</th>
                        <th scope="col">Email</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {searchUser.map(users => {
                        if (users.name != 'admin') {
                            return <tr key={users._id}>
                                <td data-label="Account">{users.name}</td>
                                <td data-label="Due Date">{users.mobile}</td>
                                <td data-label="Due Date">{users.email}</td>
                                <td data-label="Amount"><span style={{ cursor: 'pointer' }} onClick={() => handleEdit(users)}>Edit</span></td>
                                <td data-label="Amount"><span style={{ cursor: 'pointer' }} onClick={() => {if(window.confirm('Delete the item?'))deleteUser(users._id)}}>Delete</span></td>
                            </tr>
                        }

                    })}
                </tbody>
            </table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editUser?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="name@example.com"
                                autoFocus
                                defaultValue={editUser?.name}
                                onChange={(e) => {
                                    setEditName(e.target.value)
                                }}
                            />
                            <Form.Label className="mt-2">Email</Form.Label>
                            <Form.Control
                                type="email"
                                autoFocus
                                defaultValue={editUser?.email}
                                onChange={(e) => {
                                    setEditEmail(e.target.value)
                                }}
                            />
                            <Form.Label className="mt-2">Mobile</Form.Label>
                            <Form.Control
                                type="number"
                                autoFocus
                                defaultValue={editUser?.mobile}
                                onChange={(e) => {
                                    setEditMobile(e.target.value)
                                }}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updateData}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>


    )
}

export default AdminBody