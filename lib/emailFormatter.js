const mjml2html = require('mjml')
const Handlebars = require('handlebars')

const htmlOutput = mjml2html(`
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


let resetPasswordMail = Handlebars.compile(htmlOutput.html);

module.exports = {
    resetPasswordMail
}

