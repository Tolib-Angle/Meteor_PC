import React from 'react';
import {CustomersCollection} from "../api/customers";
import {ContractsCollection} from "../api/contracts";

export class CustomersForm extends React.Component {
    constructor(data) {
        super(data);
        this.saveCurrent = this.saveCurrent.bind(this);
        this.state = {
            obj: data.obj,
            customer_name: data.obj.customer_name,
            address: data.obj.address,
            phone: data.obj.phone,
            full_name_customer: data.obj.full_name_customer,
            error: null
        }
    }
    static getDerivedStateFromProps(props, state) {
        if(props.obj !== state.obj) {
            return {
                obj: props.obj,
                customer_name: props.obj.customer_name ? props.obj.customer_name : "",
                address: props.obj.address ? props.obj.address : "",
                phone: props.obj.phone ? props.obj.phone : "",
                full_name_customer: props.obj.full_name_customer ? props.obj.full_name_customer : "",
                error: null
            }
        }else{
            return state;
        }
    }
    saveCurrent(event){
        event.preventDefault();

        if(!this.state.customer_name || this.state.customer_name.length === 0){
            this.setState(old_state => {
                old_state.error = <p>Название компании заказчика не указан</p>;
                return old_state;
            });
            return;
        }
        if(!this.state.address || this.state.address.length === 0){
            this.setState(old_state => {
                old_state.error = <p>Адрес заказчика указано не верно</p>;
                return old_state;
            })
            return;
        }
        if(!this.state.phone || this.state.phone.length === 0){
            this.setState(old_state => {
                old_state.error = <p>Номер телефон заказчика не указано</p>;
                return old_state;
            })
            return;
        }
        if(!this.state.full_name_customer || this.state.full_name_customer.length === 0){
            this.setState(old_state => {
                old_state.error = <p>Имя заказчика не указано не указано</p>;
                return old_state;
            })
            return;
        }

        CustomersCollection.update(this.state.obj._id, {
            $set:{
                customer_name: this.state.customer_name,
                address: this.state.address,
                phone: this.state.phone,
                full_name_customer: this.state.full_name_customer
            }
        }, {upsert: true})
    }
    render() {
        return <div className="divBlock">
            <h4 className="text-center">Editing</h4>
            <form onSubmit={this.saveCurrent}>
                <label>Customer company name</label><br></br>
                <input type="edit" value={this.state.customer_name} onChange={e => {this.setState({customer_name: e.target.value})}}/><br/>
                <label>Address</label><br></br>
                <input type="edit" value={this.state.address} onChange={e => {this.setState({address: e.target.value})}}/><br/>
                <label>Phone</label><br></br>
                <input type="edit" value={this.state.phone} onChange={e => {this.setState({phone: e.target.value})}}/><br/>
                <label>Full name customer</label><br></br>
                <input type="edit" value={this.state.full_name_customer} onChange={e => {this.setState({full_name_customer: e.target.value})}}/><br/><br></br>
                <input className="button" type={"submit"} value={"Save"}/>
                {this.state.error}
            </form>
        </div>
    }
}