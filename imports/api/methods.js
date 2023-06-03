import { Meteor } from 'meteor/meteor';

import {BooksCollection} from "./books";
import {OrdersCollection} from "./orders";
import {CustomersCollection} from "./customers";
import {ContractsCollection} from "./contracts";

Meteor.methods({
    'PreWritersRemove'(writer) {
        console.log({Writers: writer._id});
        BooksCollection.update({}, {$pull: {id_writers: writer._id}}, {multi: true});
        ContractsCollection.remove({id_writer: writer._id},{multi: true});
    },
    'PreBooksRemove'(book){
        console.log({Books: book._id});
        OrdersCollection.remove({id_book: book._id},{multi: true});
    },
    'PreOrderRemove'(order){
      console.log({Order: order._id});
      CustomersCollection.remove({id_customer: order._id}, {multi: true});
    },
    'ChangePassword'(user, password){
        Accounts.setPassword(user,password);
    },
    'CreateUser'(username,password){
        if(Accounts.findUserByUsername(username)){
            return "Такой пользователь уже существует!";
        }else {
            Accounts.createUser({
                username: username,
                password: password
            });
            return "Пользователь успешно создан!";
        }
    }
});