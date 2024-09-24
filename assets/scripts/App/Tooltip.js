
import { Component } from "./Component.js";

export class Tooltip extends Component {
    constructor(closeNotifierFunction, text, hostElementId) {
      super(hostElementId);
      this.closeNotifier = closeNotifierFunction;
      this.text = text;
      this.create();
    }
    closeTooltip() {
      this.detach();
      this.closeNotifier();
    }
  
    create() {
      console.log("The Tooltip....");
      const tooltipElement = document.createElement("div");
      tooltipElement.className = "card";
      const tooltipTemplate = document.getElementById("tooltip");
      const tooltipBody = document.importNode(tooltipTemplate.content, true);
      tooltipBody.querySelector("p").textContent = this.text;
      tooltipElement.append(tooltipBody);
      // tooltipElement.textContent=this.text;
      console.log(this.hostElement.getBoundingClientRect());
  
      const hostElposLeft = this.hostElement.offsetLeft;
      const hostElposTop = this.hostElement.offsetTop;
      const hostElHeight = this.hostElement.clientHeight;
      const parentElementScrolling = this.hostElement.parentElement.scrollTop; //the entire ul
  
      const x = hostElposLeft + 20;
      const y = hostElposTop + hostElHeight - parentElementScrolling - 10;
  
      tooltipElement.style.position = "absolute";
      tooltipElement.style.left = x + "px";
      tooltipElement.style.top = y + "px";
  
      tooltipElement.addEventListener("click", this.closeTooltip.bind(this));
      this.element = tooltipElement;
    }
  }