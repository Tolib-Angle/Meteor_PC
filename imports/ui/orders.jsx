import React from "react";
import {OrdersCollection} from "../api/orders";
import {CustomersCollection} from "../api/customers";
import {BooksCollection} from "../api/books";
export class OrdersForm extends React.Component{
    constructor(props) {
        super(props);

        this.selectBook = this.selectBook.bind(this);
        this.selectCustomer = this.selectCustomer.bind(this);
        this.saveCurrent = this.saveCurrent.bind(this);

        this.state = {
            obj: props.obj,
            id_customer: props.obj.id_customer,
            order_number: props.obj.order_number,
            date_of_receipt_order: props.obj.date_of_receipt_order,
            order_compiletion_date: props.obj.order_compiletion_date,
            id_book: props.obj.id_book,
            numbers_of_orders: props.obj.numbers_of_orders,
            error: null
        }
    }
    static getDerivedStateFromProps(props, state) {
        if(props.obj !== state.obj) {
            return {
                obj: props.obj,
                id_customer: props.obj.id_customer ? props.obj.id_customer : "",
                order_number: props.obj.order_number ? props.obj.order_number : "",
                date_of_receipt_order: props.obj.date_of_receipt_order ? props.obj.date_of_receipt_order : "",
                order_compiletion_date: props.obj.order_compiletion_date ? props.obj.order_compiletion_date : "",
                id_book: props.obj.id_book ? props.obj.id_book : "",
                numbers_of_orders: props.obj.numbers_of_orders ? props.obj.numbers_of_orders : "",
                error: null
            }
        }else{
            return state;
        }
    }
    selectBook(emp){
        this.setState(state =>{
            state.id_book = emp._id;
            return state;
        });
    }

    selectCustomer(snack){
        this.setState(state =>{
            state.id_customer = snack._id;
            return state;
        });
    }
    saveCurrent(event){
        event.preventDefault();

        if(this.state.id_book == null){
            this.setState(state => {
                state.error = <p>Книга не указан</p>
                return state;
            })
            return;
        }

        if(this.state.id_customer == null){
            this.setState(state => {
                state.error = <p>Заказчик не указана</p>
                return state;
            })
            return;
        }
        if(!this.state.order_number || this.state.order_number.length === 0 || this.state.order_number < 9999999 || this.state.order_number > 99999999){
            this.setState(state => {
                state.error = <p>Номер заказа указано не верно</p>
                return state;
            })
            return;
        }
        if(!this.state.numbers_of_orders || this.state.numbers_of_orders.length === 0 || this.state.numbers_of_orders < 0 || this.state.numbers_of_orders > 99999999){
            this.setState(state => {
                state.error = <p>Количество заказов указано не верно</p>
                return state;
            })
            return;
        }
        if(!this.state.date_of_receipt_order || this.state.date_of_receipt_order.length === 0){
            this.setState(state => {
                state.error = <p>Дата заказа не указано</p>
                return state;
            })
            return;
        }
        if(!this.state.order_compiletion_date || this.state.order_compiletion_date.length === 0){
            this.setState(state => {
                state.error = <p>Дата выполнения заказа не указано</p>
                return state;
            })
            return;
        }

        OrdersCollection.update(this.state.obj._id, {
            $set: {
                id_customer: this.state.id_customer,
                order_number: this.state.order_number,
                date_of_receipt_order: this.state.date_of_receipt_order,
                order_compiletion_date: this.state.order_compiletion_date,
                id_book: this.state.id_book,
                numbers_of_orders: this.state.numbers_of_orders,
            }
        }, {upsert: true});
    }
    render() {
        return <div className="divBlock">
            <h4 className="text-center">Editing</h4>
            <div className="bblock">
                <form onSubmit={this.saveCurrent}>
                    <label>Customer: </label>
                    <span>{this.state.id_customer == null ? "none" : CustomersCollection.findOne({_id: this.state.id_customer}).full_name_customer}</span><br/>
                    <label>Номер заказа</label><br></br>
                    <input type="edit" value={this.state.order_number} onChange={e => this.setState({order_number: e.target.value})}/><br/>
                    <label>Дата заказа</label><br></br>
                    <input type="edit" value={this.state.date_of_receipt_order} onChange={e => this.setState({date_of_receipt_order: e.target.value})}/><br/>
                    <label>Дата выполнения заказа</label><br></br>
                    <input type="edit" value={this.state.order_compiletion_date} onChange={e => this.setState({order_compiletion_date: e.target.value})}/><br/>
                    <label>Book: </label>
                    <span>{this.state.id_book == null ? "none" : BooksCollection.findOne({_id: this.state.id_book}).title}</span><br/>
                    <label>Количество заказанных книг</label><br></br>
                    <input type="edit" value={this.state.numbers_of_orders} onChange={e => this.setState({numbers_of_orders: e.target.value})}/><br/><br></br>
                    <input className="button" type={"submit"} value={"Save"}/>
                </form>
            </div>
            {this.state.error}

            <div className="bblock">
                <p>Customers</p>
                <div style={{overflow: "scroll", maxHeight: "200px"}}>
                    <table>
                        <thead>
                        <th>Full name customers</th>
                        </thead>
                        <tbody>
                        {CustomersCollection.find({}).fetch().map(emp => <tr onClick={e => {this.selectCustomer(emp)}}><td>{emp.full_name_customer}</td></tr>)}
                        </tbody>
                    </table>
                </div>
                <p>Books</p>
                <div style={{overflow: "scroll", maxHeight: "200px"}}>
                    <table>
                        <thead>
                        <th>Title book</th>
                        </thead>
                        <tbody>
                        {BooksCollection.find({}).fetch().map(snack => <tr onClick={e => {this.selectBook(snack)}}><td>{snack.title}</td></tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    }
}