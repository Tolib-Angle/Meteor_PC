import React from 'react';
import { Meteor } from 'meteor/meteor';
import {useTracker} from 'meteor/react-meteor-data';
import {WritersCollection} from "../api/writers";
import {ContractsCollection} from "../api/contracts";
import {Table} from "./table";
import {WritersForm} from "./writers"
import {ContractsForm} from "./contracts"
import {CustomersCollection} from "../api/customers";
import {CustomersForm} from "./customers";
import {BooksCollection} from "../api/books";
import {BooksForm} from "./books";
import {OrdersCollection} from "../api/orders";
import {OrdersForm} from "./orders";
import {UserForm} from "./user";

function WritersRemove(writer){
    Meteor.call("PreWritersRemove", writer);
}

function BooksRemove(book){
    Meteor.call("PreBooksRemove", book);
}

function OrdersRemove(order){
    Meteor.call("PreOrderRemove", order);
}

export const Main = () => {

    const [Writers_query, Writers_setQuery] = React.useState(null);
    const [Contracts_query, Contracts_setQuery] = React.useState(null);
    const [Customers_query, Customers_setQuery] = React.useState(null);
    const [Books_query, Books_setQuery] = React.useState(null);
    const [Orders_query, Orders_setQuery] = React.useState(null);
    const [users_query, users_setQuery] = React.useState(null);

    const Writers = useTracker(() => WritersCollection.find(Writers_query != null ?
        {$or: [
                {passport_number : {$regex: Writers_query}},
                {surname : {$regex: Writers_query}},
                {name : {$regex: Writers_query}},
                {middle_name : {$regex: Writers_query}},
                {address : {$regex: Writers_query}},
                {phone : {$regex: Writers_query}},
            ]} : {}).fetch());
    const Contracts = useTracker(() => ContractsCollection.find(Contracts_query != null ?
        {$or: [
                {contract_num : {$regex: Contracts_query}},
                {date_of_cons_contract : {$regex: Contracts_query}},
                {term_of_the_contract : {$regex: Contracts_query}},
                {validy_of_the_contract: {$regex: Contracts_query}},
                {date_of_terminition_contract : {$regex: Contracts_query}}
            ]} : {}).fetch());
    const Customers = useTracker(() => CustomersCollection.find(Customers_query != null ?
        {$or: [
                {customer_name : {$regex: Customers_query}},
                {address : {$regex: Customers_query}},
                {phone : {$regex: Customers_query}},
                {full_name_customer: {$regex: Customers_query}}
            ]} : {}).fetch());
    const Books = useTracker(() => BooksCollection.find(Books_query != null ?
        {$or: [
                {cepher_of_the_book : {$regex: Books_query}},
                {name : {$regex: Books_query}},
                {title : {$regex: Books_query}},
                {circulation : {$regex: Books_query}},
                {release_date : {$regex: Books_query}},
                {cost_price : {$regex: Books_query}},
                {sale_price : {$regex: Books_query}},
                {fee : {$regex: Books_query}},
            ]} : {}).fetch());
    const Orders = useTracker(() => OrdersCollection.find(Orders_query != null ?
        {$or: [
                {order_number : {$regex: Orders_query}},
                {date_of_receipt_order : {$regex: Orders_query}},
                {order_compiletion_date : {$regex: Orders_query}},
                {numbers_of_orders : {$regex: Orders_query}},
            ]} : {}).fetch());
    let users = null;
    if(Meteor.user().username === "admin"){
        users = useTracker(() => Meteor.users.find(users_query != null ?
            {
                $or: [
                    {username: {$regex:users_query}}
                ]
            } : {}).fetch());
    }

    this.state = {page: 0};

    const [form, setForm] = React.useState(<div></div>);

    const tabs = {
        writers: <Table collection={WritersCollection} PreRemove={WritersRemove} setQuery={Writers_setQuery} form={WritersForm} data={Writers} setForm={setForm} columns={{
            PassportN: "passport_number",
            Surname: "surname",
            Name: "name",
            MiddleName: "middle_name",
            Address: "address",
            Phone: "phone"
        }}/>,
        contracts:<Table collection={ContractsCollection} setQuery={Contracts_setQuery} form={ContractsForm} data={Contracts} setForm={setForm} columns={{
            Writer: obj => {
                return obj.id_writer != null ? (WritersCollection.findOne({_id: obj.id_writer}).name + " " + WritersCollection.findOne({_id: obj.id_writer}).surname) : ""
            },
            ContractN: "contract_num",
            StartDate: "date_of_cons_contract",
            Term: "term_of_the_contract",
            Validy: "validy_of_the_contract",
            EndDate: "date_of_terminition_contract"
        }}/>,
        books:<Table collection={BooksCollection} setQuery={Books_setQuery} PreRemove={BooksRemove} form={BooksForm} data={Books} setForm={setForm} columns={{
            CepherBook: "cepher_of_the_book",
            ConpanyName: "name",
            Title: "title",
            Circulation: "circulation",
            ReleaseDate: "release_date",
            Cost$: "cost_price",
            Sale$: "sale_price",
            Fee$: "fee",
        }}/>,
        orders:<Table collection={OrdersCollection} setQuery={Orders_setQuery} PreRemove={OrdersRemove} form={OrdersForm} data={Orders} setForm={setForm} columns={{
            Customer: obj => {
                return obj.id_customer != null ? CustomersCollection.findOne({_id: obj.id_customer}).full_name_customer : ""
            },
            OrderN: "order_number",
            DateReceiptOrder: "date_of_receipt_order",
            OrderCompiletionDate: "order_compiletion_date",
            Book: obj => {
                return obj.id_book != null ? BooksCollection.findOne({_id: obj.id_book}).title : ""
            },
            Numbers: "numbers_of_orders",
        }}/>,
        customers:<Table collection={CustomersCollection} setQuery={Customers_setQuery} form={CustomersForm} data={Customers} setForm={setForm} columns={{
            CompanyName: "customer_name",
            Address: "address",
            Phone: "phone",
            CustomerName: "full_name_customer"
        }}/>
    }

    if(Meteor.user().username === "admin"){
        tabs.users = <Table data={users} setForm={setForm} columns={{
            username: "username",
        }} form={UserForm} collection={Meteor.users} setQuery={users_setQuery}/>
    }

    const [active, setActive] = React.useState("writers");

    return <div className="divStyle">
        <div style={{
            display: "flex",
            flexDirection: "row"
        }}>
            <div style={{width: '50%'}}>
                <div style={{display: "flex",}}>
                    {Object.keys(tabs).map(key => <button className="button" onClick={() => setActive(key)}>{key}</button>)}
                </div>
                {tabs[active]}
            </div>
            <div style={{width: '50%'}}>
                {form}
            </div>
        </div>
    </div>
}