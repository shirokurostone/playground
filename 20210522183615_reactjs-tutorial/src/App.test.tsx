import { render } from '@testing-library/react';
import { Square } from './App';

test('renders Square', ()=>{
    const {container} = render(<Square value="X" onClick={()=>{}} highlight={false}/>);
    let elem = container.querySelector('button');
    expect(elem.firstChild.textContent).toBe("X");
    expect(elem.getAttribute('class')).toBe("square");
});