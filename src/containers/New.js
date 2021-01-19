import React, { useState } from 'react'
import { CREATE_SPENDING_MUTATION } from '../graphql/index'
import { useMutation } from '@apollo/react-hooks'
import { Modal, Button, Form, Input, Tag, DatePicker, TimePicker, Space, InputNumber, message } from 'antd'

const { CheckableTag } = Tag;
const dateFormat = "YYYY-MM-DD"
const timeFormat = "HH:mm"
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

function New(props) {
	const [visible, setVisible] = useState(false);
  	const [confirmLoading, setConfirmLoading] = useState(false);
  	const [addSpending] = useMutation(CREATE_SPENDING_MUTATION)
  	const user = props.user
  	const [date, setDate] = useState("")
  	const [time, setTime] = useState("")
  	const [type, setType] = useState("")
  	const [detail, setDetail] = useState("")
  	const [amount, setAmount] = useState(0)

  	const showModal = () => {
    	setVisible(true);
  	};

  	const handleOk = () => {
  		if (type && detail && amount && date && time) {
  			addSpending({
  				variables: {
  					user: user,
  					date: date.format(dateFormat)+" "+time.format(timeFormat),
  					type: type,
  					detail: detail,
  					amount: amount,
  				}
  			})
  			setConfirmLoading(true);
	    	setTimeout(() => {
	      		setVisible(false);
	      		setConfirmLoading(false);
	    		}, 200
	    	);
	    	setDate("");
	    	setTime("");
	    	setType("");
	    	setDetail("");
	    	setAmount(0)
  		} else {
  			message.warning("Something was omitted")
  		}
	    	
  	};

  	const handleCancel = () => {
    	console.log('Clicked cancel button');
    	setVisible(false);
  	};

	return (
			<span>
				<Button style={{float:"right"}} onClick={showModal}>add New</Button>
				<Modal 
					title="Title"
					visible={visible}
					onOk={handleOk}
					confirmLoading={confirmLoading}
					onCancel={handleCancel}
				>
					<Form
						{...layout}
						name="new"
					>
						<Form.Item
							label="Detail"
							name="detail"
						>
							<Input 
								onChange={(e) => {setDetail(e.target.value)}}
							/>
						</Form.Item>
						<Form.Item
							label="Type"
							name="type"
						>	
								<span>
								<CheckableTag
									key="Food"
									checked={"Food" === type}
									onChange={() => {setType("Food")}}
								>Food</CheckableTag>
								<CheckableTag
									key="Drink"
									checked={"Drink" === type}
									onChange={() => {setType("Drink")}}
								>Drink</CheckableTag>
								<CheckableTag
									key="Daily"
									checked={"Daily" === type}
									onChange={() => {setType("Daily")}}
								>Daily</CheckableTag>
								<CheckableTag
									key="Medical"
									checked={"Medical" === type}
									onChange={() => {setType("Medical")}}
								>Medical</CheckableTag>
								<CheckableTag
									key="Incomes"
									checked={"Incomes" === type}
									onChange={() => {setType("Incomes")}}
								>Incomes</CheckableTag>
								<CheckableTag
									key="Consumption"
									checked={"Consumption" === type}
									onChange={() => {setType("Consumption")}}
								>Consumption</CheckableTag>
								<CheckableTag
									key="Entertainment"
									checked={"Entertainment" === type}
									onChange={() => {setType("Entertainment")}}
								>Entertainment</CheckableTag>
								<CheckableTag
									key="Others"
									checked={"Others" === type}
									onChange={() => {setType("Others")}}
								>Others</CheckableTag>
							</span>
						</Form.Item>
						<Form.Item
							label="Date"
							name="date"
						>
							<Space>
								<DatePicker 
									format={dateFormat}
									value={date}
									onChange={date => setDate(date)}
								/>
								<TimePicker 
									format={timeFormat} 
									value={time}
									onChange={time => setTime(time)}
								/>
							</Space>
						</Form.Item>
						<Form.Item
							label="Amount"
							name="amount"
						>
							<InputNumber value={amount} onChange={amount => {setAmount(amount)}}/>
						</Form.Item>
					</Form>
				</Modal>
			</span>
		)
}

export { New }