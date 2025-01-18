# Construction Website

A full-stack **Construction** website built using **React**, **Laravel**, **MySQL**, and **Bootstrap**. The website includes pages like Home, Services, Projects, Blog, Reviews, and Contact, and features an admin panel for easy management of content.

## Features

- **Home Page**: Display general information and navigation options.
- **Services Page**: List of construction services provided.
- **Projects Page**: Portfolio of completed and ongoing projects.
- **Blog Page**: Posts about industry trends, company news, and more.
- **Review Page**: Client testimonials and reviews.
- **Contact Page**: Contact form with integration for user inquiries.
- **Admin Panel**: Allows for managing serves,projects, articles,blogs, reviews, and members.

## Tech Stack

- **Frontend**: React, Bootstrap
- **Backend**: Laravel
- **Database**: MySQL

## Installation Instructions

### Prerequisites

Make sure you have the following installed:

- Node.js (for React)
- Composer (for Laravel)
- MySQL (for database)

### Setup Frontend (React)

1. Clone this repository.

2. Navigate to the `frontend/` directory.
3. Run the following command to install the dependencies:

```bash
npm install
```

4. Go back from frontend to backend using

```bash
cd ..
```

5. Navigate to the `backend/` directory.

6. Run the following command to install the dependencies:

```bash
composer install
```

7. Run this command to update database, make sure mysql xampp is started

```bash
php artisan migrate
```

8. Run this for storage for accessing imags

```bash
php artisan storage:link
```

9. Start the Laravel server:

```bash
php artisan serve
```

10. Finally, navigate to the frontend/ directory again and run the development server:

```bash
npm start

```

## Acknowledgments

- Laravel for the backend framework.
- React for the frontend framework.
- Bootstrap for responsive design.


# screeenshots 
![1](/asset/images/2.png)
![1](/asset/images/3.png)
![1](/asset/images/1.png)
![1](/asset/images/4.png)
![1](/asset/images/5.png)
![1](/asset/images/6.png)
![1](/asset/images/7.png)
![1](/asset/images/9.png)
![1](/asset/images/10.png)
![1](/asset/images/11.png)
![1](/asset/images/12.png)
![1](/asset/images/13.png)

# Video link
![Watch the video demo](/asset/Video/video.mp4)

