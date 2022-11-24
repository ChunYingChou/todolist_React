import TodoItem from './TodoItem';

const TodoCollection = ({
  todos,
  onToggleDone,
  onSave,
  onDelete,
  onChangeMode,
}) => {
  return (
    <div>
      TodoCollection
      {todos.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleDone={(id) => onToggleDone?.(id)}
            onChangeMode={({ id, isEdit }) => onChangeMode?.({ id, isEdit })}
            onDelete={(id) => onDelete?.(id)}
            onSave={({ id, title }) => onSave?.({ id, title })}
          />
        );
      })}
    </div>
  );
};

export default TodoCollection;
