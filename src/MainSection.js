import React, { useState } from "react";
import PropTypes from "prop-types";
import Footer from "./Footer";
import TodoList from "./TodoList";
import { SL, SD, SE } from "./TodoFilters";

const MainSection = ({
  todos,
  deleteTodo,
  editTodo,
  toggleTodo,
  toggleAllTodo,
  clearCompleted
}) => {
  const [visibilityFilter, setFilter] = useState(SL);

  const todosCount = todos.length;
  const completedCount = todos.filter(({ completed }) => completed).length;
  let visibleTodos;
  switch (visibilityFilter) {
    case SL:
      visibleTodos = todos;
      break;
    case SD:
      visibleTodos = todos.filter(t => t.completed);
      break;
    case SE:
      visibleTodos = todos.filter(t => !t.completed);
      break;
    default:
      throw new Error("Unknown filter: " + visibilityFilter);
  }

  return (
    <section className="main">
      {!!todosCount && (
        <span>
          <input
            className="toggle-all"
            type="checkbox"
            checked={completedCount === todosCount}
            readOnly
          />
          <label onClick={toggleAllTodo} />
        </span>
      )}
       <ul className="todo-list">
        {todos.map(todo => (
          <TodoItem
            todo={todo}
            editTodo={editTodo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
      {!!todosCount && (
         <footer className="footer">
            <span className="todo-count">
              <strong>{activeCount || "No"}</strong> {itemWord} left
            </span>
            <ul className="filters">
              {Object.keys(FILTER_TITLES).map(filter => (
                <li>
                  <a
                    className={classnames({ selected: filter === visibilityFilter })}
                    style={{ cursor: "pointer" }}
                    onClick={() => setFilter(filter)}
                  >
                    {FILTER_TITLES[filter]}
                  </a>
                </li>
              ))}
            </ul>
            {!!completedCount && (
              <button className="clear-completed" onClick={clearCompleted}>
                Clear completed
              </button>
            )}
          </footer>
      )}
    </section>
  );
};

MainSection.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  toggleAllTodo: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired
};

export default MainSection;
