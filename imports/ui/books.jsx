import React from 'react';
import {BooksCollection} from "../api/books";
import {WritersCollection} from "../api/writers";

export class BooksForm extends React.Component {
    constructor(data) {
        super(data);
        this.removeWriter = this.removeWriter.bind(this);
        this.addWriter = this.addWriter.bind(this);
        this.saveCurrent = this.saveCurrent.bind(this);
        this.state = {
            obj: data.obj,
            cepher_of_the_book: data.obj.cepher_of_the_book,
            id_writers: data.obj.id_writers,
            name: data.obj.name,
            title: data.obj.title,
            circulation: data.obj.circulation,
            release_date: data.obj.release_date,
            cost_price: data.obj.cost_price,
            sale_price: data.obj.sale_price,
            fee: data.obj.fee,
            error: null
        }
    }
    static getDerivedStateFromProps(props, state) {
        if(props.obj !== state.obj) {
            return {
                obj: props.obj,
                cepher_of_the_book: props.obj.cepher_of_the_book ? props.obj.cepher_of_the_book : "",
                id_writers: props.obj.id_writers ? props.obj.id_writers : "",
                name: props.obj.name ? props.obj.name : "",
                title: props.obj.title ? props.obj.title : "",
                circulation: props.obj.circulation ? props.obj.circulation : "",
                release_date: props.obj.release_date ? props.obj.release_date : "",
                cost_price: props.obj.cost_price ? props.obj.cost_price : "",
                sale_price: props.obj.sale_price ? props.obj.sale_price : "",
                fee: props.obj.release_date ? props.obj.fee : "",
                error: null
            }
        }else{
            return state;
        }
    }
    saveCurrent(event){
        event.preventDefault();

        if(!this.state.cepher_of_the_book || this.state.cepher_of_the_book.length === 0 || this.state.cepher_of_the_book <= 9999999 || this.state.cepher_of_the_book > 99999999){
            this.setState(old_state => {
                old_state.error = <p>Шифр книги указан не верно! 8 - цифр!</p>;
                return old_state;
            })
            return;
        }
        if(!this.state.name || this.state.name.length === 0){
            this.setState(old_state => {
                old_state.error = <p>Имя издателя не указан</p>;
                return old_state;
            });
            return;
        }
        if(!this.state.title || this.state.title.length === 0){
            this.setState(old_state => {
                old_state.error = <p>Заголовок книги не указан</p>;
                return old_state;
            })
            return;
        }
        if(!this.state.circulation || this.state.circulation > 1 || this.state.circulation < 1000000){
            this.setState(old_state => {
                old_state.error = <p>Количество заказанный книг указан не верно</p>;
                return old_state;
            })
            return;
        }
        if(!this.state.release_date || this.state.release_date.length === 0){
            this.setState(old_state => {
                old_state.error = <p>Дата печати книги не указан</p>;
                return old_state;
            });
            return;
        }
        if(!this.state.cost_price || this.state.cost_price > 1 || this.state.cost_price < 1000000){
            this.setState(old_state => {
                old_state.error = <p>Себестоимость книги указан не верно</p>;
                return old_state;
            })
            return;
        }
        if(!this.state.sale_price || this.state.sale_price > 1 || this.state.sale_price < 1000000){
            this.setState(old_state => {
                old_state.error = <p>Стоимость книги указан не верно</p>;
                return old_state;
            })
            return;
        }
        if(!this.state.fee || this.state.fee > 1 || this.state.fee < 1000000){
            this.setState(old_state => {
                old_state.error = <p>Доход от книги указан не верно</p>;
                return old_state;
            })
            return;
        }

        BooksCollection.update(this.state.obj._id, {
            $set:{
                cepher_of_the_book: this.state.cepher_of_the_book,
                id_writers: this.state.id_writers,
                name: this.state.name,
                title: this.state.title,
                circulation: this.state.circulation,
                release_date: this.state.release_date,
                cost_price: this.state.cost_price,
                sale_price: this.state.sale_price,
                fee: this.state.fee,
            }
        }, {upsert: true})
    }
    removeWriter(e, writer){
        e.preventDefault();
        this.setState(old =>{
            const index = old.id_writers.indexOf(writer);
            if(index !== -1){
                old.id_writers.splice(index, 1);
            }
            return old;
        })
    }

    addWriter(e, writer){
        e.preventDefault();
        this.setState(state => {
            if(state.id_writers == null || state.id_writers.length === 0){
                state.id_writers = [];
            }
            state.id_writers.push(writer._id);
            return state;
        })
    }

    render() {

        const rows = [];


        if(this.state.id_writers)
            for(let i = 0; i < this.state.id_writers.length; i++){
                const writer = this.state.id_writers[i];
                const name = (i + 1 + "." + WritersCollection.findOne({_id: writer}).name + " " + WritersCollection.findOne({_id: writer}).surname);
                rows.push(<tr><td>{name}</td><td><button className="button2" onClick={e => this.removeWriter(e,writer)}>Remove</button></td></tr>);
            }

        return <div className="divBlock">
            <h4 className="text-center">Editing</h4>
            <div>
                <div className="bblock">
                    <form onSubmit={this.saveCurrent}>
                        <label>Cepher of the book</label><br></br>
                        <input type="edit" value={this.state.cepher_of_the_book} onChange={e => {this.setState({cepher_of_the_book: e.target.value})}}/><br/>
                        <div>
                            <table>
                                <thead>
                                <th>Writers: </th>
                                </thead>
                                <tbody>
                                {rows}
                                </tbody>
                            </table>
                        </div>
                        <label>Company name</label><br></br>
                        <input type="edit" value={this.state.name} onChange={e => {this.setState({name: e.target.value})}}/><br/>
                        <label>Title</label><br></br>
                        <input type="edit" value={this.state.title} onChange={e => {this.setState({title: e.target.value})}}/><br/>
                        <label>Количество напечатанных книг</label><br></br>
                        <input type="edit" value={this.state.circulation} onChange={e => {this.setState({circulation: e.target.value})}}/><br/>
                        <label>Release date</label><br></br>
                        <input type="edit" value={this.state.release_date} onChange={e => {this.setState({release_date: e.target.value})}}/><br/>
                        <label>Cost price</label><br></br>
                        <input type="edit" value={this.state.cost_price} onChange={e => {this.setState({cost_price: e.target.value})}}/><br/>
                        <label>Sale price</label><br></br>
                        <input type="edit" value={this.state.sale_price} onChange={e => {this.setState({sale_price: e.target.value})}}/><br/>
                        <label>Fee</label><br></br>
                        <input type="edit" value={this.state.fee} onChange={e => {this.setState({fee: e.target.value})}}/><br/><br></br>
                        <input className="button" type={"submit"} value={"Save"}/>
                    </form>
                </div>
                {this.state.error}
                <div className="bblock" style={{overflow: "scroll"}}>
                    <table>
                        <thead>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Middle name</th>
                        </thead>
                        <tbody>
                        {WritersCollection.find({}).fetch().map(writer => <tr><th>{writer.name}</th><th>{writer.surname}</th><th>{writer.middle_name}</th><th><button className="button2" onClick={e => this.addWriter(e,writer)}>Add</button></th></tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    }
}