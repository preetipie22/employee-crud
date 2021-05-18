import React, {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form, FormControl } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Axios from 'axios';

function EmployeeTable() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [empData, setEmpData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showUpdatePopup, setshowUpdatePopup] = useState(false);
    const [showViewPopup, setshowViewPopup] = useState(false);
    const [currentEmp, setCurrentEmp] = useState({
        firstName: '',
        lastName: '',
        emailId: '',
        mobileNo: ''
    });


    useEffect(() => {
        Axios.get("http://localhost:3001/api/get").then((response) => {
          setEmpData(response.data);
        }).catch(e => console.log('error preeti: ', e)) ;
      },[]);
    
  const addEmployee =(e) => {
        setShowPopup(true);
    }

    const closePopup = e => {
        setShowPopup(false);
    }

    const closeUpdatePopup = e => {
        setshowUpdatePopup(false);
    }
    const closeViewPopup = e =>{
        setshowViewPopup(false);
    }


   const submitEmpDetails = (e) => {
        const empDetail = {
           firstName,
           lastName,
           emailId,
           mobileNo
        }; 
        Axios.post('http://localhost:3001/api/insert', empDetail);
        setEmpData([...empData,empDetail]);
        setShowPopup(false);
    
    };

    const editEmployee = (emailId) => {
        setshowUpdatePopup(true);
        const emp = empData.filter(emp => emp.emailId === emailId)[0];
        setCurrentEmp(emp);
        setFirstName(emp.firstName);
        setLastName(emp.lastName);
        setEmailId(emp.emailId);
        setMobileNo(emp.mobileNo);
    }

 const updateEmployee = _ => {
    const empDetail = {
        firstName,
        lastName,
        emailId,
        mobileNo
     };     
    Axios.put('http://localhost:3001/api/update', empDetail);
    const index = empData.findIndex(emp => emp.emailId === emailId);
    const updatedEmpData = empData;
    updatedEmpData[index] = empDetail;
    setEmpData(updatedEmpData);
    setshowUpdatePopup(false);
 }

 const deleteEmployee = (emailId) => {
    Axios.delete(`http://localhost:3000/api/delete/${emailId}`);
    const updatedEmpData = empData.filter(employee => employee.emailId != emailId);
    setEmpData([...updatedEmpData]);
 }

 const viewEmployee = (emailId) => {
     setshowViewPopup(true);
     const emp = empData.filter(emp => emp.emailId === emailId)[0];
    setFirstName(emp.firstName);
    setLastName(emp.lastName);
    setEmailId(emp.emailId);
    setMobileNo(emp.mobileNo);
 }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        Employee Management App
                    </a>
                </div>
            </nav>
            <h1 className="text-center">Employee List</h1>
            <button type="button" class="btn btn-primary my-3" onClick={addEmployee}>Add Employee</button>
            <table class="table table-striped">
                <thead>
            <tr>
                <th>Employee First Name</th>
                <th>Employee Last Name</th>
                <th>Employee Email Id</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody className="text-left">
            {  empData.map((employee) => {
        return (
            <tr key={employee.id}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.emailId}</td>
                <td>
                <button type="button" class="btn btn-info m-1"  onClick={() => editEmployee(employee.emailId)}>Update</button>
                <button type="button" class="btn btn-danger m-1" onClick={() => deleteEmployee(employee.emailId)}>Delete</button>
                <button type="button" class="btn btn-info m-1" onClick={() => viewEmployee(employee.emailId)}>View</button>
                </td>
            </tr>
        ); 
    })  }



            </tbody>
