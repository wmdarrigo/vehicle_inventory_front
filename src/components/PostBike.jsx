import React, {useState} from 'react'
import { Modal, Button, Form, Input, DatePicker, InputNumber, Select } from 'antd';

const PostBike = ({setRefresh}) => {
    const [showForm, setShowForm] = useState(false)
    const [year, setYear] = useState()
    const [make, setMake] = useState('')
    const [model, setModel] = useState('')
    const [color, setColor] = useState('')
    const [price, setPrice]= useState()
    const [COGS, setCOGS] = useState()
    const [KBB, setKBB] = useState()
    const [NADA, setNADA] = useState()
    const [notes, setNotes] = useState('')
    const [miles, setMiles] = useState()
    const [CC, setCC] = useState()
    const [VIN, setVIN] = useState()
    const [dateListed, setDateListed] = useState()
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

        fetch('https://dealership-vehicle-inventory.herokuapp.com/bikes', {
            method: 'POST',
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
        setShowForm(false)
    }

    return (
        <>
            <Button 
                onClick={() => setShowForm(!showForm)} 
                type="primary"
                style={{ margin: '0px 50px' }}
            >
                Add vehicle
            </Button>
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
                        remember: true,
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
                        name="vin"
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
                        name="cc"
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
                        name="cogs"
                    >
                        <InputNumber 
                            placeholder="Cost of goods sold (bike)"
                            value={COGS}
                            onChange={(value) => setCOGS(value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="KBB Price"
                        name="kbb"
                    >
                        <InputNumber 
                            placeholder="Blue book price"
                            value={KBB}
                            onChange={(value) => setKBB(value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="NADA Price"
                        name="nada"
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

export default PostBike
