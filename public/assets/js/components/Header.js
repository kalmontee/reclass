$(document).ready(function () {
  class Header extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.innerHTML = `
      <header>
        <div class="header-container">
          <div id="logo">
            <i class="fas fa-atom"></i>
            <span>Dev Seek</span>
          </div>
  
          <div class="movil-bar">
            <i class="fas fa-bars"></i>
          </div>
  
         <nav id="links">
            <a href="/">Search Jobs</a>
            <a href="/employer">Employer Post Job</a>
            <a href="/recentjobs">Recent Jobs Added</a>
         </nav>
        </div>
      </header>
        `;
    }
  }

  customElements.define("header-component", Header);
});
