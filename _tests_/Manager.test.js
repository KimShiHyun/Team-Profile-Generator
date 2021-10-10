const Manager = require("../lib/Manager");
const Employee = require("../lib/Employee");

test("Set Office Number from constructor argument", () => {
  const testValue = 100;
  const e = new Manager("Andy", 1, "andy@kmail.com", testValue);
  expect(e.officeNumber).toBe(testValue);
});

test('getRole() should return "Manager"', () => {
  const testValue = "Manager";
  const e = new Manager("Andy", 1, "andy@kmail.com", 100);
  expect(e.getRole()).toBe(testValue);
});

test("Can get office number via getOffice()", () => {
  const testValue = 100;
  const e = new Manager("Andy", 1, "andy@kmail.com", testValue);
  expect(e.getOfficeNumber()).toBe(testValue);
});
