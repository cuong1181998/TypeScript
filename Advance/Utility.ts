// 1. Partial<Type>
interface Todo {
  title: string;
  description: string;
}

function updateTodo (todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}


const todo1 = {
  title: "organize desk",
  description: "clear clutter"
};

const todo2 = updateTodo(todo1, {
  description: "throw out trash"
});

// 2. Readonly<Type>
interface Todo1 {
  title: string;
}

const todo: Readonly<Todo1> = {
  title: "abc"
}; // -> function freeze<Type>(obj: Type): Readonly<Type>;

// 3. Record<Keys,Type>