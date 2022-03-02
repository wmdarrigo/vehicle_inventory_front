import React, { useState } from 'react'
import { Modal, Form, Input, DatePicker, InputNumber, Select } from 'antd';
import moment from 'moment';

const UpdateBike = ({showForm, setShowForm, selectedBike, setRefresh, setSelectedBike}) => {
    const [year, setYear] = useState(selectedBike.year)
    const [make, setMake] = useState(selectedBike.make)
    const [model, setModel] = useState(selectedBike.model)
    const [color, setColor] = useState(selectedBike.color)
    const [price, setPrice]= useState(selectedBike.price)
    const [COGS, setCOGS] = useState(selectedBike.COGS)
    const [KBB, setKBB] = useState(selectedBike.KBB)
    const [NADA, setNADA] = useState(selectedBike.NADA)
    const [notes, setNotes] = useState(selectedBike.notes)
    const [miles, setMiles] = useState(selectedBike.miles)
    const [CC, setCC] = useState(selectedBike.CC)
    const [VIN, setVIN] = useState(selectedBike.VIN)
    const [dateListed, setDateListed] = useState(selectedBike.dateListed)
    const { Option } = Select

    const submitForm = () => {
        setShowForm(false)

        const formData = {
            "year": year,
            "make": make,
            "model": model,
            "color": color,
            "CC": CC,
            "price": price,
            "COGS": COGS,
            "revenue": 0,
            "NADA": NADA,
            "KBB": KBB,
            "miles": miles,
            "VIN": VIN,
            "notes": notes,
            "dateListed": dateListed,
            "dateSold": null,
            "sold": false,
            "customer": null,
            "dealer": null
        }

        console.log('color: ', color)

        fetch('https://dealership-vehicle-inventory.herokuapp.com/bikes/' + selectedBike._id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success: ', data)
            })
            .catch((error) => {
                console.error('Error: ', error)
            })

        setRefresh(true)
    }

    const handleCancel = () => {
        console.log('Canceled form')
        setSelectedBike(null)
        setShowForm(false)
    }

    return (
        <>
           <Modal 
                title="Add vehicle" 
                visible={showForm} 
                onOk={submitForm} 
                onCancel={handleCancel} 
            >
                <Form
                    name="basic"
                    layout="vertical"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        "year": year,
                        "make": make,
                        "model": model,
                        "color": color,
                        "CC": CC,
                        "price": price,
                        "COGS": COGS,
                        "NADA": NADA,
                        "KBB": KBB,
                        "miles": miles,
                        "VIN": VIN,
                        "notes": notes,
                        "dateListed": moment(dateListed, 'YYYY/MM/DD')
                    }}
                    autoComplete="off"
                    >
                    <Form.Item
                        label="Year"
                        name="year"
                    >
                        <InputNumber 
                            type="number"
                            placeholder="Enter bike's year"
                            value={year}
                            onChange={(value) => setYear(value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Make"
                        name="make"
                    >
                        <Input 
                            placeholder="Enter make"
                            type="text"
                            value={make}
                            onChange={(e) => setMake(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Model"
                        name="model"
                    >
                        <Input 
                            placeholder="Enter model"
                            value={model}
                            type="text"
                            onChange={(e) => setModel(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Color"
                        name="color"
                    >
                        <Select style={{ width:120 }} onChange={(value)=>setColor(value)}>
                            <Option value="black">Black</Option>
                            <Option value="blue">Blue</Option>
                            <Option value="burgundy">Burgundy</Option>
                            <Option value="green">Green</Option>
                            <Option value="grey">Grey</Option>
                            <Option value="orange">Orange</Option>
                            <Option value="purple">Purple</Option>
                            <Option value="red">Red</Option>
                            <Option value="white">White</Option>
                            <Option value="yellow">Yellow</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="VIN"
                        name="VIN"
                    >
                        <Input 
                            placeholder="Enter VIN (optional)"
                            value={VIN}
                            type="text"
                            onChange={(e) => setVIN(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="CC"
                        name="CC"
                    >
                        <InputNumber 
                            placeholder="Enter CC of engine"
                            value={CC}
                            onChange={(value) => setCC(value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Miles"
                        name="miles"
                    >
                        <InputNumber
                            placeholder="Enter miles"
                            value={miles}
                            onChange={(value) => setMiles(value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Date Listed"
                        name="dateListed"
                    >
                        <DatePicker 
                            placeholder="Enter date of stock "
                            value={dateListed}
                            onChange={(value) => setDateListed(value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="COGS"
                        name="COGS"
                    >
                        <InputNumber 
                            placeholder="Cost of goods sold (bike)"
                            value={COGS}
                            onChange={(value) => setCOGS(value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="KBB Price"
                        name="KBB"
                    >
                        <InputNumber 
                            placeholder="Blue book price"
                            value={KBB}
                            onChange={(value) => setKBB(value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="NADA Price"
                        name="NADA"
                    >
                        <InputNumber 
                            placeholder="NADA price"
                            value={NADA}
                            onChange={(value) => setNADA(value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Sales Price"
                        name="price"
                    >
                        <InputNumber 
                            placeholder="Enter sales price"
                            value={price}
                            onChange={(value) => setPrice(value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Notes"
                        name="notes"
                    >
                        <Input.TextArea 
                            placeholder="Enter notes here"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </Form.Item>
                </Form>
           </Modal>
        </>
    )
}

export default UpdateBike
