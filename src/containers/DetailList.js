import React from 'react';
import { Row, Col, Table, Tag, Space, Popconfirm } from 'antd'

var moment = require('moment')
const dateFormat = "YYYY-MM-DD HH:mm"

function DetailList(props) {
	const Spending = props.data.Spending
						.map((e) => {
							return {"key": e.id, "detail": e.detail, "date": e.date, "type": e.type, "amount": e.amount}
						})
						.sort((a,b) => {
							const a_date = moment(a.date, dateFormat).valueOf()
							const b_date = moment(b.date, dateFormat).valueOf()
							if (a_date === b_date) {
								return true
							} else {return b_date - a_date}
						})
						.filter((e) => e.amount !== 0)
	const handleSpendingEdit = props.edit

	const columns = [
		{
			title: "Detail",
			dataIndex: "detail",
			key: "detail",
			render: text => <a href="/#">{text}</a>,
		},
		{
			title: "Date",
			dataIndex: 'date',
			key: 'date',
		},
		{
			title: 'Type',
			key: 'type',
			dataIndex: 'type',
			render: type => <Tag
								color={
									(type === 'Food') ? "volcano" :
									(type === 'Drink') ? "cyan" : 
									(type === 'Daily') ? "green" :
									(type === 'Medical') ? "red" :
									(type === 'Incomes') ? "gold" :
									(type === 'Consumption') ? "purple" :
									(type === 'Entertainment') ? "orange" : null
								}
								key={type}>
								{type}
							</Tag>
		},
		{
			title: 'Amount',
			dataIndex: 'amount',
			key: 'amount',
		},
		{
			title: 'Edit',
			key: 'edit',
			render: (text, record) => (
					<Space size="middle">
						<a href="/#" onClick={() => handleSpendingEdit("EDIT",record.key)}>Edit</a>
						<Popconfirm
							title="Are you sure?"
						    onConfirm={() => handleSpendingEdit("DELETE",record.key)}
						    okText="Yes"
						    cancelText="No">
							<a href="/#">delete</a>
						</Popconfirm>
					</Space>
				)
		}
	]

	return (
		<Row gutter={10}>
			<Col span={24}>
				<Table columns={columns} dataSource={Spending} size="small" pagination={{ pageSize: 8 }}/>
			</Col>
		</Row>
		)
}

export { DetailList }