import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getTodos, getUsers} from '../../redux/main-reducer';
import {useNavigate} from 'react-router-dom';
import style from './Users.module.scss'

const Users = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const users = useSelector(state => state.main.users)

    const [sortUsers, setSortUsers] = useState(users)
    const [phone, setPhone] = useState('')
    const [company, setCompany] = useState('')

    useEffect(() => {
        dispatch(getUsers('users'))
    }, [])
    useEffect(() => {
        setSortUsers(users)
    }, [users])
    useEffect(() => {
        if (phone === '' && company === '') {
            setSortUsers(users)
        }
    }, [phone, company])

    const setTodos = (id) => {
        dispatch(getTodos(id))
        navigate(`/todos/${id}`)
    }
    const phoneFilter = (phone) => {
        setSortUsers(users.filter(item => item.phone.replace(/\s/g, '').includes(phone.replace(/\s/g, ''))));
    }
    const companyFilter = (company) => {
        setSortUsers(users.filter(item => item.company.name.toLowerCase().includes(company.toLowerCase())));
    }
    return (
        <div className={style.users}>
            <h1>UsersList</h1>
            <div className={style.users__input}>
                <label htmlFor='phone'>Поиск по номеру телефона</label>
                <input type='text'
                       id='phone'
                       onChange={(e) => {
                           setPhone(e.target.value)
                       }}
                       value={phone}
                       onKeyUp={(e) => {
                           if (e.code === 'Enter' && phone !== '') {
                               phoneFilter(phone)
                           }
                       }}
                />
                <button
                    onClick={() => {phoneFilter(phone)}}
                    disabled={phone === ''}>
                    Найти
                </button>
            </div>
            <div className={style.users__input}>
                <label htmlFor='phone'>Поиск по компании</label>
                <input type='text'
                       id='phone'
                       onChange={(e) => {
                           setCompany(e.target.value)
                       }}
                       value={company}
                       onKeyUp={(e) => {
                           if (e.code === 'Enter' && company !== '') {
                               companyFilter(company)
                           }
                       }}
                />
                <button
                    onClick={() => {companyFilter(company)}}
                    disabled={company === ''}>
                    Найти
                </button>
            </div>
            {
                sortUsers.join('') === ''
                    ? <h1> Ничего не найдено</h1>
                    : <table>
                        <thead>
                        <tr>
                            <th>Имя</th>
                            <th>Email</th>
                            <th>Адрес</th>
                            <th>Номер телефона</th>
                            <th>Сайт</th>
                            <th>Компания</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            sortUsers.map(u =>
                                <tr key={u.id}
                                    className={style.users__tableItem}
                                    onDoubleClick={() => {
                                        setTodos(u.id)
                                    }}>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.address.zipcode}, {u.address.suite}, {u.address.street}, {u.address.geo.lat}, {u.address.geo.lng}, {u.address.city}</td>
                                    <td>{u.phone}</td>
                                    <td>{u.website}</td>
                                    <td>{u.company.name}</td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
            }
        </div>
    )
}
export default Users