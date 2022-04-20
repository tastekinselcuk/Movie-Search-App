const headerTemplate = document.createElement("template");
headerTemplate.innerHTML= `
<style>
header {
    height: 75px;
    background-color: #c00000;
    width: 100%;
    color: #fff;
    font-size: 23px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
</style>

<header>
JavaScript Web Components | Movie Search App
</header>
`;

class AppHeader extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(headerTemplate.content.cloneNode(true));
    }
}

window.customElements.define("app-header",AppHeader);


//@import url('http://${location.host}/components/appHeader/appHeader.css')
