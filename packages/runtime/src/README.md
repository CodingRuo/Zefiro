# Zefiro Frontend Framework

Zefiro ist ein leichtgewichtiges Frontend Framework für moderne Webanwendungen. Es bietet einen komponenten-basierten Ansatz mit Virtual DOM und reaktiver Zustandsverwaltung.

## Features

- 🚀 Komponenten-basierte Architektur
- 🔄 Virtual DOM für effiziente Updates
- 💡 Reaktive Zustandsverwaltung
- 📦 Leichtgewichtig und performant
- 🎯 Event-Handling-System
- 🧩 Fragment-Support
- 🔍 Tiefes Vergleichen von Props

## Installation

```bash
npm install zefiro
```

## Grundlegende Verwendung

### Eine einfache Komponente erstellen

```javascript
import { defineComponent, h } from 'zefiro'

const Counter = defineComponent({
  // Initialer State
  state: () => ({
    count: 0
  }),
  
  // Methoden
  increment() {
    this.updateState({ count: this.state.count + 1 })
  },
  
  // Render Funktion
  render() {
    return h('div', {}, [
      h('p', {}, [`Aktueller Zähler: ${this.state.count}`]),
      h('button', { 
        on: { 
          click: () => this.increment() 
        }
      }, ['Erhöhen'])
    ])
  }
})
```

### Eine Anwendung starten

```javascript
import { createApp } from 'zefiro'

const app = createApp(Counter)
app.mount(document.getElementById('app'))
```

### Komponenten mit Props

```javascript
const Greeting = defineComponent({
  render() {
    return h('h1', {}, [`Hallo ${this.props.name}!`])
  }
})

// Verwendung
const App = defineComponent({
  render() {
    return h(Greeting, { name: 'Max' })
  }
})
```

### Lifecycle Hooks

```javascript
const MyComponent = defineComponent({
  state: () => ({
    data: null
  }),
  
  // Wird nach dem Mounten aufgerufen
  async onMounted() {
    const response = await fetch('https://api.example.com/data')
    const data = await response.json()
    this.updateState({ data })
  },
  
  // Wird vor dem Unmounten aufgerufen
  onUnMounted() {
    console.log('Komponente wird entfernt')
  },
  
  render() {
    if (!this.state.data) {
      return h('div', {}, ['Lädt...'])
    }
    return h('div', {}, [this.state.data.title])
  }
})
```

### Event Handling

```javascript
const Form = defineComponent({
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.emit('formSubmit', { data: this.state.formData })
    }
  },
  
  render() {
    return h('form', {
      on: {
        submit: (e) => this.handleSubmit(e)
      }
    }, [
      // Formular Elemente
    ])
  }
})

// Parent Komponente
const App = defineComponent({
  render() {
    return h(Form, {
      on: {
        formSubmit: (data) => console.log('Formulardaten:', data)
      }
    })
  }
})
```

### Fragments

```javascript
import { h, hFragment } from 'zefiro'

const List = defineComponent({
  render() {
    return hFragment([
      h('li', {}, ['Eintrag 1']),
      h('li', {}, ['Eintrag 2']),
      h('li', {}, ['Eintrag 3'])
    ])
  }
})
```

## Fortgeschrittene Konzepte

### Verschachtelte Komponenten

```javascript
const TodoItem = defineComponent({
  render() {
    const { title, completed } = this.props
    return h('li', {
      class: completed ? 'completed' : ''
    }, [title])
  }
})

const TodoList = defineComponent({
  state: () => ({
    todos: [
      { id: 1, title: 'Zefiro lernen', completed: false },
      { id: 2, title: 'README schreiben', completed: true }
    ]
  }),
  
  render() {
    return h('ul', {}, [
      ...this.state.todos.map(todo =>
        h(TodoItem, {
          key: todo.id,
          title: todo.title,
          completed: todo.completed
        })
      )
    ])
  }
})
```

### Styling

```javascript
const StyledComponent = defineComponent({
  render() {
    return h('div', {
      style: {
        backgroundColor: '#f0f0f0',
        padding: '20px',
        borderRadius: '8px'
      },
      class: ['card', 'shadow']
    }, [
      'Styled Content'
    ])
  }
})
```

## Best Practices

1. **Komponenten klein halten**: Erstelle wiederverwendbare, fokussierte Komponenten

2. **Props validieren**: Überprüfe Props-Typen und setze Standardwerte

3. **State Management**: Halte den State so lokal wie möglich

4. **Keys verwenden**: Nutze eindeutige Keys bei Listen-Rendering

5. **Event Handling**: Nutze die eingebauten Event-Handler für bessere Performance

## Browser-Unterstützung

Zefiro unterstützt alle modernen Browser:

- Chrome
- Firefox
- Safari
- Edge

## Lizenz

MIT