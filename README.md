# Artistly.com Frontend Demo

## Project Overview

[cite_start]This repository contains a functional and mobile-responsive web demo for **Artistly.com**, a fictional Performing Artist Booking Platform[cite: 2]. [cite_start]The platform is designed to connect Event Planners with Artist Managers[cite: 3]. [cite_start]Event planners can browse artist profiles, shortlist preferences, and raise booking/availability requests[cite: 4]. [cite_start]Artist Managers can onboard artists, receive booking leads, and manage responses via a dashboard[cite: 5].

This project serves as a frontend developer test assignment, with a strong focus on frontend engineering quality using React and Next.js. [cite_start]The actual backend and database logic are out of scope for this demo, utilizing static JSON files or mock APIs instead[cite: 6]. [cite_start]The primary goal is to demonstrate best practices in routing, responsiveness, UI rendering, code safety, performance optimization, form logic, and data handling[cite: 7, 9].

## Key Features

The demo application consists of 3-4 key pages:

1.  **Homepage:**
    * Provides an overview of the platform.
    * Includes a hero section, call-to-action (CTA) to explore artists.
    * [cite_start]Features 3-4 artist category cards (e.g., Singers, Dancers, Speakers, DJs) with basic navigation to other pages[cite: 10]. Clicking on a category card redirects to the Artist Listing Page, filtered by the selected category.

2.  **Artist Listing Page:**
    * [cite_start]Displays artist cards in a responsive grid layout[cite: 10].
    * Each card showcases Artist Name, Category, Price Range, Location, and an "Ask for Quote" call-to-action (currently redirects to a "Work in Progress" page).
    * [cite_start]Includes filtering options by Category, Location, and Price Range (filter logic is functional)[cite: 10, 16].
    * [cite_start]Uses dummy data from JSON or a mock API file[cite: 10].

3.  **Artist Onboarding Form:**
    * [cite_start]A multi-section form for artists to submit their details[cite: 11].
    * [cite_start]Collects information such as Name, Bio, Category (multi-select dropdown with checkboxes), Languages Spoken (multi-select with checkboxes), Fee Range (dropdown), Profile Image Upload (optional), and Location (text input)[cite: 11].
    * [cite_start]Implements robust form validation (e.g., using React Hook Form)[cite: 11, 14].
    * [cite_start]Form submissions are handled by a mock API or logged to the console[cite: 11].

4.  **Manager Dashboard Page (Optional):**
    * [cite_start]A simple table displaying a list of artist submissions[cite: 11].
    * [cite_start]Each row shows Name, Category, City, Fee, and an "Action" button (currently redirects to a "Work in Progress" page)[cite: 11].
    * [cite_start]Uses static or simulated data from a mock API/local state[cite: 11].

## Technology Stack

[cite_start]The project is built using the following technologies and best practices[cite: 14]:

* **Next.js (v13+):** Utilizes the App Router for efficient routing and server-side capabilities.
* **React:** Functional components with Hooks (`useState`, `useContext`, `useEffect` demonstrated).
* **Tailwind CSS:** For utility-first styling (avoiding inline styles).
* **ShadCN UI:** Or other open UI components for pre-styled UI elements.
* **Form Management:** React Hook Form (or Formik + Yup) for robust form validation and UX.
* [cite_start]**HTML Best Practices:** Adherence to accessibility and SEO standards (e.g., proper head tags, metadata, image alt tags)[cite: 14, 16].
* [cite_start]**Data Handling:** Understanding of Next.js data fetching methods (`getStaticProps`, `getServerSideProps` where applicable), simulating data with dummy JSON or mock APIs[cite: 14, 16].

## Installation and Setup

To get this project up and running locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/artistly-frontend-demo.git](https://github.com/your-username/artistly-frontend-demo.git)
    cd artistly-frontend-demo
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

* Navigate through the **Homepage** to explore different sections.
* Click on **category cards** (Singers, Dancers, etc.) to go to the filtered Artist Listing page.
* Explore the **Artist Listing** page with dummy artist data.
* The "Ask for Quote" button on artist cards and "View" buttons on the Dashboard (if implemented) will currently redirect to a "Work In Progress" page.
* Access the **Artist Onboarding Form** to simulate an artist registration.
* If implemented, visit the **Manager Dashboard** to see a list of submitted artists.

## Deployment

[cite_start]The project is deployed on [Vercel](https://vercel.com/)[cite: 12].

## Evaluation Criteria (for Test Assignment)

[cite_start]This assignment is designed to evaluate frontend development logic and execution, and understanding of component architecture and responsiveness[cite: 18]. [cite_start]The evaluation focuses on the following areas[cite: 16]:

* **Code Structure:** Neat folder hierarchy, modular component reuse.
* **Responsiveness:** Pages should be fully mobile-responsive.
* **Forms:** Validated inputs, dropdowns with multi-checkbox selections.
* **Listing:** Filter logic should be visible and functional.
* **Hosting:** Deployed correctly on vercel.com.
* **SEO:** Proper head tags, metadata, image alt tags.
* **Comments:** Basic inline comments & function headers.
* **React Skills:** Demonstrated use of `useState`, `useContext`, `useEffect`.
* **Data Handling:** Demonstrated use of `getStaticProps`, `getServerSideProps` where applicable.

## Bonus Features (Not Mandatory)

* [cite_start]Simple state management (e.g., `useContext`)[cite: 17].
* [cite_start]Lazy loading / suspense on route changes[cite: 17].
* [cite_start]Framer Motion for smooth page transitions[cite: 17].
* [cite_start]Theme support (light/dark)[cite: 17].
