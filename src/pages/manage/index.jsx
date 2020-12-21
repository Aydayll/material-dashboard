import React from 'react';
import Plus from '../../assets/plus.svg'
import './style.scss';
import Item from './items';
import { BtnGoBack } from '../../components/btns/index';
import axios from 'axios';

const Manage = () => {
    const [usersData, setUsersData] = React.useState([]);
    const [newUser, setNewUser] = React.useState({
        id: '',
        avatar: '',
        fullName: '',
        userID: '',
        email: '',
        phone: '',
        dateOfRegistry: '',
    });
    const [activeModal, setActiveModal] = React.useState(false);

    const modaRef = React.useRef();
    const modalWrapperRef = React.useRef();

    const handleClick = (event) => {
        if (!event.path.includes(modaRef.current)) {
            setActiveModal(false);
        }
    };
    const saveData = (event) => {
        setNewUser({
            id: '',
            avatar: event.target.form[1].value,
            fullName: event.target.form[0].value,
            userID: event.target.form[2].value,
            email: event.target.form[4].value,
            phone: event.target.form[3].value,
            dateOfRegistry: '',
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        setUsersData([...usersData, newUser]);
        setNewUser({
            id: '',
            avatar: '',
            fullName: '',
            userID: '',
            email: '',
            phone: '',
            dateOfRegistry: '',
        });
    };


    React.useEffect(async () => {
        await axios
            .get(`http://localhost:3000/database.json`)
            .then((response) => response)
            .then(({ data }) => setUsersData(data.users));
    }, []);
    React.useEffect(() => {
        if (modalWrapperRef.current) {
            modalWrapperRef.current.addEventListener('click', handleClickOutside);
        }
    }, [activeModal]);

    const handleClick = () => {
        setActiveModal(true);
    };
    return (
        <section className="manage">
            {activeModal && (
                <div className="modal__wrapper">
                    <div className="modal">
                        <div className="col-6 modal__left">
                            <div onClick={() => setActiveModal(false)}>
                                <BtnGoBack />
                            </div>
                            <h3 className="modal__title">Create a new user</h3>
                            <h6 className="modal__suptitle">Add main information about user</h6>
                            <form className="modal__form" onSubmit={(event) => handleSubmit(event)}>
                                <label className='modal__label' htmlFor=''>
                                    <input required onChange={(event) => saveData(event)} value={newUser.fullName} type='text' placeholder='Введите Имя Пользователя' />
                                    <p>Имя пользователя</p>
                                </label>
                                <label className='modal__label' htmlFor=''>
                                    <input required onChange={(event) => saveData(event)} value={newUser.avatar} type='text' placeholder='Введите путь к картинке' />
                                    <p>Картинка</p>
                                </label>
                                <label className='modal__label' htmlFor=''>
                                    <input required onChange={(event) => saveData(event)} value={newUser.userID} type='text' placeholder='Введите ID' />
                                    <p>ID</p>
                                </label>
                                <label className='modal__label' htmlFor=''>
                                    <input required onChange={(event) => saveData(event)} value={newUser.phone} type='text' placeholder='Введите номер телефона' />
                                    <p>Номер телефона</p>
                                </label>
                                <label className='modal__label' htmlFor=''>
                                    <input onChange={(event) => saveData(event)} value={newUser.email} type='text' placeholder='Введите почту пользователя' />
                                    <p>Почта пользователя</p>
                                </label>
                                <button className="btn-blue form__btn ">ADD NEW USER</button>
                            </form>
                        </div>
                        <div className="col-6 text-right">
                            Here is image
                    </div>
                    </div>
                </div>
            )}
            <div className="manage__top">
                <div className="row">
                    <div className="manage__filter">FILTER</div>
                    <label className="manage__search">
                        <input type="text" placeholder='Search users by name, id' />
                    </label>
                </div>
                <button onClick={handleClick} className="manage__add-user">
                    <img src={Plus} alt="plus" />
                    ADD USER
                </button>
            </div>
            <table className="manage__users">
                <tr className="manage__row">
                    <th className="col-2 manage__headers">Selected 2 users</th>
                    <th className="col-2 manage__headers">User ID</th>
                    <th className="col-2 manage__headers">Phone Number</th>
                    <th className="col-2 manage__headers">Email Address</th>
                    <th className="col-2 manage__headers">Account Created</th>
                </tr>
                <Item users={usersData} />

            </table>
        </section>
    );
};
export default Manage;