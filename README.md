# OpShala Desktop App

Deploy and manage off-the-shelf or custom software on cloud providers without code

## What is OpShala?

OpShala is a desktop application that helps you with all the steps needed to automatically deploy and manage off-the-shelf software on cloud infrastructure. Off-the-shelf software like WordPress (blogging, content management), Magento (e-commerce), Saleor (e-commerce), Discourse (forums/community), NocoDB (Airtable alternative), Appsmith (internal tool builder), Supabase (Firebase alternative) and many more.

## How does it work?

OpShala uses a Git repository (where your software project resides) and adds all the necessary IT configuration for automatic deployment using GitHub or GitLab or any other CI/CD system. CI/CD stands for Continuous Integration, Continuous Delivery and is a set of IT practices allowing software compaines to constantly test and manage the development of their own software, and may include deployment of software to cloud or customers.

These are standard industry practices. What OpShala does is manage the configurations directly on your desktop as you specify your needs through an easy to use GUI. Then the automations run on GitHub or GitLab. You will be guided to setup accounts with GitHub or GitLab as well as cloud infrustructure providers like DigitalOcean, Linode, Cloudflare, etc.

## Does OpShala support deploying custom software?

At the moment we are focused on deploying off-the-shelf software like WordPress, Magento, Saleor, Discourse and many more. We intend to add support for custom software built on popular frameworks like Laravel, Django, ExpressJS, Ruby on Rails, etc.

## What about database, caching, domain name config, etc.?

OpShala takes cares of every aspect of the infrastructure needed to get your software online. OpShala app allows you to select your preferred database, depending on what is supported by the software you want to run on the cloud. It can add caching, search, error tracking, backups and many more systems. OpShala uses Cloudflare or similar cloud infrastructure providers to manage domain name configuration. You will be guided to register with them.

## Can I run multiple software on the same server?

Yes! This is a very crucial point for OpShala since we are focused on empowering a larger number of business to go online. OpShala generates configuration that tries to utilise your cloud server as optimally as possible. Depending on the number of users or vistors your website gets, you should be able to run a combination of e-Commerce, accounting, CRM or even ERP software on the minimum supported cloud server.

## How much does OpShala cost?

The OpShala desktop app is open source as well as free in price. This is a single user software and is intended for the business manager or startup founder to manage their cloud software. The desktop application will remain free to use forever. Collaboration and other features (being planned) will need an account with the parent company. These features may need a subscription. These details will be available easily through the desktop app.

## How does OpShala access all cloud providers?

OpShala walks you through the process of registering with different cloud infrastructure providers as needed to deploy and manage your software. Then the app asks you for API access tokens to these services. Some access tokens are needed by OpShala while others are needed for the automations to run (on GitHub or GitLab, etc).

Since OpShala is a desktop app, the access tokens that it needs for itself do not leave your desktop. OpShala desktop app does not send any private data to its developers or parent company. It may send analytics data to help us develop OpShala and all that is listed directly in the app (Settings > Telemetry).

Some API access tokens need to be saved on GitHub or GitLab or another cloud infrastructure provider (encrypted and managed by them) in order for automations to run. These will be mentioned clearly to you. You are always in control of you data and API access.

## Does OpShala app generate code in my project?

Yes, the OpShala desktop app automatically generates configrations like Ansible or Terraform in your project's Git repository. The history of configurations therefore are also stored on Git automatically.

## Can I take backup of all my API access tokens?

We are working on integrating secrets backup software with OpShala so that you can take backups of your API access keys there. If you remove OpShala app from your desktop, your automated deployments will still continue to work from GitHub or GitLab or wherever else you have selected to run the automations. In case you remove the OpShala desktop app without making backups of the API access tokens, then you can still re-create all the tokens after you re-install the app.
