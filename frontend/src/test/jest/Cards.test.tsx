import {render, screen } from '@testing-library/react';
import Cards from "../../components/Cards"

const validCardsData = [
    {
        name: "Joao Vitor",
        age: 19,
        occupation: "Node.js Developer"
    },
    {
        name: "Marcos Aurelio",
        age: 32,
        occupation: "Doctor"
    },
    {
        name: "Gabriel Pereira",
        age: 15,
        occupation: "Student"
    },
]

describe('cards component tests', () => {
    it('should renders cards correctly', () => {
        render(<Cards data={validCardsData}/>);
      
        expect(screen.getAllByText(/name/i)).toHaveLength(3);
    });
})