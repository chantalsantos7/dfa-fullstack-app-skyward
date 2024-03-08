import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../src/components/Header";

describe('Header tests', () => { 
    const mockSavedLocations = ['Dublin'];
    const mockClickHandler = vi.fn();

    it("should show the Locations dropdown if there are saved locations in local storage", () => {
        render(<Header savedLocations={mockSavedLocations} handleLocationLinkClick={mockClickHandler} />, {wrapper: MemoryRouter});

        const savedLocations = screen.getByText(`My Saved Locations`);
        expect(savedLocations).toBeInTheDocument();
    })

    it("should show the saved locations when the dropdown is clicked", async () => {
        render(<Header savedLocations={mockSavedLocations} handleLocationLinkClick={mockClickHandler} />, {wrapper: MemoryRouter});
        const dropdownLink = screen.getByText("My Saved Locations");
        fireEvent.click(dropdownLink);
        expect(screen.getByText('Dublin')).toBeInTheDocument();
    })
 })

