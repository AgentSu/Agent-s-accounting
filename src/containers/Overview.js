import React from 'react';
import { Statistic, Row, Col } from 'antd'

function Overview(props) {
	//TODO
	const Spending = props.data.Spending
	let Expanses = 0 
	let Revenue = 0
	Spending.forEach(({amount}) => {
		if (parseInt(amount) > 0) {
			Revenue += amount
		} else {
			Expanses += amount
		}
		return
	})
	return (
		<Row gutter={10}>
			<Col span={6} offset={5}>
				<Statistic title="Total Expanses" value={Expanses} />
			</Col>
			<Col span={6}>
				<Statistic title="Total Revenue" value={Revenue} />
			</Col>
			<Col span={6}>
				<Statistic title="Total Balance" value={Revenue-Expanses} />
			</Col>
		</Row>
		)
}

export { Overview }