import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap';
const StudentReport = () => {
    const [reports, setReport] = useState([])

    useEffect(() => {
        async function userData() {
            const { data } = await axios.get('http://localhost:5000/faculty/studentreport')
            setReport(data);
        }
        userData();
    }, []);
    return (
        <div className='container report_screen'>
            <h1>Student Report</h1>
            <Table striped bordered hover variant="dark" responsive >
                <thead>
                    <tr>
                        <th>Report ID</th>
                        <th>Student Name</th>
                        <th>Email</th>
                        <th>Course Name</th>
                        <th>Assignment</th>
                        <th>Marks Obtained</th>
                        <td>Passed</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        reports.map(report => (
                            <tr>
                                <td>{report._id}</td>
                                <td>{report.name}</td>
                                <td>{report.email}</td>
                                <td>{report.course}</td>
                                <td>{(report.assignment) == 'yes' ? (
                                    <div className="report_status_ok"> <i class="fa-solid fa-check"></i></div>
                                ) : (
                                    <div className="report_status_wrong"><i class="fa-solid fa-circle-xmark"></i></div>
                                )
                                }</td>
                                <td>{report.test}</td>
                                <td><div className="passed">{

                                    (report.assignment) == 'yes' && (report.test) >= 30 ? (
                                        <div className="report_status_ok"> <i class="fa-solid fa-check"></i></div>
                                    ) :
                                        (
                                            <div className="report_status_wrong"><i class="fa-solid fa-circle-xmark"></i></div>
                                        )

                                }</div></td>
                            </tr>
                        ))

                    }
                </tbody>
            </Table>
        </div>
    )
}

export default StudentReport
