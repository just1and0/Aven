import React from 'react';
import { Text, View } from 'react-native';
import uuid from 'uuid/v4';

import useCloud from '../cloud-core/useCloud';
import useCloudValue from '../cloud-core/useCloudValue';

import Screen from './components/Screen';
import TextInput from './components/TextInput';
import TaskRow from './components/TaskRow';

function InputTodo() {
  const [draftTitle, setDraftTitle] = React.useState('');
  const cloud = useCloud();
  const todoDoc = cloud.get('Todos');
  const currentTodosValue = useCloudValue(todoDoc);
  const lastTasks = (currentTodosValue && currentTodosValue.tasks) || [];
  return (
    <TextInput
      value={draftTitle}
      onChangeText={setDraftTitle}
      placeholder="Add new task.."
      onSubmitEditing={() => {
        todoDoc.put({
          tasks: [
            ...lastTasks,
            { title: draftTitle, id: uuid(), isComplete: false },
          ],
        });
        setDraftTitle('');
      }}
    />
  );
}

function TodoList() {
  const todos = useCloudValue('Todos');
  console.log('valueeeee', todos);
  if (todos === undefined) {
    return <Text>Loading..</Text>;
  }
  console.log('rendering list with todos:', todos);
  if (!todos || !todos.tasks) {
    return null;
  }
  return todos.tasks.map(task => <TaskRow key={task.id} task={task} />);
}

function Title({ children }) {
  return (
    <Text style={{ margin: 30, fontSize: 72, color: '#789' }}>{children}</Text>
  );
}

export default function Home() {
  return (
    <Screen>
      <Title>Simple Todos</Title>
      <TodoList />
      <InputTodo />
    </Screen>
  );
}
