$(document).ready(function () {
  class Footer extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.innerHTML = `
        <footer>
        <div class="logo-footer">
           <i class="fas fa-atom"></i>
           <span>Dev Seek</span>
        </div>
        <div>
           <div class="footer-info container">
              <div class="resources">
                 <h6>CONTACT</h6>
                 <div class="resources-info">
                    <h5><a href="#">Contact Us</a></h5>
                    <h5><a href="#">Help Center</a></h5>
                 </div>
              </div>
              <div class="resources">
                 <h6>ABOUT</h6>
                 <div class="resources-info">
                    <h5><a href="#">Salary</a></h5>
                    <h5><a href="#">Jobs</a></h5>
                    <h5><a href="#">Community</a></h5>
                 </div>
              </div>
              <div class="resources">
                 <h6>PLATFORM</h6>
                 <ul class="social-links">
                    <li><a href="https://facebook.com/" target="_blank"><i class="fab fa-facebook-square"></i></a>
                    </li>
                    <li><a href="https://instagram.com/" target="_blank"><i class="fab fa-instagram"></i></a></li>
                    <li><a href="https://twitter.com/" target="_blank"><i class="fab fa-twitter"></i></a></li>
                 </ul>
              </div>
              <div class="resources">
                 <h6>RESOURCES</h6>
                 <div class="resources-info">
                    <h5><a href="#">Blog</a></h5>
                    <h5><a href="#">Services</a></h5>
                 </div>
              </div>
           </div>
           <div class="footer-end container">
              <p>&copy 2020 Dev Seek Inc. All rights reserved.</p>
           </div>
        </div>
     </footer>
          `;
    }
  }

  customElements.define("footer-component", Footer);
});
