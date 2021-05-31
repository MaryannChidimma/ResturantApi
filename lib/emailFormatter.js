const mjml2html = require('mjml')
const Handlebars = require('handlebars')

const resetPassword = mjml2html(`
  <mjml>
  <mj-body>
    <mj-section>
      <mj-column>

        <mj-image width="300px"
        src="https://res.cloudinary.com/maryannokonkwo/image/upload/v1615451267/eva-kitchen/2021-03-11T08:27:43.630Z.jpg"></mj-image>


        <mj-text font-size="20px"
                 font-family="helvetica">Hello {{name}}</mj-text>
        
          <mj-text font-size="20px" font-family="helvetica">To reset your password click on the button bellow</mj-text>
        <mj-button href={{token}}>Reset Password</mj-button>
        

      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`, {})

const adminPassword = mjml2html(
  `<mjml>
 <mj-body>
    <mj-section>
      <mj-column>

       <mj-text font-size="30px">Admin Login Password</mj-text>
        <mj-image width="300px"
        src="https://res.cloudinary.com/maryannokonkwo/image/upload/v1622381557/eva-kitchen/2021-05-30T13:32:30.419Z.png"></mj-image>


        <mj-text font-size="20px"
                 font-family="helvetica">Hello {{name}}</mj-text>

          <mj-text font-size="20px" font-family="helvetica">Use the password below to login</mj-text>
          <mj-text font-size="20px" font-family="helvetica">Your password is {{password}}</mj-text>
        <mj-button font-size="16px" color="orange", href={{link}}>Login</mj-button>


      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`, {})

let resetPasswordMail = Handlebars.compile(resetPassword.html);
let adminLoginMail = Handlebars.compile(adminPassword.html);

module.exports = {
  resetPasswordMail,
  adminLoginMail,
}

