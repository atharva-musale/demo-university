import { DebugElement } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

/**
 * Retrieves a DebugElement by CSS class name.
 * Uses Angular's debugElement and By.css() for platform-agnostic testing.
 *
 * @template T - The component type
 * @param fixture - The component fixture to query
 * @param selector - The CSS selector to search for
 * @returns The DebugElement matching the selector, or null if not found
 *
 * @example
 * const logo = getElementBySelector(fixture, 'logo');
 * expect(logo).toBeTruthy();
 */
export function getElementBySelector<T>(fixture: ComponentFixture<T>, selector: string): DebugElement | null {
  return fixture.debugElement.query(By.css(`${selector}`));
}

/**
 * Retrieves the text content from an element by CSS class name.
 *
 * @template T - The component type
 * @param fixture - The component fixture to query
 * @param selector - The CSS selector to search for
 * @returns The text content of the element, or undefined if not found
 *
 * @example
 * const text = getTextContentFromElementBySelector(fixture, 'logo');
 * expect(text?.trim()).toBe('GUEST');
 */
export function getTextContentFromElementBySelector<T>(fixture: ComponentFixture<T>, selector: string): string {
  return fixture.debugElement.query(By.css(`${selector}`))?.nativeElement.textContent;
}

/**
 * Counts the number of elements matching a CSS class name.
 *
 * @template T - The component type
 * @param fixture - The component fixture to query
 * @param selector - The CSS selector to search for
 * @returns The count of matching elements
 */
export function getNumberOfElementsBySelector<T>(fixture: ComponentFixture<T>, selector: string): number {
  return fixture.debugElement.queryAll(By.css(`${selector}`)).length;
}

/**
 * Simulates a click event on an element by CSS class name.
 *
 * @template T - The component type
 * @param fixture - The component fixture to query
 * @param selector - The CSS selector of the element to click
 */
export function clickElementBySelector<T>(fixture: ComponentFixture<T>, selector: string) {
  const element = fixture.debugElement.query(By.css(`${selector}`));
  element?.nativeElement.click();
}

/**
 * Sets the value of an input element and dispatches an input event.
 * Useful for testing form inputs and ensuring change detection is triggered.
 *
 * @template T - The component type
 * @param fixture - The component fixture to query
 * @param selector - The CSS selector of the input element
 * @param value - The value to set on the input element
 */
export function setInputElementValueBySelector<T>(fixture: ComponentFixture<T>, selector: string, value: string) {
  const inputElement = fixture.debugElement.query(By.css(`${selector}`));
  if (inputElement) {
    inputElement.nativeElement.value = value;
    inputElement.nativeElement.dispatchEvent(new Event('input'));
  }
}
