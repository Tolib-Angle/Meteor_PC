import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';
import {WritersCollection} from "../imports/api/writers";
import {ContractsCollection} from "../imports/api/contracts"
import {CustomersCollection} from "../imports/api/customers";
import {BooksCollection} from "../imports/api/books";
import {OrdersCollection} from "../imports/api/orders";
import "../imports/api/methods";


const SEED_USERNAME = 'admin';
const SEED_PASSWORD = 'admin';

Meteor.startup(async () => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
});
