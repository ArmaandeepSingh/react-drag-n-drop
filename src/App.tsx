import React from 'react';
import './App.css';
import Skills from './Skills';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Skills />
    </DndProvider>
  );
}

export default App;