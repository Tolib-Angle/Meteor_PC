import React from 'react';
import {ContractsCollection} from "../api/contracts";
import {WritersCollection} from "../api/writers";

export class ContractsForm extends React.Component{
    constructor(data) {
        super(data);
        this.selectWriters = this.selectWriters.bind(this);
        this.saveCurrent = this.saveCurrent.bind(this);
        this.state = {
            obj: data.obj,
            id_writer: data.obj.id_writer,
            contract_num: data.obj.contract_num,
            date_of_cons_contract: data.obj.date_of_cons_contract,
            term_of_the_contracs: data.obj.term_of_the_contracs,
            validy_of_the_contract: data.obj.validy_of_the_contract,
            date_of_terminition_contract: data.obj.date_of_terminition_contract,
            error: null
        }
    }
    static getDerivedStateFromProps(props, state) {
        if(props.obj !== state.obj) {
            return {
                obj: props.obj,
                id_writer: props.obj.id_writer ? props.obj.id_writer : "",
                contract_num: props.obj.contract_num ? props.obj.contract_num : "",
                date_of_cons_contract: props.obj.date_of_cons_contract ? props.obj.date_of_cons_contract : "",
                term_of_the_contract: props.obj.term_of_the_contract ? props.obj.term_of_the_contract : "",
                validy_of_the_contract: props.obj.validy_of_the_contract ? props.obj.validy_of_the_contract : "",
                date_of_terminition_contract: props.obj.date_of_terminition_contract ? props.obj.date_of_terminition_contract : "",
                error: null
            }
        }else{
            return state;
        }
    }
    saveCurrent(event){
        event.preventDefault();

        if(!this.state.contract_num || this.state.contract_num.length === 0 || this.state.contract_num <= 9999999 || this.state.contract_num > 99999999){
            this.setState(old_state => {
                old_state.error = <p>Номер контракта указан не верно! 8 - цифр!</p>;
                return old_state;
            })
            return;
        }
        if(!this.state.date_of_cons_contract || this.state.date_of_cons_contract.length === 0){
            this.setState(old_state => {
                old_state.error = <p>Дата заключения контракта не указан</p>;
                return old_state;
            });
            return;
        }
        if(!this.state.term_of_the_contract || this.state.term_of_the_contract.length === 0 || this.state.term_of_the_contract > 100){
            this.setState(old_state => {
                old_state.error = <p>Время заключения контракта указано не верно [1 - 99]</p>;
                return old_state;
            });
            return;
        }
        if(!this.state.validy_of_the_contract || this.state.validy_of_the_contract === 0){
            this.setState(old_state => {
                old_state.error = <p>Действейтельность контракта не верно</p>;
                return old_state;
            })
            return;
        }
        if(!this.state.date_of_terminition_contract || this.state.date_of_terminition_contract.length === 0){
            this.setState(old_state => {
                old_state.error = <p>Дата окончание контракта указано не верно</p>;
                return old_state;
            })
            return;
        }

        ContractsCollection.update(this.state.obj._id, {
            $set:{
                id_writer: this.state.id_writer,
                contract_num: this.state.contract_num,
                date_of_cons_contract: this.state.date_of_cons_contract,
                term_of_the_contract: this.state.term_of_the_contract,
                validy_of_the_contract: this.state.validy_of_the_contract,
                date_of_terminition_contract: this.state.date_of_terminition_contract,
            }
        }, {upsert: true})
    }

    selectWriters(writer){
        console.log(writer._id)
        this.setState(old => {
            old.id_writer = writer._id;
            return old;
        });
    }

    render() {
        return <div className="divBlock">
            <h4 className="text-center">Editing</h4>
            <div className="bblock">
                <form onSubmit={this.saveCurrent}>
                    <label>Writer: {this.state.id_writer == null ? "none" : (WritersCollection.findOne({_id: this.state.id_writer}).surname + " " + WritersCollection.findOne({_id: this.state.id_writer}).name + " " + WritersCollection.findOne({_id: this.state.id_writer}).middle_name)}</label><br></br>
                    <label>Contract number</label><br></br>
                    <input type="edit" value={this.state.contract_num} onChange={e => {this.setState({contract_num: e.target.value})}}/><br/>
                    <label>Date of conclusion of the contract</label><br></br>
                    <input type="edit" value={this.state.date_of_cons_contract} onChange={e => {this.setState({date_of_cons_contract: e.target.value})}}/><br/>
                    <label>The term of the contract</label><br></br>
                    <input type="edit" value={this.state.term_of_the_contract} onChange={e => {this.setState({term_of_the_contract: e.target.value})}}/><br/>
                    <label>Validity of the contract</label><br></br>
                    <input type="edit" value={this.state.validy_of_the_contract} onChange={e => {this.setState({validy_of_the_contract: e.target.value})}}/><br/>
                    <label>Contract end date</label><br></br>
                    <input type="edit" value={this.state.date_of_terminition_contract} onChange={e => {this.setState({date_of_terminition_contract: e.target.value})}}/><br/>
                    <br></br>
                    <input className="button" type={"submit"} value={"Save"}/>
                </form>
            </div>
            {this.state.error}

            <div className="bblock">
                <div className="table3" style={{overflow: "scroll"}}>
                    <table className="table2">
                        <thead>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Middle name</th>
                        </thead>
                        <tbody>
                        {WritersCollection.find({}).fetch().map(emp => <tr onClick={e => {this.selectWriters(emp)}}><td>{emp.name}</td><td>{emp.surname}</td><td>{emp.middle_name}</td></tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    }
}