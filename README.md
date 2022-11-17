# DTSC request for comment

This project is a collection of pages with descriptions of Department of Toxic Substance Control projects with embedded forms for the public to comment.

Projects included:
- Former Ramona

## Development

To browse locally:

- npm install
- npm run dev
- Browse <a href="http://localhost:8080/former-ramona/">former ramona</a>

## Deployment

This project is deployed to the ODI AWS environment. It uses an S3 origin with a CloudFront CDT, domains managed by CDT and certificates validated by AWS. The project uses the dtsc.innovation.ca.gov subdomain. Project pages like <a href="https://dtsc.innovation.ca.gov/former-ramona/">former-ramona</a> are browsable as of 11/8/22. They will be either disabled or removed when the comment period is over to prevent leaving up backend endpoints that send email to DTSC staff.