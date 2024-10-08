

import { ProjectItem } from "./ProjectItem.js";
import { DOMHelper } from "../Utility/DOMHelper.js";
export class ProjectList {
    //manages a box ,Multiple instances of List || The ul
    projects = [];
    constructor(type) {
      //type==Active or Finished Project
      this.type = type;
  
      const prjItems = document.querySelectorAll(`#${type}-projects li`);
      console.log(prjItems);
      for (const prjItem of prjItems) {
        this.projects.push(
          new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type)
        );
      }
      console.log(this.projects);
      this.connectDroppable();
    }
  
    connectDroppable() {
      const list = document.querySelector(`#${this.type}-projects ul`);
  
      list.addEventListener("dragenter", event => {
        if (event.dataTransfer.types[0] === 'text/plain') {
          list.parentElement.classList.add('droppable')
          event.preventDefault();
        }
       
      });
  
      list.addEventListener("dragover", event => {
        if (event.dataTransfer.types[0] === 'text/plain') {
          event.preventDefault();
        }
      });
  
      list.addEventListener('dragleave',event=>{
        if(event.relatedTarget.closest(`#${this.type}-projects ul`) !== list){
             list.parentElement.classList.remove('droppable')
        }
     
      });
  
      list.addEventListener('drop',event=>{
        const prjId=event.dataTransfer.getData('text/plain')
        if(this.projects.find(p=>p.id===prjId)){
          return;
        }
        document.getElementById(prjId).querySelector('button:last-of-type').click();
        list.parentElement.classList.remove('droppable')
        event.preventDefault()
      })
    }
  
    setSwitchHandlerFunction(switchHandlerFunction) {
      this.switchHandler = switchHandlerFunction;
    }
  
    addProject(project) {
      this.projects.push(project);
      console.log(this);
      DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
      project.update(this.switchProject.bind(this), this.type);
    }
  
    switchProject(projectId) {
      //switch to another project
      // const projectIndex=this.projects.findIndex(p=>p.id===projectId)
      // this.projects.splice(projectIndex,1)
      this.switchHandler(this.projects.find((p) => p.id === projectId));
      this.projects = this.projects.filter((p) => p.id !== projectId);
    }
  }
  