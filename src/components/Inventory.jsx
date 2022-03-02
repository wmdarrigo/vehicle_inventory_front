import React, { useEffect, useState } from 'react'
import { Table, Space } from 'antd'
import PostBike from './PostBike'
import UpdateBike from './UpdateBike'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons' 

const Inventory = () => {
    const [bikes, setBikes] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [selectedBike, setSelectedBike] = useState(null)
    const [refresh, setRefresh] = useState(false)
    const { Column } = Table;

    const columns = [
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
        },
        {
            title: 'Make',
            dataIndex: 'make',
            key: 'make',
        },
        {
            title: 'Model',
            dataIndex: 'model',
            key: 'model',
        },
        {
            title: 'Color',
            dataIndex: 'color',
            key: 'color',
        },
        {
            title: 'CC',
            dataIndex: 'CC',
            key: 'CC',
        },
        {
            title: 'Miles',
            dataIndex: 'miles',
            key: 'miles',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'NADA',
            dataIndex: 'NADA',
            key: 'NADA',
        },
        {
            title: 'KBB',
            dataIndex: 'KBB',
            key: 'KBB',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <DeleteOutlined onClick={()=> deleteBike(record._id)}/>
                    <EditOutlined onClick={()=> {
                        setSelectedBike(record)
                        setShowForm(!showForm)
                    }}/>
                </Space>
            )
        }
    ]

    useEffect(() => {
        fetch('https://dealership-vehicle-inventory.herokuapp.com/bikes')
            .then(res => res.json())
            .then(data => setBikes(data))
        setRefresh(false)
    }, [refresh])

    const addKeyProp = (tableData) => {
        const newTable = []
        let counter = 1
        tableData.forEach((data) => {
            newTable.push({
                ...data,
                key: counter
            })
            counter += 1
        })
        return newTable
    }

    const deleteBike = (id) => {
        fetch('https://dealership-vehicle-inventory.herokuapp.com/bikes' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Deletion Success: ', data)
            })
            .catch((error) => {
                console.error('Error: ', error)
            })
        setRefresh(true)
    }
    // information such as sold, date listed, date sold, COGS, revenue, notes, customer, should be hidden. If user clicks icon show more, then a modal will appear with the info

    return (
        <div>
            {
                selectedBike &&
                        <UpdateBike 
                            showForm={showForm} 
                            setShowForm={setShowForm} 
                            setRefresh={setRefresh}
                            selectedBike={selectedBike}
                            setSelectedBike={setSelectedBike} 
                        />
            }
            <Table 
                dataSource={addKeyProp(bikes)} 
                columns={columns}
                style={{ padding: '20px 50px' }}
            >
                <Column
                    title="Action"
                    key="action"
                />
            </Table>
            <PostBike setRefresh={setRefresh} />
        </div>
    )
}

export default Inventory
