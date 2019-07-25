import joi from '@hapi/joi';

import Contact from '../models/contact';
import { Contact as IContact } from '../typings/contact';

//all these guys are more like helper functions right?
//gets all contacts...
export async function allContacts() {
  //this dude calls a function too from a different place
  //the find() appears to be a mongoose method...but i see no mongoose
  return Contact.find();
}

//
export async function findContactByID(id: string) {
  //calls a find by id...one thing common to these guys is that they have a contact
  //does contact remind me of something? mongoose model?
  return Contact.findById(id);
}

export async function findContact(query: string) {
  return Contact.find({
    $or: [
      { workEmail: query },
      { personalEmail: query },
      { workPhone: query },
      { phone: query },
    ],
  });
}

const contactSchema = {
  firstName: joi.string().allow(''),
  lastName: joi.string().allow(''),
  workEmail: joi
    .string()
    .email()
    .allow(''),
  personalEmail: joi
    .string()
    .email()
    .allow(''),
  workPhone: joi
    .string()
    .regex(/^\+\d{13}$/)
    .allow(''),
  homePhone: joi
    .string()
    .regex(/^\+\d{13}$/)
    .allow(''),
  phone: joi
    .string()
    .regex(/^\+\d{13}$/)
    .allow(''),
  company: joi.string().allow(''),
  website: joi.string().allow(''),
  address: joi.string().allow(''),
  notes: joi.string().allow(''),
  photo: joi.string().allow(''),
  birthday: joi.date().allow(''),
};

export async function createContact(contactBody: IContact) {
  const { error, value } = joi.validate(contactBody, contactSchema, {
    skipFunctions: true,
    stripUnknown: true,
    abortEarly: false,
  });

  if (error) {
    console.log(error);
    throw new Error('ContactBody is not valid');
  }

  const contact = new Contact(value);

  return contact.save();
}
