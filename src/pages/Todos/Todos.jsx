import {useSelector} from 'react-redux';
import style from './Todos.module.scss'
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Todos = () => {
    const todos = useSelector(state => state.main.todos)
    const navigate = useNavigate()
    const [sortTodos, setSortTodos] = useState(todos)
    useEffect(() => {
        setSortTodos(todos)
    }, [todos])

    const sort = (value) => {
        switch (value) {
            case 'true': {
                setSortTodos(todos.filter(t => t.completed === true))
            }
                break
            case 'false': {
                setSortTodos(todos.filter(t => t.completed === false))
            }
                break
            default: {
                setSortTodos(todos)
            }
        }
    }
    return (
        <div className={style.todos}>
            <button onClick={() => navigate('/users')}>Назад</button>
            <select className={style.todos__select} onChange={(e) => sort(e.target.value)}>
                <option value=''>Все</option>
                <option value={true}>Завершенные</option>
                <option value={false}>Не завершенные</option>
            </select>
            <table>
                {
                    sortTodos.map(t => <tr>
                        {
                            t.completed
                                ? <td className={style.todos__completed}>Завершено</td>
                                : <td className={style.todos__notcompleted}>Не завершено</td>
                        }
                        <td>{t.title}</td>
                    </tr>)
                }
            </table>
        </div>
    )
}
export default Todos