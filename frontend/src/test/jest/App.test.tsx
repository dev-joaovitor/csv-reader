import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom";
import App from "../../App.tsx"

describe('app component tests', () => {
    it('should begin without any data', () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );
      
        expect(screen.getByText(/no data to be showed/i)).toBeInTheDocument();
    });
})