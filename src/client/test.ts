import { startReloader } from './dev-reload';
import './test.css';
import './utils/testing/testing.css';
import { createRef } from './utils/testing/ui/elements';
import { Renderer } from './utils/testing/ui/renderer';

startReloader({ isTest: true });

const throwError = (error: unknown) => { throw error };

const root = document.getElementById('root') ?? throwError(new Error('Can\'t find element #root'));

const renderer = new Renderer(root);

export interface MyButtonProps {
  title: string;
  color: string;
}

function MyButton(props: MyButtonProps) {
  const divRef = createRef<HTMLDivElement>(null);

  let valor = 0;

  function handleClick(ev: MouseEvent) {
    valor++;

    const element = divRef.current;
    
    if (element) {
      element.textContent = `${props.title} ${valor}`;
    }
  }

  return Renderer.createElement('div', {
    className: 'my-button',
    ref: divRef,
    style: {
      backgroundColor: props.color,
      margin: '5px'
    },
    children: props.title,
    onClick: handleClick,
  });
}

interface MyComponentProps {
  title: string
}

function MyComponent(props: MyComponentProps) {
  return Renderer.createElement('div', {
    className: 'test-body',
    style: {
      backgroundColor: '#333',
      padding: '10px',
      borderRadius: '10px',
      color: '#fff',
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    children: Array(20).fill(0).map((v, i) => [
      Renderer.createElement(MyButton, {
        color: '#f00',
        title: props.title + ' ' + i,
      })
    ]).flat(),
  })
}

let init = Date.now();

const element = Renderer.createElement(MyComponent, { title: 'mundo' });

renderer.render(element);

let finish = Date.now();

console.log(`terminou em ${finish - init}`);