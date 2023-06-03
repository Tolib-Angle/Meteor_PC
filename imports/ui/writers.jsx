import React from 'react';
import {WritersCollection} from "../api/writers";

export class WritersForm extends React.Component{
    constructor(data) {
        super(data);
        this.saveCurrent = this.saveCurrent.bind(this);
        this.state = {
            obj: data.obj,
            passport_number: data.obj.passport_number,
            surname: data.obj.surname,
            name: data.obj.name,
            middle_name: data.obj.middle_name,
            address: data.obj.address,
            phone: data.obj.phone,
            error: null
        }
    }
    static getDerivedStateFromProps(props, state) {
        if(props.obj !== state.obj) {
            return {
                obj: props.obj,
                passport_number: props.obj.passport_number ? props.obj.passport_number : "",
                surname: props.obj.surname ? props.obj.surname : "",
                name: props.obj.name ? props.obj.name : "",
                middle_name: props.obj.middle_name ? props.obj.middle_name : "",
                address: props.obj.address ? props.obj.address : "",
                phone: props.obj.phone ? props.obj.phone : "",
                error: null
            }
        }else{
            return state;
        }
    }
    saveCurrent(event){
        event.preventDefault();

        if(!this.state.passport_number || this.state.passport_number.length === 0 || this.state.passport_number <= 9999999 || this.state.passport_number > 99999999){
            this.setState(old_state => {
                old_state.error = <p>Номер паспорта указан не верно! 8 - цифр!</p>;
                return old_state;
            })
            return;
        }
        if(!this.state.surname || this.state.surname.length === 0){
            this.setState(old_state => {
                old_state.error = <p>Фамилия не указано</p>;
                return old_state;
            })
            return;
        }
        if(!this.state.name || this.state.name.length === 0){
            this.setState(old_state => {
                old_state.error = <p>Имя не указано</p>;
                return old_state;
            })
            return;
        }
        if(!this.state.middle_name || this.state.middle_name.length === 0){
            this.setState(old_state => {
                old_state.error = <p>Отчества не указано</p>;
                return old_state;
            })
            return;
        }
        if(!this.state.address || this.state.address.length === 0){
            this.setState(old_state => {
                old_state.error = <p>Адрес не указано</p>;
                return old_state;
            })
            return;
        }
        if(!this.state.phone || this.state.address.length === 0){
            this.setState(old_state => {
                old_state.error = <p>Номер телефона не указано</p>;
                return old_state;
            })
            return;
        }

        WritersCollection.update(this.state.obj._id, {
            $set:{
                passport_number: this.state.passport_number,
                surname: this.state.surname,
                name: this.state.name,
                middle_name: this.state.middle_name,
                address: this.state.address,
                phone: this.state.phone,
            }
        }, {upsert: true})
    }

    render() {
        return <div className="divBlock">
            <h4 class="text-center">Editing</h4>
            <form onSubmit={this.saveCurrent}>
                <label>Passport number</label><br></br>
                <input type="edit" value={this.state.passport_number} onChange={e => {this.setState({passport_number: e.target.value})}}/><br/>
                <label>Surname</label><br></br>
                <input type="edit" value={this.state.surname} onChange={e => {this.setState({surname: e.target.value})}}/><br/>
                <label>Name</label><br></br>
                <input type="edit" value={this.state.name} onChange={e => {this.setState({name: e.target.value})}}/><br/>
                <label>Middle name</label><br></br>
                <input type="edit" value={this.state.middle_name} onChange={e => {this.setState({middle_name: e.target.value})}}/><br/>
                <label>Address</label><br></br>
                <input type="edit" value={this.state.address} onChange={e => {this.setState({address: e.target.value})}}/><br/>
                <label>Phone</label><br></br>
                <input type="edit" value={this.state.phone} onChange={e => {this.setState({phone: e.target.value})}}/><br/>
                <input className="button" type={"submit"} value={"Save"}/>
                {this.state.error}
            </form>
        </div>
    }
}