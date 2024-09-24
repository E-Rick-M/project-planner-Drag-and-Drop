

export class DOMHelper {
    static clearEventListeners(element) {
      const clonedElement = element.cloneNode(true);
      element.replaceWith(clonedElement);
      return clonedElement;
    }
    static moveElement(ElementId, newDestinationSelector) {
      const element = document.getElementById(ElementId);
      const destinationElement = document.querySelector(newDestinationSelector);
  
      destinationElement.append(element);
      element.scrollIntoView({ behavior: "smooth" });
    }
  }