import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

/**
 * Retrieves a DebugElement by CSS class name.
 * Uses Angular's debugElement and By.css() for platform-agnostic testing.
 *
 * @template T - The component type
 * @param fixture - The component fixture to query
 * @param className - The CSS class name to search for (without the leading dot)
 * @returns The DebugElement matching the class, or null if not found
 *
 * @example
 * const logo = getElementByClass(fixture, 'logo');
 * expect(logo).toBeTruthy();
 */
export function getElementByClass<T>(fixture: ComponentFixture<T>, className: string) {
  return fixture.debugElement.query(By.css(`.${className}`));
}

/**
 * Retrieves the text content from an element by CSS class name.
 *
 * @template T - The component type
 * @param fixture - The component fixture to query
 * @param className - The CSS class name to search for (without the leading dot)
 * @returns The text content of the element, or undefined if not found
 *
 * @example
 * const text = getTextContentFromElementByClass(fixture, 'logo');
 * expect(text?.trim()).toBe('GUEST');
 */
export function getTextContentFromElementByClass<T>(fixture: ComponentFixture<T>, className: string): string {
  return fixture.debugElement.query(By.css(`.${className}`))?.nativeElement.textContent;
}

/**
 * Counts the number of elements matching a CSS class name.
 *
 * @template T - The component type
 * @param fixture - The component fixture to query
 * @param className - The CSS class name to search for (without the leading dot)
 * @returns The count of matching elements
 *
 * @example
 * const count = getNumberOfElementsByClass(fixture, 'nav-item');
 * expect(count).toBe(4);
 */
export function getNumberOfElementsByClass<T>(fixture: ComponentFixture<T>, className: string): number {
  return fixture.debugElement.queryAll(By.css(`.${className}`)).length;
}

/**
 * Simulates a click event on an element by CSS class name.
 *
 * @template T - The component type
 * @param fixture - The component fixture to query
 * @param className - The CSS class name of the element to click (without the leading dot)
 *
 * @example
 * clickElementByClass(fixture, 'submit-button');
 * await fixture.whenStable();
 */
export function clickElementByClass<T>(fixture: ComponentFixture<T>, className: string): void {
  const element = fixture.debugElement.query(By.css(`.${className}`));
  element?.nativeElement.click();
}

/**
 * Sets the value of an input element and dispatches an input event.
 * Useful for testing form inputs and ensuring change detection is triggered.
 *
 * @template T - The component type
 * @param fixture - The component fixture to query
 * @param className - The CSS class name of the input element (without the leading dot)
 * @param value - The value to set on the input element
 *
 * @example
 * setInputElementValueByClass(fixture, 'firstname-input', 'John');
 * fixture.detectChanges();
 */
export function setInputElementValueByClass<T>(fixture: ComponentFixture<T>, className: string, value: string): void {
  const inputElement = fixture.debugElement.query(By.css(`.${className}`));
  if (inputElement) {
    inputElement.nativeElement.value = value;
    inputElement.nativeElement.dispatchEvent(new Event('input'));
  }
}
