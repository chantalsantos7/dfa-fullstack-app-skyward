import { assert, expect } from "vitest";
import { formatDate, formatTemperature } from "../src/utils/formatting";

describe('formatDate tests', () => { 
    it('should return a string in the format "Day, Month, Year"', () => { 
        const testDate = new Date("06/03/2024").toUTCString();
        expect(formatDate(testDate)).toBe("03, June, 2024");
     })
 })

 describe('formatTemperature tests', () => { 
    it("should return a temperature in Celsius format", () => {
        const testTemp = 280; //K
        const expectedTemp = 7//C
        
        expect(formatTemperature(testTemp)).toBe(expectedTemp);
    })
  })