import { ISoftwareItem } from "../utils/types";

const softwareItems: ISoftwareItem[] = [
  {
    id: "1",
    name: "WordPress",
    description:
      "WordPress is a free and open-source content management system (CMS) written in PHP and paired with a MySQL or MariaDB database. Features include a plugin architecture and a template system, referred to within WordPress as Themes. WordPress was used by more than 38% of the top 10 million websites as of August 2021. WordPress is reportedly the most popular website management or blogging system in use on the Web, supporting more than 60 million websites.",
    logo: "https://s.w.org/style/images/about/WordPress-logotype-simplified.png",
    banner: "https://example.com/wordpress-banner.png",
    homepageURL: "https://wordpress.org/",
    repositoryURL: "https://github.com/WordPress/WordPress",
    githubStars: 10000,
    tags: ["CMS", "Blogging", "Website"],
  },
  {
    id: "2",
    name: "Magento",
    description:
      "Magento is an open-source e-commerce platform written in PHP. It is one of the most popular e-commerce platforms, with more than 250,000 merchants worldwide using the platform. Magento provides a flexible shopping cart system, as well as control over the look, content, and functionality of their online store. It also offers powerful marketing, search engine optimization, and catalog-management tools.",
    logo: "",
    homepageURL: "https://magento.com/",
    repositoryURL: "https://github.com/magento/magento2",
    githubStars: 5000,
    tags: ["E-commerce", "Online Store"],
  },
  {
    id: "3",
    name: "Joomla",
    description:
      "Joomla is a free and open-source content management system (CMS) for publishing web content, developed by Open Source Matters, Inc. It is built on a model–view–controller web application framework that can be used independently of the CMS. Joomla is written in PHP, uses object-oriented programming (OOP) techniques, and stores data in a MySQL, MS SQL, or PostgreSQL database.",
    logo: "",
    homepageURL: "https://www.joomla.org/",
    repositoryURL: "https://github.com/joomla/joomla-cms",
    githubStars: 3000,
    tags: ["CMS", "Website"],
  },
  {
    id: "4",
    name: "Drupal",
    description:
      "Drupal is a free and open-source web content management framework written in PHP and distributed under the GNU General Public License. Drupal provides a back-end framework for at least 2.3% of all websites worldwide – ranging from personal blogs to corporate, political, and government sites. Drupal is used by organizations including the Government of France, the Government of Australia, and the United Nations.",
    logo: "",
    homepageURL: "https://www.drupal.org/",
    repositoryURL: "https://github.com/drupal/drupal",
    githubStars: 2000,
    tags: ["CMS", "Website"],
  },
  {
    id: "5",
    name: "OpenCart",
    description:
      "OpenCart is a free and open-source online store management system. It is PHP-based, using a MySQL database and HTML components. Support is provided for different languages and currencies. OpenCart is designed to be user-friendly and easy to set up, even for people with limited technical skills. It has a large number of extensions and themes available, allowing users to customize the functionality and appearance of their online store.",
    logo: "",
    homepageURL: "https://www.opencart.com/",
    repositoryURL: "https://github.com/opencart/opencart",
    githubStars: 1500,
    tags: ["E-commerce", "Online Store"],
  },
  {
    id: "6",
    name: "PrestaShop",
    description:
      "PrestaShop is a freemium, open-source e-commerce platform. The software is published under the Open Software License (OSL). It is written in the PHP programming language with support for the MySQL database management system. PrestaShop is used by more than 300,000 online stores worldwide. The software provides a basic storefront, back-office administration panel, and a marketplace to add extra features to the platform.",
    logo: "",
    homepageURL: "https://www.prestashop.com/",
    repositoryURL: "https://github.com/PrestaShop/PrestaShop",
    githubStars: 1000,
    tags: ["E-commerce", "Online Store"],
  },
  {
    id: "7",
    name: "Odoo",
    description:
      "Odoo is an all-in-one business software suite that offers a range of business applications that form a complete suite of enterprise management applications. The suite includes accounting, finance, project management, inventory management, sales management, CRM, and more. Odoo is designed to be easy to use and modular, allowing businesses to start with a few applications and add more as their needs grow.",
    logo: "",
    homepageURL: "https://www.odoo.com/",
    repositoryURL: "https://github.com/odoo/odoo",
    githubStars: 800,
    tags: ["ERP", "CRM", "Business"],
  },
  {
    id: "8",
    name: "SuiteCRM",
    description:
      "SuiteCRM is an open-source customer relationship management (CRM) software. It is a fork of the popular SugarCRM software and provides similar functionality. SuiteCRM offers features such as contact management, lead management, opportunity management, email marketing, and more. It is designed to help businesses manage their customer relationships and improve sales and marketing efforts.",
    logo: "",
    homepageURL: "https://suitecrm.com/",
    repositoryURL: "https://github.com/salesagility/SuiteCRM",
    githubStars: 600,
    tags: ["CRM", "Business"],
  },
  {
    id: "9",
    name: "SugarCRM",
    description:
      "SugarCRM is a customer relationship management (CRM) system that is available in both open-source and commercial editions. It provides features such as contact management, lead management, opportunity management, email marketing, and more. SugarCRM is designed to help businesses manage their customer relationships and improve sales and marketing efforts. The software is highly customizable and can be tailored to meet the specific needs of each business.",
    logo: "",
    homepageURL: "https://www.sugarcrm.com/",
    repositoryURL: "https://github.com/sugarcrm/sugarcrm",
    githubStars: 400,
    tags: ["CRM", "Business"],
  },
  {
    id: "10",
    name: "ERPNext",
    description:
      "ERPNext is an open-source enterprise resource planning (ERP) software. It provides features such as accounting, inventory management, project management, sales management, CRM, and more. ERPNext is designed to help businesses streamline their operations and improve efficiency. The software is highly customizable and can be tailored to meet the specific needs of each business. It is used by a wide range of industries, including manufacturing, distribution, retail, and services.",
    logo: "",
    homepageURL: "https://erpnext.com/",
    repositoryURL: "https://github.com/frappe/erpnext",
    githubStars: 200,
    tags: ["ERP", "Business"],
  },
];

export default softwareItems;