</table>
<Modal size="sm" show={showPopup} onHide={closePopup}  animation={true}>
                    <Modal.Header className="mod_head text-center" closeButton>
                        <Modal.Title className="w-100">Add Details</Modal.Title>
                        <br />
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                            <Form.Group controlId="formPlaintextfn">
                            <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    className="mod_input"
                                    size="sm"
                                    name="name"
                                    type="text"
                                    onChange={(e) =>{setFirstName(e.target.value);}}
                                    placeholder="First Name"
                                />
                                <Form.Text className="text-danger"></Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formPlaintextln">
                            <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    className="mod_input"
                                    size="sm"
                                    name="name"
                                    type="text"
                                    onChange={(e) =>{setLastName(e.target.value);}}
                                    placeholder="Last Name"
                                />
                                <Form.Text className="text-danger"></Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formPlaintextemail">
                            <Form.Label>Email</Form.Label>
                                <Form.Control
                                    className="mod_input"
                                    size="sm"
                                    name="email"
                                    type="email"
                                    onChange={(e) =>{setEmailId(e.target.value);}}
                                    placeholder="Email-Id"
                                />
                                <Form.Text className="text-danger"></Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formPlaintextmob">
                            <Form.Label>Mobile Number</Form.Label>
                                <Form.Control
                                    className="mod_input"
                                    size="sm"
                                    name="phone"
                                    type="tel"
                                    onChange={(e) =>{setMobileNo(e.target.value);}}
                                    placeholder="Mobile Number"
                                />
                                <Form.Text className="text-danger"></Form.Text>
                            </Form.Group>
                            <Button className="edit_button" type="button" onClick={submitEmpDetails}>
                               Submit
                            </Button>
                            </Form>
                    </Modal.Body>
                </Modal>
                <Modal size="sm" show={showUpdatePopup} onHide={closeUpdatePopup}  animation={true}>
                    <Modal.Header className="mod_head text-center" closeButton>
                        <Modal.Title className="w-100">Update Details</Modal.Title>
                        <br />
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                            <Form.Group controlId="formPlaintextfn">
                            <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    className="mod_input"
                                    size="sm"
                                    defaultValue={currentEmp.firstName}
                                    name="name"
                                    type="text"
                                    onChange={(e) =>{setFirstName(e.target.value);}}
                                    placeholder="First Name"
                                />
                                <Form.Text className="text-danger"></Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formPlaintextln">
                            <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    className="mod_input"
                                    size="sm"
                                    name="name"
                                    defaultValue={lastName}
                                    type="text"
                                    onChange={(e) =>{setLastName(e.target.value);}}
                                    placeholder="Last Name"
                                />
                                <Form.Text className="text-danger"></Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formPlaintextemail">
                            <Form.Label>Email</Form.Label>
                                <Form.Control
                                    className="mod_input"
                                    size="sm"
                                    name="email"
                                    value={currentEmp.emailId}
                                    type="email"
                                    onChange={(e) =>{setEmailId(e.target.value);}}
                                    placeholder="Email-Id"
                                    disabled
                                />
                                <Form.Text className="text-danger"></Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formPlaintextmob">
                            <Form.Label>Mobile Number</Form.Label>
                                <Form.Control
                                    className="mod_input"
                                    size="sm"
                                    name="phone"
                                    defaultValue={currentEmp.mobileNo}
                                    type="tel"
                                    onChange={(e) =>{setMobileNo(e.target.value);}}
                                    placeholder="Mobile Number"
                                />
                                <Form.Text className="text-danger"></Form.Text>
                            </Form.Group>
                            <Button className="edit_button" type="button" onClick={updateEmployee}>
                               Update
                            </Button>
                            </Form>
                    </Modal.Body>
                </Modal>
                <Modal size="md" show={showViewPopup} onHide={closeViewPopup}  animation={true}>
                    <Modal.Header className="mod_head text-center" closeButton>
                        <Modal.Title className="w-100">View Details</Modal.Title>
                        <br />
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                    <Form.Group as={Row} controlId="formPlaintextEmail">
    <Form.Label column sm="4">
      First Name
    </Form.Label>
    <Col sm="8">
      <Form.Control plaintext readOnly defaultValue={firstName} />
    </Col>
  </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintextEmail">
    <Form.Label column sm="4">
      Last Name
    </Form.Label>
    <Col sm="8">
      <Form.Control plaintext readOnly defaultValue={lastName} />
    </Col>
  </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintextEmail">
    <Form.Label column sm="4">
      Email
    </Form.Label>
    <Col sm="8">
      <Form.Control plaintext readOnly defaultValue={emailId} />
    </Col>
  </Form.Group>
  <Form.Group as={Row} controlId="formPlaintextEmail">
    <Form.Label column sm="4">
      Mobile No
    </Form.Label>
    <Col sm="8">
      <Form.Control plaintext readOnly defaultValue={mobileNo} />
    </Col>
  </Form.Group>
                            <Button className="edit_button" type="button" onClick={closeViewPopup}>
                               Close
                            </Button>
                            </Form>
                    </Modal.Body>
                </Modal>
        </div>
    );
}

export default EmployeeTable;
