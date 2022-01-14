import { connect } from 'react-redux';
import todosActions from '../../redux/contacts/contacts-actions';
import PropTypes from 'prop-types';
import s from './ContactList.module.css';
import Icon from '../Icon/Icon';
import contactsActions from '../../redux/contacts/contacts-actions';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={s.list}>
      <p className={s.total}>Total amount of contacts: {contacts.length}</p>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={s.item}>
          <p className={s.text}>
            <Icon
              iconName="iconAddressBook"
              width="18"
              height="18"
              className={s.iconAddressBook}
            />
            {name}: {number}
          </p>
          <button onClick={() => onDeleteContact(id)} className={s.button}>
            Delete
            <Icon
              iconName="iconBin"
              width="18"
              height="18"
              className={s.iconBin}
            />
          </button>
        </li>
      ))}
    </ul>
  );
};

const getVisibleContacts = (allContacts, filter) => {
  const normalizedFilter = filter.toLowerCase();
  return allContacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter),
  );
};

const mapStateToProps = ({ contacts: { items, filter } }) => ({
  contacts: getVisibleContacts(items, filter),
});

const mapDispatchToProps = dispatch => ({
  onDeleteContact: id => dispatch(contactsActions.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
