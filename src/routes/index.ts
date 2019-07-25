import { Router } from 'express';
import { allContacts, findContactByID } from '../controllers/contact';

const router = Router();

router.get('/contacts', async function(_req, res, _next) {
  console.log('llll');
  //this guy is calling a function...a helper function...
  const contacts = await allContacts();

  res.status(200).json({ contacts });
});

router.get('/contact/:contactID', (req, res) => {
  //deconstructs the req.params...grabs the id...
  const { contactID } = req.params;
  //calls a helper function too called ....these functions all return promises
  findContactByID(contactID)
    .then(contact => {
      if (contact) {
        res.status(200).json({ contact });

        return;
      }

      res.status(404).json({ error: 'Contact was not found' });
    })
    .catch(err => {
      res.status(404).json({ error: 'Contact was not found' });

      console.error(err);
    });
});

export default router;
